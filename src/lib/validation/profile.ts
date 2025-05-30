import { ActionResponse } from "@/types/api";
import { z } from "zod";
import { addOfflineRelativeApi, addOnlineRelativeApi, createProfileApi, editProfileApi, includeFamilyApi } from "../api/profile";


export async function createProfile(
    prevState: ActionResponse,
    formData: FormData
): Promise<ActionResponse> {
    const schema = z.object({
        first_name: z.string().nonempty("First name cannot be empty"),
        last_name: z.string().nonempty("Last name cannot be empty"),
        lineage_name: z.string().nonempty("Lineage name cannot be empty"),
        other_name: z.string(),
        about: z.string().nonempty('About cannot be empty'),
        picture: z.instanceof(File).refine(file => file.size <= 850 * 1024, "Picture must be less than 800kb")
    });

    const parse = schema.safeParse({
        first_name: formData.get("first-name"),
        last_name: formData.get("last-name"),
        lineage_name: formData.get("lineage-name"),
        other_name: formData.get("other-name"),
        about: formData.get("about"),
        picture: formData.get("picture")
    })

    if (!parse.success){
        return {
            zodErrors: parse.error.errors
        }
    }

    const data = parse.data
    return createProfileApi(data);
}

export async function editProfile(
    prevState: ActionResponse,
    formData: FormData
): Promise<ActionResponse> {
    const schema = z.object({
        first_name: z.string().nonempty("First name cannot be empty"),
        last_name: z.string().nonempty("Last name cannot be empty"),
        lineage_name: z.string().nonempty("Lineage name cannot be empty"),
        other_name: z.string(),
        about: z.string().nonempty('About cannot be empty'),
        picture: z.instanceof(File).refine(file => file.size <= 850 * 1024, "Picture must be less than 800kb")
    });

    const parse = schema.safeParse({
        first_name: formData.get("first-name"),
        last_name: formData.get("last-name"),
        lineage_name: formData.get("lineage-name"),
        other_name: formData.get("other-name"),
        about: formData.get("about"),
        picture: formData.get("picture")
    })

    if (!parse.success){
        return {
            zodErrors: parse.error.errors
        }
    }

    const data = parse.data
    return editProfileApi(data);
}


export async function addOnlineRelative(
    prevState: ActionResponse,
    formData: FormData
): Promise<ActionResponse> {
    const schema = z.object({
        relative_id: z.string().nonempty("First name cannot be empty"),
        relation_id: z.string().nonempty("Last name cannot be empty"),
    });
    const parse = schema.safeParse({
        relative_id: formData.get("relative-id"),
        relation_id: formData.get("relative-relations"),
    });
    if (!parse.success) {
        return {
            zodErrors: parse.error.errors,
        };
    }
    const data = parse.data;
    return addOnlineRelativeApi(data);
}


export async function addOfflineRelative(
    prevState: ActionResponse,
    formData: FormData
): Promise<ActionResponse> {
    const schema = z.object({
        first_name: z.string().nonempty("First name cannot be empty"),
        last_name: z.string().nonempty("Last name cannot be empty"),
        other_name: z.string(),
        relation: z.string().nonempty("Relation cannot be empty"),
        picture: z.instanceof(File).refine(file => file.size <= 850 * 1024, "Picture must be less than 800kb")
    });
    const parse = schema.safeParse({
        first_name: formData.get("first-name"),
        last_name: formData.get("last-name"),
        other_name: formData.get("other-name"),
        relation: formData.get("relative-relations"),
        picture: formData.get("picture")
    });
    if (!parse.success) {
        return {
            zodErrors: parse.error.errors,
        };
    }
    const data = parse.data;
    return addOfflineRelativeApi(data);
}

export async function includeFamily(
    prevState: ActionResponse,
    formData: FormData
): Promise<ActionResponse> {
    const schema = z.object({
        family_id: z.string().nonempty("First name cannot be empty")
    });
    const parse = schema.safeParse({
        family_id: formData.get("family-id"),
    });
    if (!parse.success) {
        return {
            zodErrors: parse.error.errors,
        };
    }
    const data = parse.data;
    return includeFamilyApi(data);
}