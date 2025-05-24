"use client";

import { useActionState, useEffect, useState } from "react";
import { EditableInputFIeld, EditableSelectField, ImageInputField } from "../ui/input";
import { fetchRelationsApi } from "@/lib/api/profile";
import { RelationData } from "@/types/relatives";
import { addOfflineRelative } from "@/lib/validation/profile";
import { ZodIssue } from "zod";
import { SubmitButton } from "../ui/button";
import { getErrorField } from "@/utils/errorRenderer";
import FormMessages from "../repsonse/formResponse";

const initialState = {
    message: ""
}

export default function RelativeForm() {
    const [relations, setRelations] = useState<RelationData[]>();
    const [formState, formAction] = useActionState(addOfflineRelative, initialState);
    const [errors, setErrors] = useState<ZodIssue[] | undefined>([]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("")
    const [otherName, setOtherName] = useState("");
    
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
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        error={getErrorField('first_name', errors)}
                    />
                    <EditableInputFIeld
                        inputFor="last-name"
                        inputText="Relative Last Name"
                        inputType="text"
                        inputName="last-name"
                        inputId="last-name"
                        placeholder="Input Relative Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        error={getErrorField('last_name', errors)}
                    />
                    <EditableInputFIeld
                        inputFor="other-name"
                        inputText="Relative Other Name"
                        inputType="text"
                        inputName="other-name"
                        inputId="other-name"
                        placeholder="Input Relative Other Name"
                        value={otherName}
                        onChange={(e) => setOtherName(e.target.value)}
                        error={getErrorField('other_name', errors)}
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
                    <FormMessages formState={formState} errors={errors} />
                </form>
            </div>
        </>
    )
}
