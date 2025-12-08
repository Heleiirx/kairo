import FloatingInput from "../FlotatingInput";
import GoogleIcon from "../../assets/google-icon.png";
import { Form, useActionData } from "react-router-dom";

export default function SignInForm() {
    const handleOAuthLogin = () => {
        window.location.href = "http://localhost:8080/api/auth/google";
    };
    // Variable to store the action data returned from the server
    const data = useActionData();

    return(
        <>
            <h2 className="text-3xl font-medium">Sign in to Kairo</h2>
            <button 
                className="border border-white p-3 w-full md:w-1/3 md:max-w-56 min-h-[44px] rounded flex items-center justify-center gap-4 text-sm"
                onClick={handleOAuthLogin}
            >
                <img src={GoogleIcon} alt="Icono de google" className="size-6" />
                Sign in with Google
            </button>
            <p className="text-sm">or use your email account</p>
            <Form method="post" action="/signin" className="flex flex-col gap-6 w-full md:w-1/3 items-center">
                <FloatingInput label="Email" type="email" name="email" />
                <FloatingInput label="Password" type="password" name="password" />
                <p className="text-base-contrast underline inline min-h-[44px] flex items-center">Forgot your password?</p>
                <button type="submit" className="bg-secondary text-base text-xl font-medium p-3 w-full md:w-2/3 min-h-[44px] rounded">
                    Sign in
                </button>
                {data?.error && <p className="text-red-500">{data.error}</p>}
            </Form>
        </>

    )
}