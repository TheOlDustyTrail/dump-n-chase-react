import React, { useEffect, useState } from "react"
import { getJersey } from "../../managers/JerseyManager"


export const JerseyList = (props) => {
    const [jerseys, setJerseys] = useState([])

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
                </div>
            })

        }
    </>)
}