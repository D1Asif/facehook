import { useAuth } from "./useAuth"
import { useProfile } from "./useProfile";

export const useUser = () => {
    const {auth} = useAuth();
    const {state} = useProfile();

    return state?.user ?? auth?.user;
}