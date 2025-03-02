document.addEventListener("DOMContentLoaded", function () {
    const planningList = document.getElementById("planning-list");
    const addPlanningBtn = document.getElementById("addPlanningBtn");

    addPlanningBtn.addEventListener("click", function () {
        const userName = document.getElementById("user-name").value;
        const tripOrigin = document.getElementById("trip-origin").value;
        const tripDestination = document.getElementById("trip-destination").value;
        const startDate = document.getElementById("start-date").value;
        const days = document.getElementById("days").value;
        const hotel = document.getElementById("hotel").value;
        const culinary = document.getElementById("culinary").value;
        const destination = document.getElementById("destination").value;
        const transportation = document.getElementById("transportation").value;

        if (userName && tripOrigin && tripDestination && startDate && days) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${userName}</td>
                <td>${tripOrigin} → ${tripDestination}</td>
                <td>${startDate}</td>
                <td>${days}</td>
                <td>${hotel}</td>
                <td>${culinary}</td>
                <td>${destination}</td>
                <td>${transportation}</td>
                <td>
                    <button class="edit-btn" onclick="editPlanning(this)">Edit</button>
                    <button class="delete-btn" onclick="deletePlanning(this)">Hapus</button>
                </td>
            `;
            planningList.appendChild(row);
        }
    });
});

function deletePlanning(button) {
    button.parentElement.parentElement.remove();
}

function editPlanning(button) {
    const row = button.parentElement.parentElement;
    const cells = row.getElementsByTagName("td");

    // Mengisi kembali input form dengan data yang ada di tabel
    document.getElementById("user-name").value = cells[0].textContent;
    document.getElementById("trip-origin").value = cells[1].textContent.split(" → ")[0];
    document.getElementById("trip-destination").value = cells[1].textContent.split(" → ")[1];
    document.getElementById("start-date").value = cells[2].textContent;
    document.getElementById("days").value = cells[3].textContent;
    document.getElementById("hotel").value = cells[4].textContent;
    document.getElementById("culinary").value = cells[5].textContent;
    document.getElementById("destination").value = cells[6].textContent;
    document.getElementById("transportation").value = cells[7].textContent;

    // Menghapus row setelah diedit
    row.remove();
}
