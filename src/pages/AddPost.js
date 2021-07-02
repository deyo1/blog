import { useContext } from "react";
import { useHistory } from "react-router";
import PostPlaceholder from "../components/PostPlaceholder";
import AuthContext from "../store/AuthContext";
import axios from "axios";

const AddPostPage = () => {

    const history = useHistory();
    const authCtx = useContext(AuthContext);

    let post = {
        author: authCtx.profile.firstName + ' ' + authCtx.profile.lastName,
        title: '',
        date: '',
        description: '',
        text: '',
        authorId: authCtx.profile.userName
    }

    const handleSubmit = (event, post) => {
        event.preventDefault();
        axios.post('http://localhost:8000/posts', post).then(res => {
            console.log(res);
            history.replace('/');
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <PostPlaceholder handleSubmit={handleSubmit} post={post} addPost={true} />
    );
    }
export default AddPostPage;