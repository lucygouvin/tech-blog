const commentButton = document.getElementById("commentButton");
const commentForm = document.getElementById("commentForm");

commentForm.style.visibility = "hidden";

commentButton.addEventListener("click", () => {
    commentForm.style.visibility = "visible";
});

const commentHandler = async (e) => {
    e.preventDefault();
    const commentBody = document.getElementById("commentBody").value.trim();
    const idString = window.location.href.split("/").pop();

    if (commentBody) {
        const response = await fetch(`/post/comment/${idString}`, {
            method: "POST",
            body: JSON.stringify({ commentBody }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.replace(`/post/view/${idString}`);
        } else {
            alert("Failed to add comment.");
        }
    }
};

document
    .getElementById("commentSubmit")
    .addEventListener("click", commentHandler);
