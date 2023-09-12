const editHandler = async (e) => {
    e.preventDefault();

    const newTitle = document.getElementById("edit-title").value.trim();
    const newBody = document.getElementById("edit-body").value.trim();

    if (newTitle && newBody) {
        const idString = window.location.href.split("/").pop();
        const response = await fetch(`/post/edit/${idString}`, {
            method: "PUT",
            body: JSON.stringify({ newTitle, newBody }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.replace(`/post/view/${idString}`);
        } else {
            alert("Failed to edit post.");
        }
    }
};

const deleteHandler = async (e) => {
    e.preventDefault();

    const idString = window.location.href.split("/").pop();
    const response = await fetch(`/post/delete/${idString}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert("Failed to delete post.");
    }
};

document.getElementById("edit-button").addEventListener("click", editHandler);
document
    .getElementById("delete-button")
    .addEventListener("click", deleteHandler);
