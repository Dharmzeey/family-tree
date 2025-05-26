"use client";

import { SubmitButton } from "@/components/ui/button";
import { EditableInputFIeld } from "@/components/ui/input";
import { resendEmailVerificationApi } from "@/lib/api/auth";
import { verifyCode } from "@/lib/validation/auth"
import { getErrorField } from "@/utils/errorRenderer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react"
import { ZodIssue } from "zod";

export default function EmailVerification() {

    const [state, formAction] = useActionState(verifyCode, { message: "" });
    const [errors, setErrors] = useState<ZodIssue[] | undefined>([]);
    const router = useRouter();
    const [resetEmailCount, setResetEmailCount] = useState(0);

    useEffect(() => {
        if (state.status === 200) {
            router.push("/");
        }
    }, [state, router]);

    // Countdown logic
    useEffect(() => {
        if (resetEmailCount > 0) {
            const timer = setTimeout(() => setResetEmailCount(resetEmailCount - 1), 1000);
            return () => clearTimeout(timer); // Clean up the timer
        }
    }, [resetEmailCount]);

    useEffect(() => {
        setErrors(state.zodErrors)
    }, [state])

    async function handleResendEmailVerification() {
        const response = await resendEmailVerificationApi();
        if (response.status === 201) {
            alert(`${response.message}`)
            router.push("/");
        } else if (response.status === 401) {
            alert(`${response.error}`)
            router.push("/login");
        } else if (response.status === 200) {
            alert(`${response.message}`)
        } else {
            setResetEmailCount(120);
            alert(`${response.error}`)
        }
    }


    return (
        <>
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-[#ffffff0a] backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Verify Email Code</h2>
                    <form action={formAction} className="flex flex-col justify-center items-center w-full">
                        <EditableInputFIeld
                            inputFor="email-pin"
                            inputText="Code Sent to Email"
                            inputType="text"
                            inputId="email-pin"
                            inputName="email-pin"
                            placeholder="Input the code sent to your Email"
                            required
                            error={getErrorField('email_pin', errors)}
                        />
                        <div className="text-right">
                            <button
                                disabled={resetEmailCount > 0} // Disable button when countdown is active
                                type="button"
                                className={`text-blue-700 underline ${resetEmailCount > 0 ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                onClick={handleResendEmailVerification}
                            >
                                Resend code
                            </button>
                            {resetEmailCount > 0 && <span> ({resetEmailCount} sec)</span>}{" "}
                            {/* Show countdown */}
                        </div>
                        <SubmitButton
                            pendingText="Verifying..."
                            buttonText="Verify code"
                        />
                        {/* Display feedback message */}
                        {state.error && (
                            <div aria-live="polite" className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-2 text-sm mb-4" role="status">
                                {state.error}
                            </div>
                        )}
                    </form>
                    <div className="flex flex-col items-center gap-1 mt-3">
                        <p className="text-sm text-gray-200">
                            Already have an account?{" "}
                            <Link href="/login" className="text-blue-600 hover:text-blue-700 underline">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}