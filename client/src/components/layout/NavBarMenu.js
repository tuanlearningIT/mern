import { Nav, Navbar, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
const NavBarMenu = () => {
    const { authState: {
        user: { username }
    },
        logoutUser
    } = useContext(AuthContext)
    const logout = () => logoutUser()

    return (
        <Navbar className="navbar navbar-dark bg-dark">

            <Navbar.Brand className="fw-bold ms-4">
                <a >Learnit</a>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className="me-auto">
                    <Nav.Link className="fw-bold text-white" to='/dashboard' as={Link} >
                        DashBoard
                    </Nav.Link>
                    <Nav.Link className="fw-bold text-white" to='/about' as={Link} >
                        About
                    </Nav.Link>
                </Nav>
                <Nav className="me-3" >
                    <Nav.Link className="fw-bold text-white" disabled >
                        Welcome {username}
                    </Nav.Link>
                    <Button size="md" variant="secondary" className="fw-bolder text-white shadow-none" onClick={logout}>
                        <a className="mr-2" />
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>



        </Navbar>


    )
}

export default NavBarMenu;