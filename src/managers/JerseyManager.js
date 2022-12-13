export const getJersey = () => {
    return fetch("http://localhost:8000/jerseyPosts", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("d_token")}`
        }
    })
        .then(response => response.json())
}
export const createJersey = (event) => {
    return fetch("http://localhost:8000/jerseyPosts", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("d_token")}`,
            "Content-Type": "application/json"
        }, method: "POST", body: JSON.stringify(event)
    })
        .then(response => response.json())
}


export const getSingleJersey = (id) => {
    return fetch(`http://localhost:8000/jerseyPosts/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("d_token")}`
        }
    })
        .then(response => response.json())
}
export const DeleteJersey = (id) => {
    return fetch(`http://localhost:8000/jerseyPosts/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("d_token")}`,

        }
    })
}
export const UpdateJersey = (id, updatedJersey) => {
    return fetch(`http://localhost:8000/jerseyPosts/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("d_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedJersey)
    })
}



