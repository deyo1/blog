import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import FormControl from "react-bootstrap/FormControl";


import { Link, useHistory } from 'react-router-dom';
import { useContext, useRef } from 'react';
import AuthContext from '../store/AuthContext';


const Header = () => {

    const authCtx = useContext(AuthContext);
    const history = useHistory();
    const searchRef = useRef();

    const logoutHandler = () => {
        authCtx.logout();
        history.replace('/');
    }

    const handleSearch = () => {
        let query = searchRef.current.value;
        if (query !== '') {
            history.push('/search-results/' + query);
        }
        searchRef.current.value = '';
    }

    const handleEditPost = () => {
        let postId = history.location.pathname.split('/').pop();
        if (!postId) {
            history.push('/your-posts');
        }
        else {
            history.push('/edit/' + postId);
        }
    }

    return (
        <Navbar bg="light" expand="sm">
            <Navbar.Brand style={{ marginLeft: "15px" }} as={Link} to="/"><h3>Blog</h3></Navbar.Brand>
            <Navbar.Toggle style={{margin: "10px"}} />
            <Navbar.Collapse style={{margin: "15px"}} id="collapse">
            <Nav className="justify-content-end" style={{ width: "100%", margin: "10px" }}>
                {authCtx.isLogedIn && (
                    <>
                    <NavDropdown title="Post" id="post">
                    <NavDropdown.Item as={Link} to="/your-posts">Your posts</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/add-post">Add new post</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleEditPost}>Edit post</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/settings">Profile</NavDropdown.Item>
                    </NavDropdown>
                    </>
                    )}
                    {!authCtx.isLogedIn
                        ? <Nav.Item>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        </Nav.Item>
                        : <Nav.Item>
                            <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                        </Nav.Item>
                    }
                    <Nav.Item style={{marginRight: "5px"}}>
                        <FormControl type="text" placeholder="Search" ref={searchRef} />
                    </Nav.Item>
                    <Nav.Item>
                    <Button onClick={handleSearch} variant="outline-secondary">Search</Button>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;