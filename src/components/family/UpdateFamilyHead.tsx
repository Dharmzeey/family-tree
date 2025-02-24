'use client';

import { updateFamilyHead } from "@/lib/validation/family";
import { useActionState, useEffect, useState } from "react";
import { ZodIssue } from "zod";
import { SubmitButton } from "../ui/button";
import { EditableInputFIeld, ViewingInputField } from "../ui/input";
import { getErrorField } from "@/utils/errorRenderer";
import { reload1000ms } from "@/utils/delayTimer";

const initialState = {
    message: ""
}

type props = {
    familyHead: {
        id: string;
        person: string;
        still_on_throne: boolean;
        comment: string;
        date_from: string;
        date_to: string | null;
    }
}

export default function UpdateFamilyHead({ familyHead }: props) {
    const [formState, formAction] = useActionState(updateFamilyHead, initialState)
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
                    <h2 className="text-2xl">Update Family Head</h2>
                    <ViewingInputField
                        heading="Name of the Family Head"
                        text={familyHead.person}
                    />
                    <input type="hidden" name="family-head-id" value={familyHead.id} />

                    <EditableInputFIeld
                        inputFor="date-from"
                        inputText="Date From"
                        inputType="date"
                        inputName="date-from"
                        inputId="date-from"
                        placeholder="Input Date"
                        defaultValue={familyHead.date_from}
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
                        defaultValue={familyHead.date_to ? familyHead.date_to : undefined}
                        error={getErrorField('date_to', errors)}
                    />

                    <EditableInputFIeld
                        inputFor="comment"
                        inputText="Comment on the Family Head"
                        inputType="text"
                        inputName="comment"
                        inputId="comment"
                        placeholder="Comments"
                        defaultValue={familyHead.comment}
                        required
                        error={getErrorField('comment', errors)}
                    />
                    <SubmitButton pendingText="Updating..." buttonText="UPDATE FAMILY HEAD" />
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