"use client";

import { SubmitButton } from "@/components/ui/button";
import { EditableInputFIeld } from "@/components/ui/input";
import { createUser } from "@/lib/validation/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useActionState } from "react";
import { ZodIssue } from "zod";


const initialState = {
    message: "",
};

export default function SignupPage() {
    const [state, formAction, pending] = useActionState(createUser, initialState);
    const [errors, setErrors] = useState<ZodIssue[] | undefined>([]);
    const router = useRouter();
    useEffect(() => {
        if (state.status === 201) {
            // the message will come from authApi through authAction
            // router.push("/email-verification/confirm");
            // we will implement verification later, but for now we will just be going straight to home
            router.push("/");
        }
    }, [state, router]);

    useEffect(() => {
        setErrors(state.errors)
    }, [state])

    const getErrorForField = (fieldName: string) => {
        return errors?.filter((error) => error.path.includes(fieldName)).map((error) => error.message).join(', '); // Combines multiple messages if any
    };

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
                            error={getErrorForField('email')}
                        />
                        <EditableInputFIeld
                            inputFor="phone-number"
                            inputText="Phone Number"
                            inputType="text"
                            inputId="phone-number"
                            inputName="phone-number"
                            placeholder="Input your Phone Number"
                            required
                            error={getErrorForField('phone_number')}
                        />
                        <EditableInputFIeld
                            inputFor="password"
                            inputText="Password"
                            inputType="password"
                            inputId="password"
                            inputName="password"
                            placeholder="Input your Password"
                            required
                            error={getErrorForField('password')}
                        />
                        <EditableInputFIeld
                            inputFor="confirm-password"
                            inputText="Confirm Password"
                            inputType="password"
                            inputId="confirm-password"
                            inputName="confirm-password"
                            placeholder="Retype your password"
                            required
                            error={getErrorForField('confirm_password')}
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
