"use client";

import { SubmitButton } from "@/components/ui/button";
import { EditableInputFIeld, PasswordField } from "@/components/ui/input";
import { createUser } from "@/lib/validation/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useActionState } from "react";
import { ZodIssue } from "zod";
import { getErrorField } from "@/utils/errorRenderer";

const initialState = {
    message: "",
};

export default function SignupPage() {
    const [state, formAction] = useActionState(createUser, initialState);
    const [errors, setErrors] = useState<ZodIssue[] | undefined>([]);
    const router = useRouter();
    useEffect(() => {
        if (state.status === 201) {
            // the message will come from authApi through authAction
            // router.push("/email-verification/confirm");
            // we will implement verification later, but for now we will just be going straight to home
            router.push("/email-verification");
        }
    }, [state, router]);

    useEffect(() => {
        setErrors(state.zodErrors)
    }, [state])


    return (
        <>
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-[#ffffff0a] backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
                    <form action={formAction} className="flex flex-col justify-center items-center w-full">
                        <EditableInputFIeld
                            inputFor="email"
                            inputText="Email"
                            inputType="email"
                            inputId="email"
                            inputName="email"
                            placeholder="Input your Email"
                            required
                            error={getErrorField('email', errors)}
                        />
                        <EditableInputFIeld
                            inputFor="phone-number"
                            inputText="Phone Number"
                            inputType="text"
                            inputId="phone-number"
                            inputName="phone-number"
                            placeholder="Input your Phone Number"
                            required
                            error={getErrorField('phone_number', errors)}
                        />
                        <PasswordField
                            inputFor="password"
                            inputText="Password"
                            inputId="password"
                            inputName="password"
                            placeholder="Input your Password"
                            error={getErrorField('password', errors)}
                        />
                        <PasswordField
                            inputFor="confirm-password"
                            inputText="Confirm Password"
                            inputId="confirm-password"
                            inputName="confirm-password"
                            placeholder="Retype your password"
                            error={getErrorField('confirm_password', errors)}
                        />

                        <SubmitButton
                            pendingText="Creating..."
                            buttonText="create an account"
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
    );
}
