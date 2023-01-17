import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createComment, getComment } from "../../managers/CommentManager"
import { createJersey } from "../../managers/JerseyManager"


export const CreateComment = () => {
    const navigate = useNavigate()
    const { jerseyId } = useParams()
    const [comments, setComments] = useState([])

    useEffect(() => {
        getComment().then(data => setComments(data))
    }, [])



    const [currentComment, setCurrentComment] = useState({
        comment: "",
        jersey: jerseyId
    })


    const changeGameState = (domEvent) => {

        const copy = { ...currentComment }
        const propertyToModify = domEvent.target.id
        copy[propertyToModify] = domEvent.target.value
        setCurrentComment(copy)
    }

    return (
        <form className="commentForm">
            <h2 className="gameForm__title">Add A comment</h2>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Comment: </label>
                    <input type="text" id="comment" required autoFocus className="form-control"
                        value={currentComment.comment}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const event = {

                        comment: currentComment.comment,
                        jersey: jerseyId
                    }

                    createComment(event)
                        .then(() => navigate("/"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}