import React, { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { getTeams } from "../../managers/TeamsManager"
import './Teams.css';

export const Teams = () => {
    const [teams, setTeams] = useState([])
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        getTeams().then(data => setTeams(data))
    }, [])


    return (<>
        <section className="teams1">
            <h1>Teams </h1>
            <section className="logoContainer">
                {


                    teams.sort((a, b) => a.name.localeCompare(b.name)).map(team => {
                        return <div key={team.id}>
                            <img src={team.logo} className="logo" />

                            <Link className="team-name" to={`${team.id}`}>{team.name}</Link>
                        </div>
                    })

                }
            </section>

        </section> </>)
}