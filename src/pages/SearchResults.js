import PostList from "../components/PostList";
import { useParams } from "react-router";

const SerachResultsPage = () => {

    const { query } = useParams();
    
    return (
        <PostList author={`author=${query}&`} text={'Nothing found.'} />
    );
   
}

export default SerachResultsPage;