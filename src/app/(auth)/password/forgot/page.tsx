"use client";


import FormMessages from "@/components/repsonse/formResponse";
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
    const [formState, formAction] = useActionState(forgotPassword, initialState);
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<ZodIssue[] | undefined>([]);
    const router = useRouter()
    useEffect(() => {
        if (formState.status === 200) {
            // Store both email and token in localStorage
            if (formState.token) {
                localStorage.setItem('resetEmail', email);
                localStorage.setItem('resetToken', formState.token);

                alert(`${formState.message}`)

                router.push("/password/reset");
            }
        }
    }, [formState, router, email]);

    useEffect(() => {
        setErrors(formState.zodErrors)
    }, [formState])


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
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            error={getErrorField('email', errors)} />

                        <SubmitButton pendingText="Processing..." buttonText="GET RESET CODE" />
                        {/* Display feedback message */}
                        <FormMessages formState={formState} errors={errors}/>
                    </form>
                </div>
            </div>
        </>
    );
}
