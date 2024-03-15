import { useState } from "react";
import PostEntry from "./PostEntry";
import { useUser } from "../../hooks/useUser";
import { createPortal } from "react-dom";


export default function NewPost() {
    const [showPostEntry, setShowPostEntry] = useState(false);

    const user = useUser();

    return (
        <>
            {showPostEntry ?
                (createPortal(
                    <div className="flex justify-center items-center top-0 left-0 z-80 h-lvh w-lvw bg-black/70 fixed">
                        <div className="w-[80vw]">
                            <PostEntry onClose={() => setShowPostEntry(false)} />
                        </div>
                    </div>,
                    document.body
                ))
                : (<div className="card">
                    <div className="flex-center mb-3 gap-2 lg:gap-4">
                        <img className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`} alt="avatar" />

                        <div className="flex-1">
                            <textarea
                                className="h-16 w-full rounded-md bg-lighterDark p-3 focus:outline-none sm:h-20 sm:p-6" name="post"
                                id="post"
                                placeholder="What's on your mind?"
                                onClick={() => setShowPostEntry(true)}
                            ></textarea>
                        </div>
                    </div>
                </div>)}
        </>
    )
}
