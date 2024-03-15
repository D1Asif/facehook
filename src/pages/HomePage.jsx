import { useEffect } from "react";
import useAxios from "../hooks/useAxios";
import PostList from "../components/posts/PostList";
import { actions } from "../actions";
import { usePost } from "../hooks/usePost";
import NewPost from "../components/posts/NewPost";


export default function HomePage() {
    const { state, dispatch } = usePost();
    const { api } = useAxios();

    useEffect(() => {
        dispatch({ type: actions.post.DATA_FETCHING });
        const fetchPost = async () => {
            try {
                const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/posts`)
                if (response.status === 200) {
                    dispatch({
                        type: actions.post.DATA_FETCHED,
                        data: response.data
                    })
                }
            } catch (err) {
                console.log(err);
                dispatch({
                    type: actions.post.DATA_FETCH_ERROR,
                    error: err.message
                })
            }
        }
        fetchPost();
    }, []);

    if (state?.loading) {
        return <div>Fetching posts...</div>
    }

    if (state?.error) {
        return <div>
            Error is fetching posts {state?.error}
        </div>
    }

    return (
        <div>
            <NewPost />
            <PostList posts={state.posts} />
        </div>
    )
}
