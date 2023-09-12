const postHandler = async (e) => {
    e.preventDefault();

    const postTitle = document.getElementById("postTitle").value.trim();
    const postBody = document.getElementById("postBody").value.trim();
// If the user entered content, send a post request to create a new post object
    if (postTitle && postBody) {
        const response = await fetch("/dashboard/new", {
            method: "POST",
            body: JSON.stringify({ postTitle, postBody }),
            headers: { "Content-Type": "application/json" },
        });
        // If successful, redirect to the user's dashboard
        if (response.ok) {
            document.location.replace("/dashboard");
            // If unsuccessful, alert the user
        } else {
            alert("Failed to post.");
        }
    }
};
document.getElementById("postSubmit").addEventListener("click", postHandler);
