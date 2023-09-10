const postHandler = async (e) => {
    e.preventDefault();

    const postTitle = document.getElementById("postTitle").value.trim();
    const postBody = document.getElementById("postBody").value.trim();

    if (postTitle && postBody) {
        const response = await fetch("/dashboard/new", {
            method: "POST",
            body: JSON.stringify({ postTitle, postBody }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Failed to post.");
        }
    }
};
document.getElementById("postSubmit").addEventListener("click", postHandler);
