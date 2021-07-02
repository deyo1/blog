import { Link } from 'react-router-dom';


const PostItem = (props) => {

    return (
        <>
            <h4>
                <Link to={'/posts/' + props.post.id}
                    style={{
                        textDecoration: 'none',
                        color: 'black'
                    }}>
                    {props.post.title}
                </Link>
            </h4>
            <br />
            <p>{props.post.date}</p>
            <br />
            <p>{props.post.description}</p>
            <p>{props.post.author}</p>
            <br />
        </>
    );
}

export default PostItem;