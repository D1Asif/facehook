

export default function ImagePlaceholder({letter, small}) {
    return (
        <div
            className={`flex items-center justify-center ${small ? "h-[32px] w-[32px] lg:max-h-[44px] lg:max-w-[44px]" : "h-[180px] w-[180px]"}  rounded-full bg-red-400`}
        >
            <div className={`${small ? "": "text-8xl"}`}>
                {letter?.toUpperCase()}
            </div>
        </div>
    )
}
