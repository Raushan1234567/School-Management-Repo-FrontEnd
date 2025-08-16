const apiUrl = "http://localhost:9090/api/v1/schools";

// Fetch and display all schools
async function fetchSchools() {
    try {
        const response = await fetch(apiUrl);
        const schools = await response.json();

        const tableBody = document.getElementById("schoolTable");
        tableBody.innerHTML = "";

        schools.forEach(school => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${school.id}</td>
                <td>${school.name}</td>
                <td>${school.address}</td>
                <td>
                    <button onclick="deleteSchool(${school.id})">Delete</button>
                    <button onclick="editSchool(${school.id}, '${school.name}', '${school.address}')">Edit</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (err) {
        console.error("Error fetching schools:", err);
    }
}

// Add a new school
async function addSchool() {
    const name = document.getElementById("schoolName").value;
    const address = document.getElementById("schoolAddress").value;

    if (!name || !address) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, address })
        });
        fetchSchools();
        document.getElementById("schoolName").value = "";
        document.getElementById("schoolAddress").value = "";
    } catch (err) {
        console.error("Error adding school:", err);
    }
}

// Delete a school
async function deleteSchool(id) {
    try {
        await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        fetchSchools();
    } catch (err) {
        console.error("Error deleting school:", err);
    }
}

// Edit/Update a school
async function editSchool(id, oldName, oldAddress) {
    const newName = prompt("Enter new name:", oldName);
    const newAddress = prompt("Enter new address:", oldAddress);

    if (newName && newAddress) {
        try {
            await fetch(`${apiUrl}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newName, address: newAddress })
            });
            fetchSchools();
        } catch (err) {
            console.error("Error updating school:", err);
        }
    }
}

// Load schools on page load
window.onload = fetchSchools;
