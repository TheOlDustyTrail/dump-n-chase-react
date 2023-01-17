import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getComment } from "../../managers/CommentManager"
import { DeleteJersey, getJersey } from "../../managers/JerseyManager"
import { DeleteComment } from "../../managers/CommentManager"
import { createLike } from "../../managers/LikesManager"
import './Jerseys.css';
import { getTeams } from '../../managers/TeamsManager';

export const JerseyList = () => {
    const [jerseys, setJerseys] = useState([])
    const [teams, setTeams] = useState([])
    const navigate = useNavigate()
    const localSweaterUser = JSON.parse(localStorage.getItem("user"))
    useEffect(() => {
        getJersey().then(data => setJerseys(data))
    }, [])
    const [comments, setComments] = useState([])

    useEffect(() => {
        getComment().then(data => setComments(data))
    }, [])

    useEffect(() => {
        getTeams().then(data => setTeams(data))
    }, [])



    return (<>
        <section className='jerseyPage'>
            <h1>Dump'n'Chase Sweaters </h1>
            {
                jerseys.map(jersey => {

                    return <div key={jersey.id}>


                        <section className="postContainer">
                            <img src={jersey.photo} className="jerseyPhoto" />
                            <p className="jerseyCaption">{jersey.description}</p>
                            <p className="jerseyCaption">Year: {jersey.year}</p>
                            <p className="jerseyCaption">Team: {
                                teams.map(team =>
                                    jersey.team === team.id
                                        ? <>{team.name}</>
                                        : ""
                                )}</p>


                            {
                                localSweaterUser.userId === jersey.creator

                                    ? <Button variant="outline-primary" onClick={() => navigate(`${jersey.id}/edit`)} >Update Jersey</Button>
                                    : ""
                            }



                            <Button variant="outline-secondary" onClick={() => navigate(`${jersey.id}/comments`)} >Add a Comment </Button>

                            {localSweaterUser.staff

                                ? <Button variant="outline-danger" onClick={() => DeleteJersey(jersey.id).then(() => {
                                    window.location.reload(false);
                                })} >Remove Jersey</Button>
                                : ""
                            }
                            <Button variant="outline-success" onClick={evt => {
                                evt.preventDefault()
                                const event = {
                                    jersey: jersey.id
                                }

                                createLike(event)
                                    .then(() => navigate("/collections"))
                            }} >Add to Collection</Button>
                        </section>
                        <section className="allComments">
                            <div>Comments:</div>
                            {
                                comments.map(
                                    comment => {
                                        if (comment.jersey === jersey.id) {
                                            return <div key={comment.id}>
                                                <p className="comment" key={comment.id}>{comment.comment} </p>
                                                {
                                                    comment.user === localSweaterUser.userId
                                                        ? <Button variant="outline-danger" onClick={() => DeleteComment(comment.id).then(() => {
                                                            window.location.reload(false);
                                                        })} >Remove Comment</Button>
                                                        : ""

                                                }
                                            </div>
                                        }

                                    }
                                )
                            }
                        </section>

                    </div>
                })

            }
        </section> </>)
}