"use client";

import { createProfile } from "@/lib/validation/profile";
import { useActionState, useEffect, useState } from "react";
import { ZodIssue } from "zod";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../ui/button";
import { EditableInputFIeld, EditableTextAreaFIeld, ImageInputField } from "../ui/input";
import { getErrorField } from "@/utils/errorRenderer";
import { goHome1500ms } from "@/utils/delayTimer";
import FormMessages from "../repsonse/formResponse";

const initialState = {
    message: "",
};

export default function ProfileForm() {
    const [formState, formAction] = useActionState(createProfile, initialState);
    const [errors, setErrors] = useState<ZodIssue[] | undefined>([]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [otherName, setOtherName] = useState("");
    const [lineageName, setLineageName] = useState("");
    const [about, setAbout] = useState("");

    const router = useRouter();

    useEffect(() => {
        setErrors(formState.zodErrors);

        if (formState.status === 201 || formState.status === 409) {
            goHome1500ms(router)
        }
    }, [formState, router]);


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
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        error={getErrorField("first_name", errors)}
                    />
                    <EditableInputFIeld
                        inputFor="last-name"
                        inputText="Last Name"
                        inputType="text"
                        inputId="last-name"
                        inputName="last-name"
                        placeholder="Input your Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        error={getErrorField("last_name", errors)}
                    />
                    <EditableInputFIeld
                        inputFor="other-name"
                        inputText="Other Name"
                        inputType="text"
                        inputId="other-name"
                        inputName="other-name"
                        placeholder="Input your Other Name"
                        value={otherName}
                        onChange={(e) => setOtherName(e.target.value)}
                        error={getErrorField("other_name", errors)}
                    />
                    <EditableInputFIeld
                        inputFor="lineage-name"
                        inputText="Lineage Name"
                        inputType="text"
                        inputId="lineage-name"
                        inputName="lineage-name"
                        placeholder="Input your Lineage Name"
                        value={lineageName}
                        onChange={(e) => setLineageName(e.target.value)}
                        required
                        error={getErrorField("lineage_name", errors)}
                    />

                    <EditableTextAreaFIeld
                        inputFor="about"
                        inputText="About"
                        inputId="about"
                        inputName="about"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        error={getErrorField("about", errors)}
                    />

                    <ImageInputField
                        inputFor="picture"
                        inputText="Picture"
                        inputType="file"
                        inputId="picture"
                        inputName="picture"
                        placeholder="Upload your Profile Picture"
                        required
                        error={getErrorField("picture", errors)}
                    />

                    <SubmitButton pendingText="Creating..." buttonText="Create Profile" />

                    {/* Display feedback message */}
                    <FormMessages formState={formState} errors={errors} />
                </form>
            </div>
        </>
    );
}
