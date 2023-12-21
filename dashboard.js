// Ask for notification permission when the page loads
window.addEventListener("DOMContentLoaded", () => {
    if ("Notification" in window) {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Notification permission granted.");
            } else if (permission === "denied") {
                console.log("Notification permission denied.");
            } else if (permission === "default") {
                console.log("Notification permission dismissed.");
            }
        });
    }
    fetchUserMessages(userId);
});


// Function to fetch user messages from the API
function fetchUserMessages(userId) {
    fetch(`https://apinotifier.foroko.repl.co/getmessages/${userId}`)
        .then(response => response.json())
        .then(data => {
            // Check if the response contains messages
            if (data.messages && data.messages.length > 0) {
                const mainElement = document.querySelector("main");

                // Loop through the messages and create boxes
                data.messages.forEach(message => {
                    const box = document.createElement("div");
                    box.classList.add("box", "active"); // Add the "active" class

                    const glow = document.createElement("div");
                    glow.classList.add("glow"); // Add the glow class

                    const boxContent = document.createElement("div");
                    boxContent.classList.add("box-content");

                    const dateParagraph = document.createElement("p");
                    dateParagraph.textContent = `Date: ${message.date}`;

                    const hourParagraph = document.createElement("p");
                    hourParagraph.textContent = `Hour: ${message.hour}`; // Display the hour field

                    const messageParagraph = document.createElement("p");
                    messageParagraph.textContent = `Message: ${message.message}`;

                    // Add a button to remove the message
                    const removeButton = document.createElement("button");
                    removeButton.textContent = "Remove";
                    removeButton.classList.add("remove-button");
                    removeButton.addEventListener("click", () => {
                        // Call a function to remove the message
                        removeMessage(userId, message.date, message.hour, message.message); // Pass hour field
                    });

                    boxContent.appendChild(dateParagraph);
                    boxContent.appendChild(hourParagraph); // Append the hour field
                    boxContent.appendChild(messageParagraph);
                    boxContent.appendChild(removeButton); // Add the remove button

                    box.appendChild(glow); // Append the glow element
                    box.appendChild(boxContent);
                    mainElement.appendChild(box);

                    // Schedule notifications based on message data
                    scheduleNotification(message.date, message.hour, message.message);
                });
            } else {
                // Display typing text when no notifications are found
                const notificationText = document.getElementById("notificationText");
                notificationText.textContent = ""; // Clear any existing text
                simulateTypingText(notificationText, "No notifications found");
            }
        })
        .catch(error => {
            console.error("Error fetching messages:", error);
        });
}


// Function to remove a message
function removeMessage(userId, date, hour, message) {
    // Send a POST request to remove the message
    fetch("https://apinotifier.foroko.repl.co/removemessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                date: date,
                hour: hour, // Include the hour field
                message: message
            })
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the API here
            console.log(data);

            // Reload the page to reflect the changes (you can also update the UI dynamically)
            location.reload();
        })
        .catch(error => {
            console.error("Error removing message:", error);
        });
}

const userId = localStorage.getItem("userId"); // Get the user ID from local storage
// Call the function to display the user ID when the page loads
window.addEventListener("DOMContentLoaded", fetchUserMessages(userId));

// Function to remove user ID from local storage and redirect to index.html
function logoutUser() {
    localStorage.removeItem("userId"); // Remove the user ID from local storage
    window.location.href = "index.html"; // Redirect to index.html
}

// Attach the logoutUser function to the logout button's click event
document.getElementById("logout").addEventListener("click", logoutUser);

function addNotification() {
    location.href = 'addnotification.html';
}

function scheduleNotification(date, hour, message) {
    // Parse the date and time from the message
    const [year, month, day] = date.split("-");
    const [hours, minutes] = hour.split(":");

    // Create a Date object for the scheduled time
    const scheduledTime = new Date(year, month - 1, day, hours, minutes);

    // Calculate the delay in milliseconds until the notification should be shown
    const delay = scheduledTime - Date.now();

    // Check if the delay is positive (in the future)
    if (delay > 0) {
        console.log(`Scheduled for: ${scheduledTime}`);

        setTimeout(function() {
            // Create and display a notification with the provided message
            const notification = new Notification("FoRoKo Notification", {
                body: message,
                icon: "doggo.webp" // Replace with your icon URL
            });

            // Handle click on the notification (optional)
            notification.onclick = function() {
                // Add code to handle click event, e.g., open a URL
                window.open("https://notifier.foroko.repl.co/");
            };
        }, delay);
    }
}

function simulateTypingText(element, text) {
    const typingSpeed = 100; // Typing speed for characters
    const dotTypingSpeed = 300; // Typing speed for dots
    let i = 0;
    let dotsCount = 0;
    let isAddingDots = true;
    let addbutton = false;
element.style.display = "inline";
    function typeCharacter() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeCharacter, typingSpeed);
        } else {
            // All text has been typed, add and remove dots
            if (!addbutton) {
                addButton()
                addbutton = true
            }

            setTimeout(function() {
                if (isAddingDots) {
                    element.textContent += ".";
                    dotsCount++;
                    if (dotsCount === 3) {
                        isAddingDots = false;
                    }
                    setTimeout(typeCharacter, dotTypingSpeed); // Use dot typing speed
                } else {
                    const currentText = element.textContent;
                    element.textContent = currentText.slice(0, -3); // Remove the last character (a dot)
                    dotsCount = 0;
                    isAddingDots = true;
                    setTimeout(typeCharacter, dotTypingSpeed); // Use dot typing speed
                }
            }, dotTypingSpeed); // Use dot typing speed
        }
    }

    typeCharacter();
}

function addButton() {
    const loginContainer = document.querySelector(".login-container");

    // Create the button element
    const button = document.createElement("button");
    button.textContent = "Add Notification";
    button.classList.add("navbtn");
    button.id = "login";
    button.onclick = addNotification;

    // Initially, set the button's translateY to -20px to position it above the container
    button.style.transform = "translateY(-20px)";

    // Append the button to the login container
    loginContainer.appendChild(button);

    // Animate the button to slide down
    const slideSpeed = 5; // Speed of sliding down
    let translateY = -20;

    function slideDown() {
        if (translateY < 0) {
            translateY += 1;
            button.style.transform = `translateY(${translateY}px)`;
            requestAnimationFrame(slideDown);
        }
    }

    // Start sliding after a short delay
    setTimeout(() => {
        slideDown();
    }, 0);
}