export const DeleteComment = (id) => {
    return fetch(`http://localhost:8000/comments/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("d_token")}`,

        }
    })
}
export const UpdateComment = (id, updatedComment) => {
    return fetch(`http://localhost:8000/comments/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("d_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedComment)
    })
}

export const getComment = () => {
    return fetch("http://localhost:8000/comments", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("d_token")}`
        }
    })
        .then(response => response.json())
}
export const createComment = (event) => {
    return fetch("http://localhost:8000/comments", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("d_token")}`,
            "Content-Type": "application/json"
        }, method: "POST", body: JSON.stringify(event)
    })
        .then(response => response.json())
}