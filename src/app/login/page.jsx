import styles from "./login.module.css";
import LoginWithGoogleButton from "@/components/LoginWithGoogleButton";

export default function login() {
    return (
        <>
            <div className={styles.background}>
                <div className="flex justify-center mt-0 mb-0">
                    <div className={styles.fullForm}>
                        <div className={styles.signForm}>
                            <h1 className="font-bold text-4xl m-5 text-start">Welcome Back</h1>
                            <p className="text-gray-600 m-5 text-start">Login to your account</p>
                            <form className="flex flex-col gap-5">

                                <div className={styles.sections}>
                                    <label className="pl-2 font-bold">Email</label>
                                    <input type="email" placeholder=" 📧 john@example.com" className={styles.formInput} />
                                </div>
                                <div className={styles.sections}>
                                    <label className="pl-2 font-bold">Password</label>
                                    <input type="password" placeholder=" 🔒 john@1234" className={styles.formInput} />
                                </div>

                                <div className="flex justify-center mt-4">
                                    <button type="submit" className={styles.signUpButton}>Login</button>
                                </div>

                                <div className="flex justify-center items-center gap-1 mt-2">
                                    <div className="h-px w-32 bg-gray-300 flex-1"></div>
                                    <p className="text-gray-500 px-3 text-sm whitespace-nowrap">Or</p>
                                    <div className="h-px w-32 bg-gray-300 flex-1"></div>
                                </div>


                                <div className="flex justify-center">
                                    <LoginWithGoogleButton />
                                </div>

                            </form>
                            <div className={styles.loginLink}>
                                <p>Don&apos;t have an account? <a href="/signup" className="text-blue-500">Sign Up</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
