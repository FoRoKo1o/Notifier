document.addEventListener("DOMContentLoaded", function() {
    // Add animation class to header and footer after page load
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");

    // Use a setTimeout to ensure the animation class is applied after a slight delay
    setTimeout(() => {
        header.classList.add("active");
        footer.classList.add("active");
    }, 1000); // Adjust the delay (in milliseconds) as needed
});
document.addEventListener("DOMContentLoaded", function() {
    // Get all the boxes
    const boxes = document.querySelectorAll(".box");

    // Function to add the "active" class to boxes with a delay
    function animateBoxes() {
        boxes.forEach((box, index) => {
            setTimeout(() => {
                box.classList.add("active");
            }, index * 200); // Adjust the delay as needed
        });
      wakeUpApi();
    }
    // Listen for the "load" event to start the animation
    window.addEventListener("load", animateBoxes);
});
function tologin() {
    location.href = 'loginpage.html';
}
function tosignup() {
    location.href = 'signup.html';
}
function wakeUpApi(){
    fetch("https://apinotifier.foroko.repl.co/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: ""
    })
}
// Get the logo element by its class name
const logoElement = document.querySelector(".logo");

// Add a click event listener to the logo
logoElement.addEventListener("click", () => {
  // Redirect to the specified URL
  window.location.href = "https://notifier.foroko.repl.co/";
});
