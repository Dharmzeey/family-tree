import { ActionResponse } from "@/types/api";
import { z } from "zod";
import { addOfflineRelativeApi, createProfileApi } from "../api/profile";


export async function createProfile(
    prevState: ActionResponse,
    formData: FormData
): Promise<ActionResponse> {
    const schema = z.object({
        first_name: z.string().nonempty("First name cannot be empty"),
        last_name: z.string().nonempty("Last name cannot be empty"),
        lineage_name: z.string().nonempty("Lineage name cannot be empty"),
        other_name: z.string(),
        picture: z.instanceof(File).refine(file => file.size <= 850 * 1024, "Picture must be less than 800kb")
    });

    const parse = schema.safeParse({
        first_name: formData.get("first-name"),
        last_name: formData.get("last-name"),
        lineage_name: formData.get("lineage-name"),
        other_name: formData.get("other-name"),
        picture: formData.get("picture")
    })

    if (!parse.success){
        return {
            errors: parse.error.errors
        }
    }

    const data = parse.data
    return createProfileApi(data);
}


export async function addOfflineRelative(
    prevState: ActionResponse,
    formData: FormData
): Promise<ActionResponse> {
    const schema = z.object({
        first_name: z.string().nonempty("First name cannot be empty"),
        last_name: z.string().nonempty("Last name cannot be empty"),
        relation: z.string().nonempty("Relation cannot be empty"),
    });
    const parse = schema.safeParse({
        first_name: formData.get("first-name"),
        last_name: formData.get("last-name"),
        relation: formData.get("relative-relations"),
    });
    if (!parse.success) {
        return {
            errors: parse.error.errors,
        };
    }
    const data = parse.data;
    return addOfflineRelativeApi(data);
}