import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createJersey } from "../../managers/JerseyManager"
import Axios from "axios"
import './CreateJersey.css';
import { getTeams } from "../../managers/TeamsManager";

export const CreateJersey = () => {
    const navigate = useNavigate()
    const [teams, setTeams] = useState([])
    const [image, setImage] = useState()
    const [savedImage, setSavedImage] = useState("")
    const [currentJersey, setCurrentJersey] = useState({
        description: "",
        photo: "",
        year: "",
        team: ""
    })
    useEffect(() => {
        getTeams().then(data => setTeams(data))
    }, [])



    const changeJerseyState = (domEvent) => {

        const copy = { ...currentJersey }
        const propertyToModify = domEvent.target.id
        copy[propertyToModify] = domEvent.target.value
        setCurrentJersey(copy)
    }
    const saveImageClick = (event) => {
        event.preventDefault()

        uploadImage()
            .then((response) => { setSavedImage(response.data.url) })
    }

    const uploadImage = () => {
        const formData = new FormData()
        formData.append("file", image)
        formData.append("upload_preset", "qnuxbhjl")

        return Axios.post("https://api.cloudinary.com/v1_1/dlfjffxgj/image/upload", formData)
    }


    return (
        <form id="JerseyForm">

            <div className="form-container">

                <h2 className="JerseyForm__title">Create A Jersey</h2>
                <fieldset>
                    <div className="form-group-create">
                        <label htmlFor="title">Description: </label>
                        <input type="text" id="description" required autoFocus className="form-control-create"
                            value={currentJersey.description}
                            onChange={changeJerseyState}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group-create">
                        <label htmlFor="title">Year: </label>
                        <input type="text" id="year" required autoFocus className="form-control-create"
                            value={currentJersey.year}
                            onChange={changeJerseyState}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group-create">
                        <label htmlFor="title">Team: </label>
                        <select type="text" id="team" required autoFocus className="form-control-create"
                            value={currentJersey.team}
                            onChange={changeJerseyState}
                        ><option value={0}>Select a Team</option>
                            {
                                teams.map(team => {
                                    return <option value={team.id} onChange={changeJerseyState} key={team.id} required>{team.name}</option>
                                })
                            }

                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div>
                        <input id="file" className="btn btn-secondary"
                            type="file"
                            onChange={(event) => {
                                setImage(event.target.files[0]);
                            }}

                        >
                        </input>
                    </div>

                </fieldset>
                <div class="button-container">
                    <div>
                        <button id="form-button" className="btn btn-primary" onClick={(clickEvent) => { saveImageClick(clickEvent) }}
                        >Upload Image</button>
                    </div>


                    <button id="form-button" type="submit"
                        onClick={evt => {
                            evt.preventDefault()

                            const event = {

                                description: currentJersey.description,
                                photo: savedImage,
                                year: currentJersey.year,
                                team: parseInt(currentJersey.team)
                            }

                            createJersey(event)
                                .then(() => navigate("/"))
                        }

                        }
                        className="btn btn-success">Create Jersey</button>
                </div>
            </div>
        </form>
    )
}