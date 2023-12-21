# Notifier App Webpage Project

This project is a simple web application for managing notifications. Users can add, view, and remove notifications through a user-friendly dashboard.

## Functions

### addnotification.js

- `addNotification()`: Sends notification data to the API by making a POST request. It collects date, hour, and message from form inputs, sends the data to the API endpoint, and handles the API's response. If the API response indicates success, it redirects the user to the dashboard after a delay.

### animations.js

- Mousemove Animation: Adds an interactive glow effect to specific elements with the class `.box` when the mouse moves over them. The glow follows the mouse cursor within the element.

### dashboard.js

- Permission Request: Requests notification permission when the page loads using the `Notification` API.
- `fetchUserMessages(userId)`: Fetches user messages from the API and dynamically populates the dashboard with message boxes. It also schedules notifications for each message based on their date and time.
- `removeMessage(userId, date, hour, message)`: Removes a message by making a POST request to the API, updating the UI by removing the message box, and reloading the page.
- `logoutUser()`: Logs out the user by removing the user ID from local storage and redirects to the login page.

### login.js

- `loginUser()`: Sends login data to the API and handles the API's response. If login is successful, it stores the user ID in local storage and redirects to the dashboard.

### register.js

- `registerUser()`: Sends registration data to the API and displays the API's response. It can be extended with further actions, such as displaying success messages or redirecting the user.

### script.js

- Animation on Page Load: Adds animation classes to the header and footer elements with a slight delay after the page loads.
- Logo Click: Redirects to the specified URL when the logo is clicked.

## HTML Pages

### dashboard.html

- Represents the dashboard of the Notifier App, displaying user messages and providing interaction to add, view, and remove notifications.

### index.html

- Serves as the main entry point of the application, providing information about the app's purpose.

### loginpage.html

- Handles user login, allowing users to enter their credentials and log in.

### signup.html

- Handles user registration, allowing users to create new accounts.

Feel free to expand this README.md with additional details, instructions, or screenshots as needed.
