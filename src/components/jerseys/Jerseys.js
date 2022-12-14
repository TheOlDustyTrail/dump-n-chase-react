import { Button } from "bootstrap"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getComment } from "../../managers/CommentManager"
import { DeleteJersey, getJersey } from "../../managers/JerseyManager"
import { createLike } from "../../managers/LikesManager"


export const JerseyList = () => {
    const [jerseys, setJerseys] = useState([])
    const navigate = useNavigate()
    const localSweaterUser = JSON.parse(localStorage.getItem("user"))
    useEffect(() => {
        getJersey().then(data => setJerseys(data))
    }, [])
    const [comments, setComments] = useState([])

    useEffect(() => {
        getComment().then(data => setComments(data))
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

                    {
                        localSweaterUser.userId === jersey.creator.id

                            ? <button onClick={() => navigate(`${jersey.id}/edit`)} >Update Jersey</button>
                            : "Not true"
                    }



                    <button onClick={() => navigate(`${jersey.id}/comments`)} >Add a Comment </button>

                    {localSweaterUser.staff

                        ? <button onClick={() => DeleteJersey(jersey.id).then(() => {
                            window.location.reload(false);
                        })} >Remove Jersey</button>
                        : ""
                    }
                    <button onClick={evt => {
                        evt.preventDefault()
                        const event = {
                            jersey: jersey.id
                        }

                        createLike(event)
                            .then(() => navigate("/collections"))
                    }} >Add to Collection</button>
                    <div>Comments:</div>
                    {
                        comments.map(
                            comment => {
                                if (comment.jersey === jersey.id) {
                                    return <p>{comment.comment} </p>
                                }

                            }
                        )
                    }

                </div>
            })

        }
    </>)
}