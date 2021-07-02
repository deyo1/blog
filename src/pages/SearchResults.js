import PostList from "../components/PostList";
import { useParams } from "react-router";

const SerachResultsPage = () => {

    const { query } = useParams();
    
    return (
        <PostList authorId={''} author={query} text={'Nothing found.'} />
    );
   
}

export default SerachResultsPage;