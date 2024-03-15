import TimeIcon from "../../assets/icons/time.svg"
import ThreeDots from "../../assets/icons/3dots.svg"
import EditIcon from "../../assets/icons/edit.svg"
import DeleteIcon from "../../assets/icons/delete.svg"
import { getTimeDifferenceFromNow } from "../../utils"
import { useAvatar } from "../../hooks/useAvatar"
import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { usePost } from "../../hooks/usePost"
import { actions } from "../../actions"
import useAxios from "../../hooks/useAxios"
import { createPortal } from "react-dom"
import PostEntry from "./PostEntry"

export default function PostHeader({ post }) {
    const [showAction, setShowAction] = useState(false);
    const { avatarURL } = useAvatar(post);
    const { auth } = useAuth();
    const { dispatch } = usePost();
    const { api } = useAxios();
    const [showEditPostModal, setShowEditPostModal] = useState(false);

    const toggleAction = () => {
        setShowAction(!showAction);
    }

    const isMe = auth?.user?.id === post?.author?.id;

    const handleDeletePost = async () => {
        dispatch({ type: actions.post.DATA_FETCHING });
        try {
            const response = await api.delete(`${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post?.id}`);
            if (response.status === 200) {
                dispatch({
                    type: actions.post.POST_DELETED,
                    data: post.id
                })
            }
        } catch (err) {
            console.error(err);
            dispatch({
                type: actions.post.DATA_FETCH_ERROR,
                error: err.message
            });
        }
    }

    return (
        <header className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-3">
                <img
                    className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                    src={avatarURL}
                    alt="avatar"
                />
                <div>
                    <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
                    <div className="flex items-center gap-1.5">
                        <img src={TimeIcon} alt="time" />
                        <span className="text-sm text-gray-400 lg:text-base"
                        >{`${getTimeDifferenceFromNow(post?.createAt)} ago`}</span
                        >
                    </div>
                </div>
            </div>



            {isMe && <div className="relative">
                <button onClick={toggleAction}>
                    <img src={ThreeDots} alt="3dots of Action" />
                </button>


                {
                    showAction && <div className="action-modal-container">
                        <button className="action-menu-item hover:text-lwsGreen"
                            onClick={() => {
                                setShowEditPostModal(true)
                                setShowAction(false)
                            }}
                        >
                            <img src={EditIcon} alt="Edit" />
                            Edit
                        </button>
                        <button
                            className="action-menu-item hover:text-red-500"
                            onClick={handleDeletePost}
                        >
                            <img src={DeleteIcon} alt="Delete" />
                            Delete
                        </button>
                    </div>
                }
            </div>}

            {
                showEditPostModal && createPortal(
                    <div className="flex justify-center items-center top-0 left-0 z-80 h-lvh w-lvw bg-black/70 fixed">
                        <div className="w-[80vw]">
                            <PostEntry onClose={() => setShowEditPostModal(false)} post={post} />
                        </div>
                    </div>,
                    document.body
                )
            }

        </header>
    )
}
