"use client";

import { SubmitButton } from "@/components/ui/button";
import { EditableInputFIeld, PasswordField } from "@/components/ui/input";
import { createUser } from "@/lib/validation/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useActionState } from "react";
import { ZodIssue } from "zod";
import { getErrorField } from "@/utils/errorRenderer";
import FormMessages from "@/components/repsonse/formResponse";

const initialState = {
    message: "",
};

export default function SignupPage() {
    const [formState, formAction] = useActionState(createUser, initialState);
    const [errors, setErrors] = useState<ZodIssue[] | undefined>([]);

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const router = useRouter();
    useEffect(() => {
        if (formState.status === 201) {
            // the message will come from authApi through authAction
            // router.push("/email-verification/confirm");
            // we will implement verification later, but for now we will just be going straight to home
            router.push("/email-verification");
        }
    }, [formState, router]);

    useEffect(() => {
        setErrors(formState.zodErrors)
    }, [formState])


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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                        <FormMessages formState={formState} errors={errors} />
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
