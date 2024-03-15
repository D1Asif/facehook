import { useForm } from "react-hook-form"
import Field from "../common/Field";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function RegistrationForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const navigate = useNavigate()

    const submitForm = async (formData) => {
        console.log(formData);
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`, formData);
            if (response.status === 201) {
                navigate("/login")
            }
        } catch (err) {
            console.log(err);
            setError("root.random", {
                type: "random",
                message: `Some thing went wrong ${err.message}`
            })
        }
    }

    return (
        <form className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]"
            onSubmit={handleSubmit(submitForm)}
        >
            <Field label="First Name" error={errors.firstName}>
                <input
                    className="auth-input" 
                    type="text" 
                    name="firstName" 
                    id="firstName" 
                    {...register("firstName", {
                        required: "First name is required"
                    })}
                />
            </Field>
            <Field label="Last Name" error={errors.lastName}>
                <input
                    className="auth-input" 
                    type="text" 
                    name="lastName" 
                    id="lastName" 
                    {...register("lastName")}
                />
            </Field>
            <Field label="Email" error={errors.email}>
                <input
                    className="auth-input" 
                    type="email" 
                    name="email" 
                    id="email" 
                    {...register("email", {
                        required: "Email is required"
                    })}
                />
            </Field>
            <Field label="Password" error={errors.password}>
                <input
                    className="auth-input" 
                    type="password" 
                    name="password" 
                    id="password" 
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password should be minimum 8 characters"
                        }
                    })}
                />
            </Field>
            <p className="text-red-500">{errors?.root?.random?.message}</p>
            <button
                className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
                type="submit"
              >
                Register
              </button>
        </form>
    )
}
