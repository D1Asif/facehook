import PostCard from "./PostCard"

export default function PostList({ posts }) {
    if (posts.length > 0) {
        posts.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
    }
    return (
        !!posts && posts.map((post) => (
            <PostCard key={post.id} post={post} />
        ))
    )
}
