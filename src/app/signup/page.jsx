import styles from "./signup.module.css";
export default function signup() {
    return (
        <>
            <div className="flex justify-center mt-15 mb-15">
                <div className={styles.fullForm}>
                    <div className={styles.fullFormLeft}>
                        <h1 className="text-3xl font-bold text-white">Why Choose PetCare+?</h1>
                        <p className={styles.description}>Taking care of your pet's health shouldn't be complicated. PetCare+ simplifies pet care management by putting all medical information at your fingertips. </p>
                        <p className={styles.description}>From vaccination records to treatment history, weight tracking to vet appointments—everything is organized in one secure, easy-to-use platform. Give your furry family member the care they deserve with PetCare+.</p>
                    </div>

                    <div className={styles.signForm}>
                        <h1 className="font-bold text-4xl m-5 text-start">Join with PetCare+</h1>
                        <p className="text-gray-600 m-5 text-start">Begin your pet's journey with PetCare+</p>
                        <form className="flex flex-col gap-5">
                            <div className={styles.sections}>
                                <label className="pl-2 font-bold">Name</label>
                                <input type="text" placeholder="John Doe" className={styles.formInput} />
                            </div>
                            <div className={styles.sections}>
                                <label className="pl-2 font-bold">Email</label>
                                <input type="email" placeholder="john@example.com" className={styles.formInput} />
                            </div>
                            <div className={styles.sections}>
                                <label className="pl-2 font-bold">Password</label>
                                <input type="password" placeholder="john@1234" className={styles.formInput} />
                            </div>

                            <div className={styles.sections}>
                                <label className="pl-2 font-bold">Confirm Password</label>
                                <input type="password" placeholder="john@1234" className={styles.formInput} />
                            </div>

                            <div className="flex justify-center">
                                <button type="submit" className={styles.signUpButton}>Create Account</button>
                            </div>

                        </form>
                        <div className={styles.loginLink}>
                            <p>Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}