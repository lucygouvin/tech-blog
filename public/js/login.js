const loginHandler = async (e) => {
    e.preventDefault();

    const username = document.querySelector("#login-username").value.trim();
    const password = document.querySelector("#login-password").value.trim();
    // If user entered info, it'll send a post request, which will validate the user login info
    if (username && password) {
        const response = await fetch("/user/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Failed to log in.");
        }
    }
};

document.querySelector("#loginButton").addEventListener("click", loginHandler);
