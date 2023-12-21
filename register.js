// Function to send registration data to the API and display response
function registerUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const registrationData = {
        username: username,
        password: password
    };

    // Send a POST request to the API endpoint
    fetch("https://apinotifier.foroko.repl.co/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(registrationData)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the API
        const apiResponseElement = document.getElementById("api-response");
        apiResponseElement.textContent = JSON.stringify(data, null, 2);
        // You can add further actions here, like displaying a success message or redirecting the user.
    })
    .catch(error => {
        // Handle any errors that occur during the fetch
        console.error("Error:", error);
    });
}

// Attach the registerUser function to the form's submit event
document.getElementById("registration-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    registerUser(); // Call the function to register the user
});



