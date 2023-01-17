import { Container, Nav, Navbar } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import './Navbar.css';

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <Navbar bg="dark" variant="dark" className="Nav">

            <Container>

                {
                    (localStorage.getItem("d_token") !== null) ?
                        <>
                            <Navbar.Brand href="/">Dump'n'Chase Sweaters</Navbar.Brand>
                            <Nav.Link href="/create" className="navLink">Create Jersey</Nav.Link>
                            <Nav.Link href="/collections" className="navLink"> My Jerseys</Nav.Link>
                            <Nav.Link href="/teams" className="navLink"> Teams</Nav.Link>
                            <Nav.Link className="navLink"
                                onClick={() => {
                                    localStorage.removeItem("d_token")
                                    localStorage.removeItem("user")
                                    navigate('/login')
                                }}
                            >Logout</Nav.Link>
                        </>

                        :
                        <>
                            <Nav.Link href="/login" className="navLink">Login</Nav.Link>
                            <Nav.Link href="/register" className="navLink">Register</Nav.Link>
                        </>

                }


            </Container>
        </Navbar>
    )
}
