// Function to send login data to the API and handle the response
function loginUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const loginData = {
        username: username,
        password: password
    };

    // Send a POST request to the login API endpoint
    fetch("https://apinotifier.foroko.repl.co/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the API
        const apiResponseElement = document.getElementById("api-response");
        apiResponseElement.textContent = JSON.stringify(data, null, 2);

        if (data.message === "Login successful") {
            // Store the user ID in local storage
            localStorage.setItem("userId", data.userId);

            // Redirect to dashboard.html if login is successful
            window.location.href = "dashboard.html";
        }
    })
    .catch(error => {
        // Handle any errors that occur during the fetch
        console.error("Error:", error);
    });
}

// Attach the loginUser function to the form's submit event
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    loginUser(); // Call the function to login the user
});
