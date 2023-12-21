// Function to send notification data to the API
function addNotification() {
  const date = document.getElementById("date").value;
  const hour = document.getElementById("hour").value; // Get the hour input value
  const message = document.getElementById("message").value;

  const notificationData = {
    userId: localStorage.getItem("userId"),
    date: date,
    hour: hour, // Include the hour field
    message: message
  };

  // Send a POST request to the API endpoint
  fetch("https://apinotifier.foroko.repl.co/addmessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(notificationData)
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the API here
      const apiResponseElement = document.getElementById("api-response");
      apiResponseElement.textContent = JSON.stringify(data, null, 2);

      // You can add further actions here, like displaying a success message or clearing the form.

      if (data.message.includes("successfully")) {
        // Redirect to dashboard.html after 5 seconds
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 1500);
      }
    })
    .catch(error => {
      // Handle any errors that occur during the fetch
      console.error("Error:", error);
    });
}

// Attach the addNotification function to the form's submit event
document.getElementById("notification-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the form from submitting normally
  addNotification(); // Call the function to add the notification
});
