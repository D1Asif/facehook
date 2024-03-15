import { useForm } from "react-hook-form"
import Field from "../common/Field";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";


export default function LoginForm() {
    const { setAuth } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm();

    const navigate = useNavigate();

    const submitForm = async (formData) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`, formData);
            const {user, token} = response.data;
            if (token) {
                const authToken = token.token;
                const refreshToken = token.refreshToken;

                console.log(`login time auth token: ${authToken}`);

                setAuth({ user, authToken, refreshToken });
                navigate("/");
            }
        } catch (err) {
            console.log(err);
            setError("root.random", {
                type: "random",
                message: `${err.message}`
            })
        }
    }

    return (
        <form
            className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
            onSubmit={handleSubmit(submitForm)}
        >
            <Field
                label="Email"
                error={errors.email}
            >
                <input
                    className={`auth-input ${errors.email ? "border-red-500" : ""}`}
                    name="email"
                    type="email"
                    id="email"
                    {...register("email", {
                        required: "Email is required"
                    })}
                />
            </Field>
            <Field
                label="Password"
                error={errors.password}
            >
                <input
                    className={`auth-input ${errors.password ? "border-red-500" : ""}`}
                    name="password"
                    type="password"
                    id="password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "password needs to be minimum 8 characters"
                        }
                    })}
                />
            </Field>
            <p className="text-red-500">{errors?.root?.random?.message}</p>
            <Field>
                <button
                    className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
                    type="submit"
                >
                    Login
                </button>
            </Field>
        </form>
    )
}
