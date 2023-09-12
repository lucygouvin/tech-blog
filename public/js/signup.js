const signupFormHandler = async (event) => {
    event.preventDefault();
    const username = document.querySelector("#username-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();
    // If the user entered data, send a post request to make a new user object
    if (username && email && password) {
        const response = await fetch("/user", {
            method: "POST",
            body: JSON.stringify({ username, email, password }),
            headers: { "Content-Type": "application/json" },
        });
        // If successful, redirect to the dashboard
        if (response.ok) {
            document.location.replace("/dashboard");
            // If unsuccessful, alert the user
        } else {
            alert("Failed to sign up.");
        }
    }
};

document
    .querySelector("#signupButton")
    .addEventListener("click", signupFormHandler);
