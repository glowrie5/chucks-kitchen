
const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

if (togglePassword) {
  togglePassword.addEventListener("click", function () {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
  });
}


document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault(); // prevent page reload

    // Redirect to home page
    window.location.href = "home.html";
});