"use client";

import { editProfile } from "@/lib/validation/profile";
import { useActionState, useEffect, useState } from "react";
import { ZodIssue } from "zod";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../ui/button";
import { EditableInputFIeld, EditableTextAreaFIeld, ImageInputField } from "../ui/input";
import { getErrorField } from "@/utils/errorRenderer";
import { GetProfileData } from "@/types/profile";
import Image from "next/image";
import FormMessages from "../repsonse/formResponse";
import { Loader } from "../ui/loader";

const initialState = {
    message: "",
};


export default function EditProfileForm() {
    const [formState, formAction] = useActionState(editProfile, initialState);
    const [errors, setErrors] = useState<ZodIssue[] | undefined>([]);
    const [user, setUser] = useState<GetProfileData>()
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter();

    useEffect(() => {
        setErrors(formState.zodErrors);

        if (formState.status === 200) {
            setTimeout(() => {
                router.push("/");
            }, 1500); // Redirect after 2 seconds
        }
    }, [formState, router]);

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            setUser(JSON.parse(user))
        }
        setLoading(false)
    }, [])

    if (loading) return <Loader />
    if (!user) return <p>Please create a user profile</p>

    return (
        <>
            <div className="bg-[#ffffff0a] backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
                <form action={formAction} className="flex flex-col justify-center items-center w-full">
                    <Image
                        src={user!.picture}
                        alt={user!.first_name}
                        width={150}
                        height={150}
                        className="rounded-full w-16 h-16"
                    />

                    <EditableInputFIeld
                        inputFor="first-name"
                        inputText="First Name"
                        inputType="text"
                        inputId="first-name"
                        inputName="first-name"
                        placeholder="Input your First Name"
                        defaultValue={user!.first_name}
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
                        defaultValue={user!.last_name}
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
                        defaultValue={user!.other_name}
                        error={getErrorField("other_name", errors)}
                    />
                    <EditableInputFIeld
                        inputFor="lineage-name"
                        inputText="Lineage Name"
                        inputType="text"
                        inputId="lineage-name"
                        inputName="lineage-name"
                        placeholder="Input your Lineage Name"
                        defaultValue={user!.lineage_name}
                        required
                        error={getErrorField("lineage_name", errors)}
                    />
                    <EditableTextAreaFIeld
                        inputFor="about"
                        inputText="About"
                        inputId="about"
                        inputName="about"
                        defaultValue={user!.about}
                        error={getErrorField("about", errors)}
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

                    <SubmitButton pendingText="Editing..." buttonText="Edit Profile" />

                    {/* Display feedback message */}
                    <FormMessages formState={formState} errors={errors} />
                </form>
            </div>
        </>
    );
}
