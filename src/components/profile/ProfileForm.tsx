"use client";

import { createProfile } from "@/lib/validation/profile";
import { useActionState, useEffect, useState } from "react";
import { ZodIssue } from "zod";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../ui/button";
import { EditableInputFIeld, ImageInputField } from "../ui/input";

const initialState = {
    message: "",
};

export default function ProfileForm() {
    const [state, formAction, pending] = useActionState(createProfile, initialState);
    const [errors, setErrors] = useState<ZodIssue[] | undefined>([]);
    const router = useRouter();

    useEffect(() => {
        setErrors(state.errors);
        
        if (state.status === 201 || state.status === 409) {
            setTimeout(() => {
                router.push("/");
            }, 1500); // Redirect after 2 seconds
        }
    }, [state, router]);

    const getErrorForField = (fieldName: string) => {
        return errors
            ?.filter((error) => error.path.includes(fieldName))
            .map((error) => error.message)
            .join(", ");
    };

    return (
        <>
            <div className="bg-[#ffffff0a] backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Profile</h2>
                <form action={formAction} className="flex flex-col justify-center items-center w-full">
                    <EditableInputFIeld
                        inputFor="first-name"
                        inputText="First Name"
                        inputType="text"
                        inputId="first-name"
                        inputName="first-name"
                        placeholder="Input your First Name"
                        required
                        error={getErrorForField("first_name")}
                    />
                    <EditableInputFIeld
                        inputFor="last-name"
                        inputText="Last Name"
                        inputType="text"
                        inputId="last-name"
                        inputName="last-name"
                        placeholder="Input your Last Name"
                        required
                        error={getErrorForField("last_name")}
                    />
                    <EditableInputFIeld
                        inputFor="other-name"
                        inputText="Other Name"
                        inputType="text"
                        inputId="other-name"
                        inputName="other-name"
                        placeholder="Input your Other Name"
                        error={getErrorForField("other_name")}
                    />
                    <EditableInputFIeld
                        inputFor="lineage-name"
                        inputText="Lineage Name"
                        inputType="text"
                        inputId="lineage-name"
                        inputName="lineage-name"
                        placeholder="Input your Lineage Name"
                        required
                        error={getErrorForField("lineage_name")}
                    />

                    <ImageInputField
                        inputFor="picture"
                        inputText="Picture"
                        inputType="file"
                        inputId="picture"
                        inputName="picture"
                        placeholder="Upload your Profile Picture"
                        required
                        error={getErrorForField("picture")}
                    />

                    <SubmitButton pendingText="Creating..." buttonText="Create Profile" />

                    {/* Display feedback message */}
                    {state.error && (
                        <div
                            aria-live="polite"
                            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-2 text-sm mb-4"
                            role="status"
                        >
                            {state.error}
                        </div>
                    )}
                    {state.message && (
                        <div
                            aria-live="polite"
                            className="bg-green-100 border border-green-400 text-green-600 px-4 py-3 rounded mt-2 text-sm mb-4"
                            role="status"
                        >
                            {state.message}
                        </div>
                    )}
                </form>
            </div>
        </>
    );
}
