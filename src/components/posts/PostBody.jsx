

export default function PostBody({ poster, content }) {
    const imageExist = !(poster === "null" || poster === "undefined" || !!poster == false)
    return (
        <div className="border-b border-[#3F3F3F] py-4 lg:py-5 lg:text-xl">
            <p className="pb-2">
                {content}
            </p>

            {
                imageExist && <div className="flex items-center justify-center overflow-hidden">
                    <img
                        className="max-w-full"
                        src={`${import.meta.env.VITE_SERVER_BASE_URL}/${poster}`}
                        alt="poster"
                    />
                </div>
            }

        </div>
    )
}
