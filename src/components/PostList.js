import { useEffect, useState } from "react";

import PostItem from "../components/PostItem";
import Card from "../components/Card";
import Paginate from "../components/Pagination";

import axios from "axios";


function PostList(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [loadedPosts, setLoadedPosts] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [lastPage, setLastPage] = useState(Infinity);
    const [error, setError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`http://localhost:8000/posts?${props.author}_sort=id&_order=desc`, {
            params: {
                _page: activePage,
                _limit: 10
            }
        }).then(res => {
            setLastPage(Math.ceil(res.headers["x-total-count"] / 10));
            setLoadedPosts(res.data);
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setError(true);
        });
    }, [activePage, props.author]);

        if(error) {
            return(
                <Card>
                    <p>Something went wrong.</p>
                </Card>
            );
        }


    return <Card>
        {isLoading && (<p>Loading</p>)}
        {!isLoading && (
            <>
            <ul>
                {loadedPosts.length === 0 && (
                    <h4>{props.text}</h4>
                )}
                {loadedPosts.map(post => (
                    <PostItem
                        key={post.id}
                        post={post}
                    />
                ))}
            </ul>
            <Paginate 
                    activePage={activePage}
                    lastPage={lastPage}
                    setActivePage={setActivePage}
                />
            </>
        )}
    </Card>;


}

export default PostList;