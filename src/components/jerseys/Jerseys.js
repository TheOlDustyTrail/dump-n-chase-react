import { Button } from "bootstrap"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DeleteJersey, getJersey } from "../../managers/JerseyManager"
import { createLike } from "../../managers/LikesManager"


export const JerseyList = () => {
    const [jerseys, setJerseys] = useState([])
    const navigate = useNavigate()
    const localSweaterUser = JSON.parse(localStorage.getItem("user"))
    useEffect(() => {
        getJersey().then(data => setJerseys(data))
    }, [])


    return (<>
        <h1>Home </h1>
        {
            jerseys.map(jersey => {

                return <div key={jersey.id}>
                    <img src={jersey.photo} />
                    <p>Year: {jersey.year}</p>
                    <p>Description: {jersey.description}</p>
                    <p>Team: {jersey.team.name}</p>

                    <button onClick={() => navigate(`${jersey.id}/edit`)} >Update Jersey</button>

                    {localSweaterUser.staff

                        ? <button onClick={() => DeleteJersey(jersey.id)} >Remove Jersey</button>
                        : "Else"
                    }
                    <button onClick={evt => {
                        // Prevent form from being submitted
                        evt.preventDefault()

                        const event = {

                            jersey: jersey.id
                        }

                        // Send POST request to your API
                        createLike(event)
                            .then(() => navigate("/collections"))
                    }} >Add to Collection</button>
                </div>
            })

        }
    </>)
}