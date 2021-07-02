import AuthContext from "../store/AuthContext";
import { useContext, useState, useEffect } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Card from '../components/Card';

import PostPlaceholder from "../components/PostPlaceholder";
import ConfirmationModal from "../components/ConfirmationModal";
import Button from "react-bootstrap/Button";

const EditPostPage = () => {
    const postId = useLocation().pathname.slice(6);
    const authCtx = useContext(AuthContext);
    const userName = authCtx.profile.userName;
    const history = useHistory();
    const [post, setPost] = useState({
        title: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [showDeleteModal, setDeleteModal] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`http://localhost:8000/posts?id=${postId}&authorId=${userName}`)
            .then(res => {
                if (res.data[0]) {
                    setPost(res.data[0]);
                }
                else {
                    setError(true);
                }
                setIsLoading(false);
            }).catch(err => {
                console.log(err);
                setError(true);
            })
    }, [postId, userName]);

    const handleSubmit = (event, post) => {
        event.preventDefault();
        axios.put('http://localhost:8000/posts/' + post.id, post).then(res => {
            console.log(res);
            history.replace('/');
        }).catch(err => {
            console.log(err);
        })
    }

    const handleDeletePost = (event) => {
        event.preventDefault();
        axios.delete(`http://localhost:8000/posts/${post.id}`).then(res => {
            console.log(res);
            history.replace('/');
        }
        ).catch(err => {
            console.log(err);
        })
    }

    if (error) {
        return (
            <Redirect to='/your-posts' />
        );
    }

    return (
        <Card>
            {isLoading && (
                <p>Loading...</p>
            )}
            {!isLoading && (
                <>
                    <PostPlaceholder handleSubmit={handleSubmit} post={post} />

                    <Button variant='outline-danger' onClick={() => setDeleteModal(true)}>Delete Post</Button>
                    <ConfirmationModal
                        show={showDeleteModal}
                        onHide={() => setDeleteModal(false)}
                        confirme={handleDeletePost}
                        text={`Are you sure you want to delete ${post.title}?`}
                    />
                </>
            )}
        </Card>
    );

}

export default EditPostPage;