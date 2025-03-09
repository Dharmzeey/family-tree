"use client";

import { includeFamily } from "@/lib/validation/profile";
import { getErrorField } from "@/utils/errorRenderer";
import { useActionState, useEffect, useState } from "react";
import { ZodIssue } from "zod";
import { SubmitButton } from "../ui/button";
import { EditableInputFIeld } from "../ui/input";
import { confirmFamilyRequestApi } from "@/lib/api/profile";
import { useRouter } from "next/navigation";

const initialState = {
    message: "",
};


export default function IncludeFamilyForm() {
    const [formState, formAction] = useActionState(includeFamily, initialState);
    const [errors, setErrors] = useState<ZodIssue[] | undefined>([]);
    const router = useRouter()

    useEffect(() => {
        setErrors(formState.zodErrors);
    }, [formState]);

    useEffect(() => {

        const confirmRequest = async () => {
            if (formState.data) {
                const id = (formState.data as Record<string, unknown>).id as string;
                const response = await confirmFamilyRequestApi({ family_id: id })
                if (response.status === 200) {
                    alert("Family included successfully")
                    router.push("/")
                } else {
                    alert(response.error)
                }
            }

        }

        if (formState.data && formState.status === 200) {
            const name = (formState.data as Record<string, unknown>).name as string;
            if (confirm(`Are you sure you want to include this family in your profile? \n\nName: ${name}'s family \n\nNB: There is not further edit or deletion afterwards`)) {
                confirmRequest()
            }
        }
    }, [formState, router])

    return (
        <>
            <div className="flex items-center justify-center">
                <div className="bg-[#ffffff0a] shadow-xl backdrop-blur-md w-9/12 lg:w-1/2 py-8 px-4 rounded-2xl">
                    <form action={formAction} className="flex flex-col justify-center items-center w-full">
                        <h2 className="text-2xl">Include Family</h2>
                        <EditableInputFIeld
                            inputFor="family-id"
                            inputText="Family ID"
                            inputType="text"
                            inputName="family-id"
                            inputId="family-id"
                            placeholder="Input Family ID"
                            required
                            error={getErrorField('family_id', errors)}
                        />

                        <SubmitButton pendingText="Adding..." buttonText="INCLUDE FAMILY" />
                        {formState.error && (
                            <div aria-live="polite" className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-2 text-sm mb-4" role="status">
                                {formState.error}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    )
}