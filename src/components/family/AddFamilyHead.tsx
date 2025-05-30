'use client';

import { addFamilyHead } from "@/lib/validation/family";
import { useActionState, useEffect, useState } from "react";
import { ZodIssue } from "zod";
import { SubmitButton } from "../ui/button";
import { EditableInputFIeld } from "../ui/input";
import { getErrorField } from "@/utils/errorRenderer";
import { reload1000ms } from "@/utils/delayTimer";

const initialState = {
    message: ""
}

export default function AddFamilyHead() {
    const [formState, formAction] = useActionState(addFamilyHead, initialState)
    const [errors, setErrors] = useState<ZodIssue[] | undefined>([]);

    const [id, setId] = useState("");

    useEffect(() => {
        setErrors(formState.zodErrors)
    }, [formState])

    useEffect(() => {
        if (formState.status === 201) {
            reload1000ms()
        }
    }, [formState])

    return (
        <>
            <div className="bg-[#ffffff0a] shadow-xl backdrop-blur-md w-9/12 lg:w-1/2 py-8 px-4 rounded-2xl">
                <form action={formAction} className="flex flex-col justify-center items-center w-full">
                    <h2 className="text-2xl">Add Family Head</h2>
                    <EditableInputFIeld
                        inputFor="person-id"
                        inputText="ID for the Family Head"
                        inputType="text"
                        inputName="person-id"
                        inputId="person-id"
                        placeholder="Input person ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                        error={getErrorField('person', errors)}
                    />

                    <EditableInputFIeld
                        inputFor="date-from"
                        inputText="Date From"
                        inputType="date"
                        inputName="date-from"
                        inputId="date-from"
                        placeholder="Input Date"
                        required
                        error={getErrorField('date_from', errors)}
                    />

                    <EditableInputFIeld
                        inputFor="date-to"
                        inputText="Date To (Leave empty if still active)"
                        inputType="date"
                        inputName="date-to"
                        inputId="date-to"
                        placeholder="Input Date"
                        error={getErrorField('date_to', errors)}
                    />

                    <EditableInputFIeld
                        inputFor="comment"
                        inputText="Comment on the Family Head"
                        inputType="text"
                        inputName="comment"
                        inputId="comment"
                        placeholder="Comments"
                        required
                        error={getErrorField('comment', errors)}
                    />
                    <SubmitButton pendingText="Adding..." buttonText="ADD FAMILY HEAD" />
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