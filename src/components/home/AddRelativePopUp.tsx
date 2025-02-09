'use client'

import { fetchRelationsApi } from "@/lib/api/profile";
import { RelationData } from "@/types/relatives";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useState } from "react"
import { ZodIssue } from "zod";
import { EditableSelectField } from "../ui/input";
import { addOnlineRelative } from "@/lib/validation/profile";
import { ProfileData } from "@/types/profile";
import { SubmitButton } from "../ui/button";

const initialState = {
    message: ""
}

export default function AddOnlineRelativePopUp(relative: { profile: ProfileData }) {
    const [relations, setRelations] = useState<RelationData[]>();
    const [formState, formAction] = useActionState(addOnlineRelative, initialState);
    const [errors, setErrors] = useState<ZodIssue[] | undefined>([]);
    useEffect(() => {
        async function getRelations() {
            await fetchRelationsApi().then((response) => {
                if (response.status === 401) {
                    redirect('/login')
                }
                setRelations(response.data)
            })
        }
        getRelations();
    }, [])

    useEffect(() => {
        setErrors(formState.errors)
    }, [formState])


    const getErrorForField = (fieldName: string) => {
        return errors?.filter((error) => error.path.includes(fieldName)).map((error) => error.message).join(', '); // Combines multiple messages if any
    };


    return (
        <>
            <div className="absolute w-full bg-black p-4 z-20">
                <form action={formAction}>
                    <div>How is {relative.profile.first_name} Related to you</div>
                    <input type="hidden" name="relative-id" value={relative.profile.id}/>
                    <EditableSelectField
                        label="Relative Relation"
                        name="relative-relations"
                        id="relative-relations"
                        data={relations}
                        error={getErrorForField('relation')}
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