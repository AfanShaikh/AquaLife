// JS/signup.js - Handles Opening Drawer, Sign Up, & Logout Logic

document.addEventListener("DOMContentLoaded", () => {
  const authOverlay = document.getElementById("auth-overlay");
  const authBtn = document.getElementById("auth-btn"); // The button in your navbar
  const closeAuthBtn = document.getElementById("close-auth-btn");
  const loginView = document.getElementById("login-view");
  const signupView = document.getElementById("signup-view");
  const signupForm = document.getElementById("signup-form");

  // --- NEW: Check Login Status on Page Load ---
  if (authBtn && localStorage.getItem("isLoggedIn") === "true") {
    authBtn.innerText = "Logout";
  }

  // 1. Open Auth Drawer OR Handle Logout
  if (authBtn) {
    authBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Check if they are currently logged in
      if (localStorage.getItem("isLoggedIn") === "true") {
        // LOGOUT FLOW
        const confirmLogout = confirm("Are you sure you want to log out?");
        if (confirmLogout) {
          localStorage.removeItem("isLoggedIn"); // Clear the saved state
          authBtn.innerText = "Login / Sign up"; // Reset the button
          alert("You have been successfully logged out.");
        }
      } else {
        // LOGIN FLOW: Open the drawer
        authOverlay.style.display = "flex";
        signupView.style.display = "block";
        loginView.style.display = "none";
      }
    });
  }

  // 2. Close Drawer
  if (closeAuthBtn) {
    closeAuthBtn.addEventListener("click", () => {
      authOverlay.style.display = "none";
    });
  }

  // Close when clicking the dark background outside the white panel
  window.addEventListener("click", (e) => {
    if (e.target === authOverlay) {
      authOverlay.style.display = "none";
    }
  });

  // 3. Handle Sign Up Submission
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // SAVE THE LOGGED IN STATE
      localStorage.setItem("isLoggedIn", "true");
      if (authBtn) authBtn.innerText = "Logout"; // Change text to Logout

      alert("Account created successfully! Welcome to AquaLife.");
      authOverlay.style.display = "none";
      signupForm.reset(); // Clear the fields
    });
  }
});
