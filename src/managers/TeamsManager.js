export const getTeams = () => {
    return fetch("http://localhost:8000/teams", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("d_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleTeam = (id) => {
    return fetch(`http://localhost:8000/teams/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("d_token")}`
        }
    })
        .then(response => response.json())
}
export const getTeamJerseys = (id) => {
    return fetch(`http://localhost:8000/jerseyPosts?team=${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("d_token")}`
        }
    })
        .then(response => response.json())
}