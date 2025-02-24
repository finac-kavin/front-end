let container = document.getElementById('secondSection');
console.log(container);

// Fetch the data
let fetchData = async () => {
    try {
        let response = await fetch('http://localhost:3000/user');
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        let finalData = await response.json();
        console.log(finalData);

        container.innerHTML = "";

        finalData.forEach(value => {
            // Create elements
            let name = document.createElement('p');
            let email = document.createElement('p');
            let updateButton = document.createElement('button');
            let deleteButton = document.createElement('button');
            let buttonContainer = document.createElement('div');
            let parent = document.createElement('article');

            // Assign values
            name.innerHTML = value.name;
            email.innerHTML = value.email;
            updateButton.innerHTML = "Update";
            deleteButton.innerHTML = "Delete";

            // Add event listeners
            deleteButton.addEventListener("click", () => deleteData(value.id));
            updateButton.addEventListener("click", () => updateData(value.id, value.name, value.email, value.password));

            // Append elements
            buttonContainer.append(updateButton, deleteButton);
            parent.append(name, email, buttonContainer);
            container.append(parent);
        });

    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error fetching data. Please try again later.");
    }
};
fetchData();

// Create new data
let createName = document.getElementById('name');
let createEmail = document.getElementById('email');
let createPassword = document.getElementById('password');
let form = document.querySelector('form');

let nameError = document.getElementById('nameError');
let emailError = document.getElementById('emailError');
let passwordError = document.getElementById('passwordError');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Clear previous errors
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";

    // Name validation
    if (!createName.value.trim()) {
        nameError.textContent = "Name is required.";
        isValid = false;
    }

    // Email validation
    if (!createEmail.value.trim()) {
        emailError.textContent = "Email is required.";
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(createEmail.value)) {
        emailError.textContent = "Invalid email format.";
        isValid = false;
    }

    // Password validation
    if (!createPassword.value.trim()) {
        passwordError.textContent = "Password is required.";
        isValid = false;
    } else if (createPassword.value.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters.";
        isValid = false;
    }

    // If valid, create data
    if (isValid) {
        createData(createName.value, createEmail.value, createPassword.value);
        form.reset(); // Clear form after submission
    }
});

let createData = async (name, email, password) => {
    try {
        let response = await fetch('http://localhost:3000/user', {
            method: "POST",
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        if (!response.ok) {
            throw new Error("Failed to create user");
        }

        fetchData(); // Refresh the data after adding new user
    } catch (error) {
        console.error("Error creating data:", error);
        alert("Error creating user. Please try again.");
    }
};

// Delete data
let deleteData = async (id) => {
    try {
        let response = await fetch(`http://localhost:3000/user/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete user");
        }

        fetchData();
    } catch (error) {
        console.error("Error deleting data:", error);
        alert("Error deleting user. Please try again.");
    }
};

// Update data
let updateData = (id, currentName, currentEmail, currentPassword) => {
    let newName = prompt("Enter new name:", currentName);
    let newEmail = prompt("Enter new email:", currentEmail);
    let newPassword = prompt("Enter new password:", currentPassword);

    if (newName && newEmail && newPassword) {
        fetch(`http://localhost:3000/user/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ name: newName, email: newEmail, password: newPassword })
        }).then(() => fetchData());
    }
};
