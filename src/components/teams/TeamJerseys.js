import { DeleteJersey } from "../../managers/JerseyManager"
import { getSingleTeam, getTeamJerseys } from "../../managers/TeamsManager"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getComment } from "../../managers/CommentManager"
import { Button, Carousel } from 'react-bootstrap';
import { createLike } from "../../managers/LikesManager"
import './TeamJerseys.css';


export const TeamJerseys = () => {
    const [teamJerseys, setTeamJerseys] = useState([])
    const [team, setTeams] = useState([])
    const { teamId } = useParams()
    const navigate = useNavigate()
    const localSweaterUser = JSON.parse(localStorage.getItem("user"))
    useEffect(() => {
        getTeamJerseys(teamId).then(data => setTeamJerseys(data))
    }, [])
    const [comments, setComments] = useState([])

    useEffect(() => {
        getComment().then(data => setComments(data))
    }, [])
    useEffect(() => {
        getSingleTeam(teamId).then(data => setTeams(data))
    }, [])





    return (<>
        <h1 style={{ position: 'relative', zIndex: 2 }} className="TeamHeader"><img src={team.logo} className="logo" />{team.name} </h1>
        <body style={{ height: '100%' }}>
            {
                teamJerseys.map(jersey => {

                    return <div key={jersey.id} className="teams">
                        <section style={{ position: 'relative', zIndex: 1, height: '100%' }}>
                            <Carousel
                                style={{
                                    position: 'fixed',
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    height: '100%'
                                }}
                                interval={2500}
                                controls={false}
                            >
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={`${team.carousel1}`}
                                        alt="First slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={`${team.carousel2}`}
                                        alt="Second slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={`${team.carousel3}`}
                                        alt="Third slide"
                                    />
                                </Carousel.Item>
                            </Carousel>
                        </section>
                        <section className="postContainer" style={{ position: 'relative', zIndex: 2 }}>
                            <img src={jersey.photo} className="jerseyPhoto" />
                            <p className="jerseyCaption">{jersey.description}</p>
                            <p className="jerseyCaption">Year: {jersey.year}</p>
                            <p className="jerseyCaption">Team: {team.name}</p>


                            {
                                localSweaterUser.userId === jersey.creator.id

                                    ? <Button variant="outline-info" onClick={() => navigate(`${jersey.id}/edit`)} >Update Jersey</Button>
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

                        <section className="allComments" style={{ position: 'relative', zIndex: 2 }}>
                            <div>Comments:</div>
                            {
                                comments.map(
                                    comment => {
                                        if (comment.jersey === jersey.id) {
                                            return <p className="comment">{comment.comment} </p>
                                        }

                                    }
                                )
                            }
                        </section>



                    </div>

                })

            }

        </body>
    </>)
}