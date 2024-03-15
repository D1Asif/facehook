import { useState } from "react";
import PostCommentList from "./PostCommentList";
import useAxios from "../../hooks/useAxios";
import { useUser } from "../../hooks/useUser";


export default function PostComments({ post }) {
    const user = useUser();
    const [showAllComments, setShowAllComments] = useState(true);
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState("");

    const { api } = useAxios()

    const addComment = async (e) => {
        const keyCode = e.keyCode;

        if (keyCode === 13) {
            try {
                const response = await api.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post?.id}/comment`, { comment });

                if (response.status === 200) {
                    setComments([...response.data.comments])
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    return (
        <div>
            <div className="flex-center mb-3 gap-2 lg:gap-4">
                <img
                    className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
                    src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
                    alt="avatar"
                />
                <div className="flex-1">
                    <input
                        type="text"
                        className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
                        name="post"
                        id="post"
                        placeholder="What's on your mind?"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onKeyDown={(e) => addComment(e)}
                    />
                </div>
            </div>

            <div className="mt-4">
                <button className="text-gray-300 max-md:text-sm"
                    onClick={() => setShowAllComments(!showAllComments)}
                >
                    All Comment ▾
                </button>
            </div>

            {
                showAllComments && <PostCommentList comments={comments} />
            }
        </div>
    )
}
