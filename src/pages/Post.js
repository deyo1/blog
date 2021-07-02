import { Redirect, useParams } from 'react-router-dom';
import Card from "../components/Card";

import axios from 'axios';
import { useEffect, useState } from 'react';


const PostPage = () => {

    const { postId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [post, setPost] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get('http://localhost:8000/posts/' + postId).then(res => {
            if (res.data) {
                setPost(res.data);
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setError(true);
        })
    }, [postId]);

    if (error) {
        return(
            <Redirect to='/page-not-found' />
        );
    }

    return (
        <Card>
            {isLoading && (
                <p>Loading...</p>
            )}
            {!isLoading && (
                    <>
                <h2>{post.title}</h2>
                <br />
                <p>{post.date}</p>
                <p>{post.description}</p>
                <br />
                <p>{post.text}</p>
                <br />
                <p>{post.author}</p>
                </>
                )}
        </Card>
    );
}

export default PostPage;