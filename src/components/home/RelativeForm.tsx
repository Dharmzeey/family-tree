"use client";

import { useActionState, useEffect, useState } from "react";
import { EditableInputFIeld, EditableSelectField, ImageInputField } from "../ui/input";
import { fetchRelationsApi } from "@/lib/api/profile";
import { RelationData } from "@/types/relatives";
import { addOfflineRelative } from "@/lib/validation/profile";
import { ZodIssue } from "zod";
import { SubmitButton } from "../ui/button";
import { getErrorField } from "@/utils/errorRenderer";

const initialState = {
    message: ""
}

export default function RelativeForm() {
    const [relations, setRelations] = useState<RelationData[]>();
    const [formState, formAction] = useActionState(addOfflineRelative, initialState);
    const [errors, setErrors] = useState<ZodIssue[] | undefined>([]);
    useEffect(() => {
        async function getRelations() {
            await fetchRelationsApi().then((response) => {
                setRelations(response.data as RelationData[])
            })
        }
        getRelations();
    }, [])

    useEffect(() => {
        setErrors(formState.zodErrors)
    }, [formState])
    

    return (
        <>
            <div className="bg-[#ffffff0a] shadow-xl backdrop-blur-md w-9/12 lg:w-1/2 py-8 px-4 rounded-2xl">
                <form action={formAction} className="flex flex-col justify-center items-center w-full">
                    <h2 className="text-2xl">Add Offilne Relatives</h2>
                    <EditableInputFIeld
                        inputFor="first-name"
                        inputText="Relative First Name"
                        inputType="text"
                        inputName="first-name"
                        inputId="first-name"
                        placeholder="Input Relative First Name"
                        required
                        error={getErrorField('relative_first_name', errors)}
                    />
                    <EditableInputFIeld
                        inputFor="last-name"
                        inputText="Relative Last Name"
                        inputType="text"
                        inputName="last-name"
                        inputId="last-name"
                        placeholder="Input Relative Last Name"
                        required
                        error={getErrorField('relative_last_name', errors)}
                    />
                    <EditableInputFIeld
                        inputFor="other-name"
                        inputText="Relative Other Name"
                        inputType="text"
                        inputName="other-name"
                        inputId="other-name"
                        placeholder="Input Relative Other Name"
                        error={getErrorField('relative_other_name', errors)}
                    />
                    <EditableSelectField
                        label="Relative Relation"
                        name="relative-relations"
                        id="relative-relations"
                        data={relations}
                        error={getErrorField('relation', errors)}
                    />
                    <ImageInputField
                        inputFor="picture"
                        inputText="Picture"
                        inputType="file"
                        inputId="picture"
                        inputName="picture"
                        placeholder="Upload your Profile Picture"
                        error={getErrorField("picture", errors)}
                    />
                    <SubmitButton pendingText="Adding..." buttonText="ADD RELATIVE" />
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
