import { usePost } from "../../hooks/usePost";
import { useProfile } from "../../hooks/useProfile"
import PostList from "../posts/PostList";


export default function MyPosts() {
    const { state: profileSate } = useProfile();
    // const posts = state?.posts;
    const {state: postState} = usePost();
    const myPosts = postState?.posts.filter(item => item?.author?.id === profileSate?.user?.id)
    return (
        <>
            <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts</h4>
            <PostList posts={myPosts} />
        </>
        
    )
}
