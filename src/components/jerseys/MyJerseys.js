import { Button } from "bootstrap"
import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { DeleteJersey, getJersey } from "../../managers/JerseyManager"
import { DeleteLike, getLikes } from "../../managers/LikesManager"


export const MyJerseys = () => {
    const [Likes, setLikes] = useState([])
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        getLikes().then(data => setLikes(data))
    }, [])


    return (<>
        <h1>Collections </h1>
        {


            Likes.map(like => {


                return <div key={like.id}>
                    <img src={like.jersey.photo} />
                    <p>Year: {like.jersey.year}</p>
                    <p>Description: {like.jersey.description}</p>
                    <p>Team: {like.jersey.team.name}</p>

                    <button onClick={() => DeleteLike(like.id).then(() => {
                        window.location.reload(false);
                    })} >Remove Jersey</button>
                </div>
            })

        }
    </>)
}