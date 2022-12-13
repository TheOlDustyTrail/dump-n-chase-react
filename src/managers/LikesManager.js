export const createLike = (event) => {
    return fetch("http://localhost:8000/likes", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("d_token")}`,
            "Content-Type": "application/json"
        }, method: "POST", body: JSON.stringify(event)
    })
        .then(response => response.json())
}

export const DeleteLike = (id) => {
    return fetch(`http://localhost:8000/likes/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("d_token")}`,

        }
    })
}
export const getLikes = () => {
    return fetch("http://localhost:8000/likes", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("d_token")}`
        }
    })
        .then(response => response.json())
}