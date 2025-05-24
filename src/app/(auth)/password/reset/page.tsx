"use client";
import { SubmitButton } from "@/components/ui/button";
import { EditableInputFIeld } from "@/components/ui/input";
import { forgotPasswordApi } from "@/lib/api/auth";
import { verifyResetCode } from "@/lib/validation/auth";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { ZodIssue } from "zod";
import { getErrorField } from "@/utils/errorRenderer";
import FormMessages from "@/components/repsonse/formResponse";

const initialState = {
    message: "",
};

export default function ResetPasswordCode() {
    const [formState, formAction] = useActionState(verifyResetCode, initialState);
    const router = useRouter();
    const [resetEmailCount, setResetEmailCount] = useState(0);
    const [errors, setErrors] = useState<ZodIssue[] | undefined>([]);
    const [resetEmail, setResetEmail] = useState<string | null>(null);
    const [resetToken, setResetToken] = useState<string | null>(null);

    useEffect(() => {
        // Check if the reset data exist
        const email = localStorage.getItem('resetEmail');
        const token = localStorage.getItem('resetToken');

        if (!email || !token) {
            // Redirect back to forgot password if data is missing
            router.push('/password/forgot');
            return;
        }

        // Set localStorage values into state
        setResetEmail(email);
        setResetToken(token);
    }, [router]);

    useEffect(() => {
        if (formState.status === 200) {
            // Store the new reset token for the final step
            if (formState.token) {
                localStorage.setItem('resetToken', formState.token);
                alert(`${formState.message}`);
                router.push("/password/new");
            }
        }
    }, [formState, router]);

    // Countdown logic for resending the reset code
    useEffect(() => {
        if (resetEmailCount > 0) {
            const timer = setTimeout(
                () => setResetEmailCount(resetEmailCount - 1),
                1000
            );
            return () => clearTimeout(timer); // Clean up the timer
        }
    }, [resetEmailCount]);

    // Handle resend password reset logic
    async function handleResendPasswordReset() {
        const response = await forgotPasswordApi({ email: resetEmail! }); // Include email in the API call bang operator becasue the resetEmail has been checked in the onclick
        if (response.status === 201) {
            alert(`${response.message}`);
            // toast.success(`${response.message}`, {
            //     position: "top-center",
            //     className: "my-toast",
            // });
            router.push("/");
        } else if (response.status === 401) {
            alert(`${response.message}`);
            // toast.info(`${response.message}`, {
            //     position: "top-center",
            //     className: "my-toast",
            // });
            router.push("/login");
        } else {
            setResetEmailCount(120); // Set timer for resend button
            alert(`${response.error}`);
            // toast.info(`${response.message}`, {
            //     position: "top-center",
            //     className: "my-toast",
            // });
        }
    }

    useEffect(() => {
        setErrors(formState.zodErrors)
    }, [formState])

    return (
        <>
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-[#ffffff0a] backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Reset Email Code</h2>
                    <form action={formAction} className="flex flex-col justify-center items-center">
                        {/* Email PIN input */}

                        <EditableInputFIeld
                            inputFor="email-pin"
                            inputText="Code Sent to Email"
                            inputType="text"
                            inputId="email-pin"
                            inputName="email-pin"
                            placeholder="Input the code sent to your email"
                            required
                            error={getErrorField('email_pin', errors)}
                        />
                        <div className="text-right">
                            <button
                                disabled={resetEmailCount > 0} // Disable button when countdown is active
                                type="button"
                                className={`text-blue-700 underline ${resetEmailCount > 0 ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                onClick={resetEmail ? handleResendPasswordReset : undefined}
                            >
                                Resend code
                            </button>
                            {resetEmailCount > 0 && <span> ({resetEmailCount} sec)</span>}{" "}
                            {/* Show countdown */}
                        </div>

                        {/* Include hidden inputs for resetEmail and resetToken */}
                        <input type="hidden" name="reset-email" value={resetEmail || ""} />
                        <input type="hidden" name="reset-token" value={resetToken || ""} />

                        {/* Submit Button */}
                        <SubmitButton pendingText="Verifying..." buttonText="verify code" />

                        {/* Display feedback message */}
                       <FormMessages formState={formState} errors={errors}/>
                    </form>
                </div>
            </div>
        </>
    );
}
