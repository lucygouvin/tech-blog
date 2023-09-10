const commentButton = document.getElementById("commentButton");
const commentForm = document.getElementById("commentForm");
const commentSubmit = document.getElementById("commentSubmit");
const commentBody = document.getElementById("commentBody");
commentForm.style.visibility = "hidden";

commentButton.addEventListener("click", () => {
    commentForm.style.visibility = "visible";
});

commentSubmit.addEventListener("click", () => {
    const bodyText = {
        cText: commentBody.value,
    };

    postComment(bodyText);
});

function postComment(comment) {
    fetch("/post/comment/2", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log("Successful POST request:", data);
            return data;
        })
        .catch((error) => {
            console.error("Error in POST request:", error);
        });
}
