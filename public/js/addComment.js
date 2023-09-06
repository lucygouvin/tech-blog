const commentButton = document.getElementById("commentButton");
const commentForm = document.getElementById("commentForm");
commentForm.style.visibility = "hidden";

commentButton.addEventListener("click", () => {
    commentForm.style.visibility = "visible";
});
