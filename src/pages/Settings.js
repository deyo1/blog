import Card from "../components/Card";
import ConfirmationModal from "../components/ConfirmationModal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


import { useContext, useRef, useState } from "react";
import axios from "axios";
import AuthContext from "../store/AuthContext";
import { useHistory } from "react-router-dom";



const SettingsPage = () => {

    const [showDeleteModal, setDeleteModal] = useState(false);
    const authCtx = useContext(AuthContext);
    const history = useHistory();
    const passwordRef = useRef();

    const handleDeleteAccount = (event) => {
        event.preventDefault();

        axios.delete('http://localhost:8000/authors/' + authCtx.profile.userName).then(res => {
            if (res.statusText === 'OK') {
                axios.delete(`http://localhost:8000/posts?authorId=${authCtx.profile.userName}`).then(res => {
                    console.log(res);

                }).catch(err => {
                    console.log(err);
                })
            }
            console.log(res);
            authCtx.logout();
            history.replace('/');
        }).catch(err => {
            console.log(err);
        })
    }

    const submitHandler = (event) => {

        event.preventDefault();

        let profile = authCtx.profile;
        let password = passwordRef.current.value;
        let author = {
            id: profile.userName,
            firstName: profile.firstName,
            lastName: profile.lastName,
            password: password
        }

        axios.put('http://localhost:8000/authors/' + profile.userName, author)
            .then(res => {
                console.log(res);
                history.replace('/');
            }).catch(err => {
                console.log(err);
            })
    }


    return (
        <>
            <Card>
                <Form
                    style={{ width: '200px', margin: 'auto' }}
                    onSubmit={submitHandler}
                >
                    <Form.Text>
                        <h3>User:</h3>
                        <h4>
                            {`${authCtx.profile.firstName} ${authCtx.profile.lastName}`}
                        </h4>
                    </Form.Text>
                    <Form.Group controlId='Password'>
                        <Form.Label>Change password:</Form.Label>
                        <Form.Control type='password' ref={passwordRef} required="true" />
                    </Form.Group>
                    <Button variant="outline-success" type='submit'
                        style={{ margin: '2%' }}>Submit</Button>
                </Form>
                <Button variant='outline-danger' onClick={() => setDeleteModal(true)}>Delete account</Button>
                <ConfirmationModal
                    show={showDeleteModal}
                    onHide={() => setDeleteModal(false)}
                    confirme={handleDeleteAccount}
                    text={`Are you sure you want to delete your account?
                                        All your posts will be deleted.`}
                />


            </Card>
        </>
    );
}

export default SettingsPage;