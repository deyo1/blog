import Card from "./Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"

import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import { useHistory } from "react-router";
import { useRef } from "react";
import axios from "axios";

const LoginForm = () => {

    const authCtx = useContext(AuthContext);
    const history = useHistory();
    const firstNameRef = useRef('');
    const lastNameRef = useRef('');
    const userNameRef = useRef('');
    const passwordRef = useRef('');

    const [isSignUp, setIsSignUp] = useState(false);

    const switchLogin = () => {
        setIsSignUp(isSignUp => !isSignUp);
    }

    const submitHandler = (event) => {

        event.preventDefault();

        const enteredUserName = userNameRef.current.value;
        const enteredpassword = passwordRef.current.value;

        if (isSignUp) {

            const enteredFirstName = firstNameRef.current.value;
            const enteredLastName = lastNameRef.current.value;

            axios.post('http://localhost:8000/authors', {
                firstName: enteredFirstName,
                lastName: enteredLastName,
                id: enteredUserName,
                password: enteredpassword
            }).then(res => {
                if (res.statusText === "Created") {
                    let profile = {
                        firstName: enteredFirstName,
                        lastName: enteredLastName,
                        userName: enteredUserName
                    }
                    authCtx.login(profile);
                    history.replace('/');
                }
            }).catch(err => {
                console.log(err);
                alert('User name taken.');
            })
        }
        else {
            axios.get(`http://localhost:8000/authors?id=${enteredUserName}&password=${enteredpassword}`)
            .then(res => {
                if (res.data[0]) {
                    let profile = {
                        firstName: res.data[0].firstName,
                        lastName: res.data[0].lastName,
                        userName: res.data[0].id
                    }
                    authCtx.login(profile);
                    history.replace('/');
                }
                else {
                    alert('Wrong password or user name.');
                }
            }).catch(err => {
                console.log(err);
            })
        }


    }

    return (
        <Card>
            <Form
                style={{ width: '200px', margin: 'auto' }}
                onSubmit={submitHandler}
            >
                <Form.Text>
                    <h2>
                        {isSignUp ? 'Sign up' : 'Login'}
                    </h2>
                </Form.Text>
                {isSignUp && (
                    <>
                        <Form.Group controlId='firstName'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type='text' ref={firstNameRef} required="true" />
                        </Form.Group>
                        <Form.Group controlId='lastName'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type='text' ref={lastNameRef} required="true" />
                        </Form.Group>
                    </>
                )}
                <Form.Group controlId='userName'>
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type='text' ref={userNameRef} required="true" />
                </Form.Group>
                <Form.Group controlId='Password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' ref={passwordRef} required="true" />
                </Form.Group>
                <Button variant="outline-success" type='submit'
                    style={{ margin: '2%' }}>{isSignUp ? 'Sign up' : 'Login'}</Button>
            </Form>
            <Button variant='outline-secondary'
                onClick={switchLogin}
            >
                {isSignUp ? 'Login with existing account' : 'Create new account'}
            </Button>
        </Card>
    );
}

export default LoginForm;