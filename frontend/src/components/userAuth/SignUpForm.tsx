import FloatingInput from "../FlotatingInput";
import GoogleIcon from "../../assets/google-icon.png";
import { Form, useActionData } from "react-router-dom";

export default function SignUpForm() {
    const handleOAuthLogin = () => {
        window.location.href = "http://localhost:8080/api/auth/google";
    };
    // Variable to store the action data returned from the server
    const data = useActionData();

    return(
        <>
            <h2 className="text-3xl font-medium">Create Account</h2>
            <button onClick={handleOAuthLogin} className="border border-white p-2 w-1/3 max-w-56 rounded flex items-center justify-center gap-4 text-sm">
                <img src={GoogleIcon} alt="Icono de google" className="size-6" />
                Sign up with Google
            </button>
            <p className="text-sm">or use your email for registration</p>
            <Form method="post" action="/signup" className="flex flex-col gap-6 w-1/3 items-center">
                <FloatingInput label="Name" type="text" name="name" />
                <FloatingInput label="Email" type="email" name="email" />
                <FloatingInput label="Password" type="password" name="password" />
                <button type="submit" className="bg-secondary text-base text-xl font-medium p-2 w-2/3 rounded">
                    Sign up
                </button>
                {data?.error && <p className="text-red-500">{data.error}</p>}
            </Form>
        </>

    )
}