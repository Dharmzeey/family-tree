'use client';

import { updateFamilyOrigin } from "@/lib/validation/family";
import { useActionState, useEffect, useState } from "react";
import { ZodIssue } from "zod";
import { SubmitButton } from "../ui/button";
import { EditableTextAreaFIeld } from "../ui/input";
import { getErrorField } from "@/utils/errorRenderer";
import { reload1000ms } from "@/utils/delayTimer";

const initialState = {
    message: ""
}

type props = {
    origin: string
}

export default function UpdateFamilyOrigin({ origin }: props) {
    const [formState, formAction] = useActionState(updateFamilyOrigin, initialState)
    const [errors, setErrors] = useState<ZodIssue[] | undefined>([]);

    useEffect(() => {
        setErrors(formState.zodErrors)
    }, [formState])

    useEffect(() => {
        if (formState.status === 200) {
            reload1000ms()
        }
    }, [formState])

    return (
        <>
            <div className="bg-[#ffffff0a] shadow-xl backdrop-blur-md w-9/12 lg:w-1/2 py-8 px-4 rounded-2xl">
                <form action={formAction} className="flex flex-col justify-center items-center w-full">
                    <h2 className="text-2xl">Update Family Origin</h2>

                    <EditableTextAreaFIeld
                        inputFor="details"
                        inputText="Add Family Orign"
                        inputName="details"
                        inputId="details"
                        defaultValue={origin}
                        error={getErrorField('details', errors)}
                    />
                    <SubmitButton pendingText="Updating..." buttonText="UPDATE FAMILY ORIGIN" />
                    {formState.error && (
                        <div aria-live="polite" className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-2 text-sm mb-4" role="status">
                            {formState.error}
                        </div>
                    )}
                    {formState.message && (
                        <div aria-live="polite" className="bg-green-100 border border-green-400 text-green-600 px-4 py-3 rounded mt-2 text-sm mb-4" role="status">
                            {formState.message}
                        </div>
                    )}
                </form>
            </div>
        </>
    )
}