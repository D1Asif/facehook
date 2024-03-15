import { useUser } from "./useUser";

export const useAvatar = (post) => {
    const user = useUser();

    const isMe = (post?.author?.id === user?.id);

    const avatar = isMe ? `${user?.avatar}` : `${post?.author?.avatar}`;

    const avatarURL = `${import.meta.env.VITE_SERVER_BASE_URL}/${avatar}`;

    return {avatarURL};
}