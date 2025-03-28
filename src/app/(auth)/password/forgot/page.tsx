"use client";


import { SubmitButton } from "@/components/ui/button";
import { EditableInputFIeld } from "@/components/ui/input";
import { forgotPassword } from "@/lib/validation/auth";
import { getErrorField } from "@/utils/errorRenderer";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { ZodIssue } from "zod";

const initialState = {
    message: "",
};

export default function ForgotPassword() {
    const [state, formAction] = useActionState(forgotPassword, initialState);
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<ZodIssue[] | undefined>([]);
    const router = useRouter()
    useEffect(() => {
        if (state.status === 200) {
            // Store both email and token in localStorage
            if (state.token) {
                localStorage.setItem('resetEmail', email);
                localStorage.setItem('resetToken', state.token);

                alert(`${state.message}`)

                router.push("/password/reset");
            }
        }
    }, [state, router, email]);

    useEffect(() => {
        setErrors(state.zodErrors)
    }, [state])


    return (
        <>
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-[#ffffff0a] backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
                    <form action={formAction} className="flex flex-col justify-center items-center w-full">
                        <EditableInputFIeld
                            inputFor="email"
                            inputText="Email"
                            inputType="email"
                            inputId="email"
                            inputName="email"
                            placeholder="Input your Email"
                            required
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            error={getErrorField('email', errors)} />

                        <SubmitButton pendingText="Processing..." buttonText="GET RESET CODE" />
						{/* Display feedback message */}
						{state.error && (
							<div aria-live="polite" className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-2 text-sm mb-4" role="status">
								{state.error}
							</div>
						)}
						{state.message && (
							<div aria-live="polite" className="bg-green-100 border border-green-400 text-green-600 px-4 py-3 rounded mt-2 text-sm mb-4" role="status">
								{state.message}
							</div>
						)}
                    </form>
                </div>
            </div>
        </>
    );
}
