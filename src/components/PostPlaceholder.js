import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from '../components/Card';

import { useState } from 'react';
import { useHistory } from 'react-router';

const PostPlaceholder = (props) => {

    const [post, setPost] = useState(props.post);
    const history = useHistory();
    const style = {
        margin: '1%',
    }

    const handleTitleChange = (event) => {
        setPost({ ...post, title: event.target.value });
    }

    const handleTextChange = (event) => {
        setPost({ ...post, text: event.target.value });
    }

    const handleDescriptionChange = (event) => {
        setPost({ ...post, description: event.target.value });
    }

    const handleConfirme = (event) => {
        props.handleSubmit(event, post);
    }

    return (
        <Card>
            <Form onSubmit={handleConfirme}>
                <Form.Group controlId='title'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        style={{ width: '80%' , margin: 'auto'}}
                        type='text'
                        value={post.title}
                        onChange={handleTitleChange}
                        required="true" />
                </Form.Group>
                <br />
                <Form.Group controlId='description'>
                    <Form.Label>Short description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        value={post.description}
                        onChange={handleDescriptionChange}
                        required="true" />
                </Form.Group>
                <br />
                <Form.Group controlId='text'>
                    <Form.Label>Your post</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={15}
                        value={post.text}
                        onChange={handleTextChange}
                        required="true" />
                </Form.Group>
                <Button
                    style={style}
                    variant='outline-success'
                    type='submit'
                    onClick={
                        () => {
                            if (props.addPost) {
                                let date = new Date();
                                setPost({ ...post, date: date.toDateString() });
                            }
                        }
                    }
                >Submit</Button>{' '}
                <Button
                    style={style}
                    variant='outline-secondary'
                    onClick={
                        () => history.goBack()
                    }>Cancel</Button>
            </Form>

        </Card>
    );
}

export default PostPlaceholder;