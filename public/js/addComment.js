const commentButton = document.getElementById("commentButton");
const commentForm = document.getElementById("commentForm");
// When the page first loads, the comment form should be hidden
commentForm.style.visibility = "hidden";

// Make the comment form visible if the user clicks on the "Comment" button
commentButton.addEventListener("click", () => {
    commentForm.style.visibility = "visible";
});

const commentHandler = async (e) => {
    e.preventDefault();
    const commentBody = document.getElementById("commentBody").value.trim();
    const idString = window.location.href.split("/").pop();
    // If a comment has been entered, make a post request to associate the comment with the post
    if (commentBody) {
        const response = await fetch(`/post/comment/${idString}`, {
            method: "POST",
            body: JSON.stringify({ commentBody }),
            headers: { "Content-Type": "application/json" },
        });
        // If successful, reload the post page so the comment is now visible
        if (response.ok) {
            document.location.replace(`/post/view/${idString}`);
            // If unsuccssful, alert the user
        } else {
            alert("Failed to add comment.");
        }
    }
};

document
    .getElementById("commentSubmit")
    .addEventListener("click", commentHandler);
