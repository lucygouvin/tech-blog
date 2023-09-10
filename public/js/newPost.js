const newPost = document.getElementById("postSubmit");
const postTitle = document.getElementById("postTitle");
const postBody = document.getElementById("postBody");

newPost.addEventListener("click", () => {
    const postContent = {
        titleContent: postTitle.value,
        bodyContent: postBody.value,
    };

    postPost(postContent);
});

function postPost(post) {
    fetch("/dashboard/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
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
