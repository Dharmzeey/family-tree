'use client';

import FormMessages from "@/components/repsonse/formResponse";
import { SubmitButton } from "@/components/ui/button";
import { PasswordField } from "@/components/ui/input";
import { createNewPassword } from "@/lib/validation/auth";
import { getErrorField } from "@/utils/errorRenderer";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { ZodIssue } from "zod";

const initialState = {
    message: "",
};


export default function CreateNewPassword() {
    const [formState, formAction] = useActionState(createNewPassword, initialState);
    const router = useRouter()
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
            // removes both email and token in localStorage
            localStorage.removeItem('resetEmail');
            localStorage.removeItem('resetToken');
            alert(`${formState.message}`)

            // toast.success(`${state.message}`, {
            //     position: "top-center",
            //     className: "my-toast",
            // });

            router.push("/login");
        }
        else if (formState.error === "Password reset session expired or invalid") {
            // I need to wait a second or 2 here so as to show the prompt
            router.push("/password/forgot")
        }
    }, [formState, router]);

    useEffect(() => {
        setErrors(formState.zodErrors)
    }, [formState])


    return (
        <>
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-[#ffffff0a] backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Create New Password</h2>
                    <form action={formAction} className="flex flex-col justify-center items-center w-full">
                        <PasswordField
                            inputFor="password"
                            inputText="New Password"
                            inputId="password"
                            inputName="password"
                            placeholder="Input your new password"
                            error={getErrorField('password', errors)}
                        />

                        <PasswordField
                            inputFor="confirm-password"
                            inputText="Confirm Password"
                            inputId="confirm-password"
                            inputName="confirm-password"
                            placeholder="Confirm your new password"
                            error={getErrorField('confirm_password', errors)}
                        />
                        {/* Include hidden inputs for resetEmail and resetToken */}
                        <input type="hidden" name="reset-email" value={resetEmail || ""} />
                        <input type="hidden" name="reset-token" value={resetToken || ""} />

                        <SubmitButton pendingText="Processing..." buttonText="CHANGE PASSWORD" />
                        {/* Display feedback message */}
                        <FormMessages formState={formState} errors={errors} />
                    </form>
                </div>
            </div>
        </>
    )
}