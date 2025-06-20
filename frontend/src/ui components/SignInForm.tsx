import FloatingInput from "../components/FlotatingInput";
import GoogleIcon from "../assets/google-icon.png";
export default function SignInForm() {
    return(
        <>
            <h2 className="text-3xl font-medium">Sign in to Kairo</h2>
            <button className="border border-white p-2 w-1/3 max-w-56 rounded flex items-center justify-center gap-4 text-sm">
                <img src={GoogleIcon} alt="Icono de google" className="size-6" />
                Sign in with Google
            </button>
            <p className="text-sm">or use your email account</p>
            <form className="flex flex-col gap-6 w-1/3 items-center">
                <FloatingInput label="Email" type="email" name="email" />
                <FloatingInput label="Password" type="password" name="password" />
                <p className="text-base-contrast underline inline">Forgot your password?</p>
                <button className="bg-secondary text-base text-xl font-medium p-2 w-2/3 rounded">
                    Sign in
                </button>
            </form>
        </>

    )
}