document.addEventListener("DOMContentLoaded", function () {
    const planningList = document.getElementById("planning-list");
    const addPlanningBtn = document.getElementById("addPlanningBtn");
    const tripDestination = document.getElementById("trip-destination");
    const hotelSelect = document.getElementById("hotel");
    const culinarySelect = document.getElementById("culinary");
    const destinationSelect = document.getElementById("destination");

    // Data hotel, kuliner, dan tempat wisata berdasarkan kota tujuan
    const travelData = {
        "Surabaya": {
            hotels: ["Hotel Majapahit", "Hotel Bumi", "Vasa Hotel"],
            culinary: ["Rawon Setan", "Sate Klopo", "Lontong Balap"],
            places: ["Tugu Pahlawan", "Surabaya Zoo", "House of Sampoerna"]
        },
        "Bali": {
            hotels: ["Hard Rock Hotel", "Grand Hyatt", "The Mulia"],
            culinary: ["Babi Guling", "Ayam Betutu", "Lawar"],
            places: ["Pantai Kuta", "Uluwatu", "Pura Tanah Lot"]
        },
        "Yogyakarta": {
            hotels: ["The Phoenix Hotel", "Melia Purosani", "Jogja Village Inn"],
            culinary: ["Gudeg Yu Djum", "Bakpia Pathok", "Sate Klathak"],
            places: ["Candi Borobudur", "Malioboro", "Taman Sari"]
        },
        "Jakarta": {
            hotels: ["Hotel Indonesia Kempinski", "Shangri-La", "Ritz-Carlton"],
            culinary: ["Soto Betawi", "Kerak Telor", "Nasi Uduk"],
            places: ["Monas", "Dufan", "Taman Mini"]
        }
    };

    // Fungsi memperbarui dropdown hotel, kuliner, dan wisata sesuai kota tujuan
    function updateDropdown(selectedHotel = "", selectedCulinary = "", selectedPlace = "") {
        let city = tripDestination.value;
        if (!city) {
            hotelSelect.innerHTML = "<option value=''>Pilih Hotel</option>";
            culinarySelect.innerHTML = "<option value=''>Pilih Kuliner</option>";
            destinationSelect.innerHTML = "<option value=''>Pilih Tempat Wisata</option>";
            return;
        }

        populateDropdown(hotelSelect, travelData[city]?.hotels || [], selectedHotel);
        populateDropdown(culinarySelect, travelData[city]?.culinary || [], selectedCulinary);
        populateDropdown(destinationSelect, travelData[city]?.places || [], selectedPlace);
    }

    function populateDropdown(selectElement, options, selectedValue = "") {
        selectElement.innerHTML = "<option value=''>Pilih</option>";
        options.forEach(option => {
            let newOption = document.createElement("option");
            newOption.value = option;
            newOption.textContent = option;
            if (option === selectedValue) {
                newOption.selected = true;
            }
            selectElement.appendChild(newOption);
        });
    }

    tripDestination.addEventListener("change", () => updateDropdown());
    updateDropdown(); // Set dropdown kosong saat halaman dimuat

    addPlanningBtn.addEventListener("click", function () {
        const userName = document.getElementById("user-name").value;
        const tripOrigin = document.getElementById("trip-origin").value;
        const startDate = document.getElementById("start-date").value;
        const days = document.getElementById("days").value;
        const hotel = hotelSelect.value;
        const culinary = culinarySelect.value;
        const destination = destinationSelect.value;
        const transportation = document.getElementById("transportation").value;

        if (userName && tripOrigin && tripDestination.value && startDate && days) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${planningList.children.length + 1}</td>
                <td>${userName}</td>
                <td>${tripOrigin} → ${tripDestination.value}</td>
                <td>${startDate}</td>
                <td>${days}</td>
                <td>${hotel || "-"}</td>
                <td>${culinary || "-"}</td>
                <td>${destination || "-"}</td>
                <td>${transportation || "-"}</td>
                <td>
                    <button class="edit-btn" onclick="editPlanning(this)">Edit</button>
                    <button class="delete-btn" onclick="deletePlanning(this)">Hapus</button>
                </td>
            `;
            planningList.appendChild(row);

            // Reset input setelah menambahkan data
            resetForm();
        } else {
            alert("Mohon isi semua data dengan benar!");
        }
    });

    function resetForm() {
        document.getElementById("user-name").value = "";
        document.getElementById("trip-origin").value = "";
        document.getElementById("trip-destination").value = ""; // Kosongkan tujuan
        document.getElementById("start-date").value = "";
        document.getElementById("days").value = "";
        document.getElementById("transportation").value = "";
        updateDropdown(); // Reset dropdown ke kosong
    }
});

// Fungsi hapus planning
function deletePlanning(button) {
    if (confirm("Apakah Anda yakin ingin menghapus planning ini?")) {
        const row = button.parentElement.parentElement;
        row.remove(); // Hapus elemen baris
        updateRowNumbers(); // Perbarui nomor urut setelah elemen dihapus
    }
}

function editPlanning(button) {
    if (!confirm("Apakah Anda yakin ingin mengedit planning ini?")) {
        return; // Batalkan proses edit jika pengguna memilih "Batal"
    }

    const row = button.parentElement.parentElement;
    const cells = row.getElementsByTagName("td");

    // Ambil data dari tabel ke form
    const userName = cells[1].textContent.trim();
    const tripData = cells[2].textContent.split(" → ");
    const tripOrigin = tripData[0].trim();
    const tripDestination = tripData[1] ? tripData[1].trim() : "";
    const startDate = cells[3].textContent.trim();
    const days = cells[4].textContent.trim();
    const hotel = cells[5].textContent.trim() === "-" ? "" : cells[5].textContent.trim();
    const culinary = cells[6].textContent.trim() === "-" ? "" : cells[6].textContent.trim();
    const destination = cells[7].textContent.trim() === "-" ? "" : cells[7].textContent.trim();
    const transportation = cells[8].textContent.trim();

    // Validasi sebelum mengedit
    if (!userName || !tripOrigin || !tripDestination || !startDate || !days) {
        alert("Data tidak valid! Mohon pastikan semua informasi sudah benar sebelum mengedit.");
        return;
    }

    // Set nilai form berdasarkan data dari tabel
    document.getElementById("user-name").value = userName;
    document.getElementById("trip-origin").value = tripOrigin;
    document.getElementById("trip-destination").value = tripDestination;
    document.getElementById("start-date").value = startDate;
    document.getElementById("days").value = days;
    document.getElementById("transportation").value = transportation;

    // Hapus baris setelah memastikan data telah diambil
    row.remove();

    // Perbarui nomor urut pada tabel setelah penghapusan baris
    setTimeout(updateRowNumbers, 100); 

    // Perbarui dropdown dengan nilai yang sesuai
    setTimeout(() => updateDropdown(hotel, culinary, destination), 200);
}




// Fungsi update nomor urut pada tabel
function updateRowNumbers() {
    const rows = document.querySelectorAll("#planning-list tr");
    rows.forEach((row, index) => {
        row.cells[0].textContent = index + 1; // Perbarui nomor urut
    });
}
