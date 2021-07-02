import { useContext } from "react";
import PostList from "../components/PostList";
import AuthContext from "../store/AuthContext";

const UserPostsPage = () => {

    const authCtx = useContext(AuthContext);

    return (
        <>
        <PostList author={''} authorId={authCtx.profile.userName} text={"You don't have any posts."} />
        </>
    );

}

export default UserPostsPage;