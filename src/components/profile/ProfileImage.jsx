import { useRef } from "react";
import EditIcon from "../../assets/icons/edit.svg"
import useAxios from "../../hooks/useAxios";
import { useProfile } from "../../hooks/useProfile"
import { actions } from "../../actions";
import ImagePlaceholder from "../common/ImagePlaceholder";

export default function ProfileImage() {
    const { state, dispatch } = useProfile();
    const { api } = useAxios();

    const fileUploadRef = useRef();

    const handleImageUpload = (event) => {
        event.preventDefault();
        fileUploadRef.current.addEventListener("change", updateImageDisplay)
        fileUploadRef.current.click();
    }

    const updateImageDisplay = async () => {
        const formData = new FormData();
        for (const file of fileUploadRef.current.files) {
            formData.append("avatar", file);
        }
        console.log(formData);
        try {
            dispatch({ type: actions.profile.DATA_FETCHING })
            const response = await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}/avatar`, formData);
            if (response.status === 200) {
                dispatch({
                    type: actions.profile.IMAGE_UPDATED,
                    data: response.data
                })
            }
        } catch (err) {
            dispatch({
                type: actions.profile.DATA_FETCH_ERROR,
                error: err.message
            })
        }
    }

    return (
        <div
            className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]"
        >
            {
                state?.user?.avatar ? (
                    <img
                        className="max-w-full rounded-full"
                        src={`${import.meta.env.VITE_SERVER_BASE_URL}/${state?.user?.avatar}`}
                        alt={state?.user?.firstName}
                    />
                ) : (
                    <ImagePlaceholder letter={state?.user?.firstName[0]} small={false} />
                )
            }

            <form >
                <button
                    className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
                    type="submit"
                    onClick={handleImageUpload}
                >
                    <img src={EditIcon} alt="Edit" />
                </button>
                <input type="file" id="file" hidden ref={fileUploadRef} />
            </form>
        </div>
    )
}
