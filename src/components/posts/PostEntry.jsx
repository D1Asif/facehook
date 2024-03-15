import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth"
import useAxios from "../../hooks/useAxios";
import { usePost } from "../../hooks/usePost";
import { useProfile } from "../../hooks/useProfile";
import AddPhotoIcon from "../../assets/icons/addPhoto.svg";
import Field from "../common/Field";
import { actions } from "../../actions";


export default function PostEntry({onClose, post}) {
    const { auth } = useAuth();
    const { dispatch } = usePost();
    const { api } = useAxios();
    const { state: profile } = useProfile();

    const user = profile?.user ?? auth?.user;

    const isEditing = post ? true : false;

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const handlePostSubmit = async (formData) => {
        const payload = new FormData();
        payload.append("content", formData?.content);
        payload.append("image", formData?.image[0]);
        dispatch({type: actions.post.DATA_FETCHING});
        try {
            const response = await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/posts`, payload);
            if (response?.status === 200) {
                dispatch({
                    type: actions.post.DATA_CREATED,
                    data: response.data
                });
                // close this UI
                
                onClose();
            }
        } catch(err) {
            console.error(err);
            dispatch({
                type: actions.post.DATA_FETCH_ERROR,
                error: err.message
            })
        }
    }

    const handleSaveEdit = async (formData) => {
        const payload = new FormData();
        payload.append("content", formData?.content);
        dispatch({type: actions.post.DATA_FETCHING});
        try {
            const response = await api.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}`, payload);
            if (response?.status === 200) {
                console.log(response.data);
                dispatch({
                    type: actions.post.DATA_EDITED,
                    data: response.data
                });
                // close this UI
                onClose();
            }
        } catch(err) {
            console.error(err);
            dispatch({
                type: actions.post.DATA_FETCH_ERROR,
                error: err.message
            })
        }
    }

    return (
        <div className="card relative">
            <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
                Create Post
            </h6>
            <button className="absolute right-8 top-4 text-xl p-2 rounded-full bg-gray-800 hover:bg-black/60" onClick={onClose}>❌</button>
            <form
                onSubmit={handleSubmit(isEditing? handleSaveEdit :handlePostSubmit)}
                className="mt-5"
            >
                <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
                    <div className="flex items-center gap-3">
                        <img className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`} alt="avatar" />
                        <div>
                            <h6 className="text-lg lg:text-xl">{user?.firstName} {" "} {user?.lastName}</h6>

                            <span className="text-sm text-gray-400 lg:text-base">Public</span>
                        </div>
                    </div>
                    {!isEditing && <>
                    <label className="btn-primary cursor-pointer !text-gray-100" htmlFor="image">
                        <img src={AddPhotoIcon} alt="Add Photo" />

                        Add Photo
                    </label>
                    <input 
                        type="file"
                        name="image" 
                        id="image" 
                        className="hidden"
                        {...register("image")}
                    />
                    </>}

                </div>
                <Field error={errors.content}>
                    <textarea
                        name="content"
                        id="content"
                        placeholder="Share your thoughts..."
                        className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"
                        {...register("content", {
                            required: "Adding some text is mandatory"
                        })}
                        defaultValue={isEditing ? post.content : ""}
                    />
                </Field>
                <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
                    <button className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
                        type="submit">
                        {isEditing ? "Save" : "Post"}
                    </button>
                </div>
            </form>
        </div>
    )
}
