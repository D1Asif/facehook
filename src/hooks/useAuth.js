import { useContext, useDebugValue } from "react"
import { AuthContext } from "../context"

export const useAuth = () => {
    const {auth} = useContext(AuthContext);
    useDebugValue(auth, (auth) => auth?.user ? "user logged in" : "user logged out");
    return useContext(AuthContext);
}