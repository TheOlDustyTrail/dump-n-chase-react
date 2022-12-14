import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createJersey } from "../../managers/JerseyManager"


export const CreateJersey = () => {
    const navigate = useNavigate()

    const [currentJersey, setCurrentJersey] = useState({
        description: "",
        photo: "",
        year: "",
        team: ""
    })


    const changeGameState = (domEvent) => {

        const copy = { ...currentJersey }
        const propertyToModify = domEvent.target.id
        copy[propertyToModify] = domEvent.target.value
        setCurrentJersey(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Create A Jersey</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Description: </label>
                    <input type="text" id="description" required autoFocus className="form-control"
                        value={currentJersey.description}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Photo: </label>
                    <input type="text" id="photo" required autoFocus className="form-control"
                        value={currentJersey.photo}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Year: </label>
                    <input type="text" id="year" required autoFocus className="form-control"
                        value={currentJersey.year}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Team: </label>
                    <input type="number" id="team" required autoFocus className="form-control"
                        value={currentJersey.team}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const event = {

                        description: currentJersey.description,
                        photo: currentJersey.photo,
                        year: currentJersey.year,
                        team: parseInt(currentJersey.team)
                    }

                    createJersey(event)
                        .then(() => navigate("/"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}