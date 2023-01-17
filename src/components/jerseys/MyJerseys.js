import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { DeleteJersey, getJersey } from "../../managers/JerseyManager"
import { DeleteLike, getLikes } from "../../managers/LikesManager"
import { getTeams } from "../../managers/TeamsManager"


export const MyJerseys = () => {
    const [Likes, setLikes] = useState([])
    const [teams, setTeams] = useState([])
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        getLikes().then(data => setLikes(data))
    }, [])

    useEffect(() => {
        getTeams().then(data => setTeams(data))
    }, [])


    return (<>
        <section className='jerseyPage'>
            <h1>Collections </h1>

            {


                Likes.map(like => {


                    return <div key={like.id}>
                        <section className="postContainer">
                            <img src={like.jersey.photo} className="jerseyPhoto" />
                            <p className="jerseyCaption">Year: {like.jersey.year}</p>
                            <p className="jerseyCaption">Description: {like.jersey.description}</p>
                            <p className="jerseyCaption">Team: {
                                teams.map(team =>
                                    like.jersey.team === team.id
                                        ? <>{team.name}</>
                                        : ""
                                )}</p>

                            <Button variant="outline-danger" onClick={() => DeleteLike(like.id).then(() => {
                                window.location.reload(false);
                            })} >Remove Jersey</Button>
                        </section>

                    </div>
                })

            }
        </section> </>)
}