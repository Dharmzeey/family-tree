import { ActionResponse } from "@/types/api";
import { z } from "zod";
import { addBeliefSystemApi, addEulogyApi, addFamilyHeadApi, addHandlerApi, addHouseInfoApi, addOriginApi, addOtherInformationApi, updateBeliefSystemApi, updateEulogyApi, updateFamilyHeadApi, updateHouseInfoApi, updateOriginApi, updateOtherInformationApi } from "../api/family";

export async function addFamilyHead(
    prevState: ActionResponse,
    formData: FormData
): Promise<ActionResponse> {
    const schema = z.object({
        person_id: z.string().nonempty("This field cannot be empty"),
        date_from: z.string().pipe(z.coerce.date().transform((date) => date.toISOString().split('T')[0])),
        date_to: z
        .union([z.string().length(0), z.string().min(4)]) // Allow empty string or undefined
        .transform((val) => (val ? new Date(val).toISOString().split("T")[0] : undefined)),
        comment: z.string(),
    });
    const parse = schema.safeParse({
        person_id: formData.get("person-id"),
        date_from: formData.get("date-from"),
        date_to: formData.get("date-to"),
        comment: formData.get("comment"),
    });
    if (!parse.success) {
        return {
            zodErrors: parse.error.errors,
        };
    }
    const data = parse.data;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const familyId = user.family_id;
    if (!familyId) {
        return {
            zodErrors: [{
                code: "custom",
                message: "Family ID not found in local storage",
                path: ["familyId"]
            }],
        };
    }
    return addFamilyHeadApi(familyId, data);
}

export async function updateFamilyHead(
    prevState: ActionResponse,
    formData: FormData
): Promise<ActionResponse> {
    const schema = z.object({
        familyHead_id: z.string().nonempty("This field cannot be empty"),
        date_from: z.string().pipe(z.coerce.date().transform((date) => date.toISOString().split('T')[0])),
        date_to: z
        .union([z.string().length(0), z.string().min(4)]) // Allow empty string or undefined
        .transform((val) => (val ? new Date(val).toISOString().split("T")[0] : undefined)),
        comment: z.string(),
    });
    const parse = schema.safeParse({
        familyHead_id: formData.get("family-head-id"),
        date_from: formData.get("date-from"),
        date_to: formData.get("date-to"),
        comment: formData.get("comment"),
    });
    if (!parse.success) {
        return {
            zodErrors: parse.error.errors,
        };
    }
    const data = parse.data;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const familyId = user.family_id;
    return updateFamilyHeadApi(familyId, parse.data.familyHead_id, data);
}

export async function addFamilyOrigin(
    prevState: ActionResponse,
    formData: FormData
): Promise<ActionResponse> {
    const schema = z.object({
        details: z.string().nonempty("This field cannot be empty"),
    });
    const parse = schema.safeParse({
        details: formData.get("details"),
    });
    if (!parse.success) {
        return {
            zodErrors: parse.error.errors,
        };
    }
    const data = parse.data;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const familyId = user.family_id;
    return addOriginApi(familyId, data);
}

export async function updateFamilyOrigin(
    prevState: ActionResponse,
    formData: FormData
): Promise<ActionResponse> {
    const schema = z.object({
        details: z.string().nonempty("This field cannot be empty"),
    });
    const parse = schema.safeParse({
        details: formData.get("details"),
    });
    if (!parse.success) {
        return {
            zodErrors: parse.error.errors,
        };
    }
    const data = parse.data;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const familyId = user.family_id;
    return updateOriginApi(familyId, data);
}

export async function addHouseInfo(
    prevState: ActionResponse,
    formData: FormData
): Promise<ActionResponse> {
    const schema = z.object({
        details: z.string().nonempty("This field cannot be empty"),
    });
    const parse = schema.safeParse({
        details: formData.get("details"),
    });
    if (!parse.success) {
        return {
            zodErrors: parse.error.errors,
        };
    }
    const data = parse.data;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const familyId = user.family_id;
    return addHouseInfoApi(familyId, data);
}

export async function updateHouseInfo(
    prevState: ActionResponse,
    formData: FormData
): Promise<ActionResponse> {
    const schema = z.object({
        details: z.string().nonempty("This field cannot be empty"),
    });
    const parse = schema.safeParse({
        details: formData.get("details"),
    });
    if (!parse.success) {
        return {
            zodErrors: parse.error.errors,
        };
    }
    const data = parse.data;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const familyId = user.family_id;
    return updateHouseInfoApi(familyId, data);
}

export async function addBeliefSystem(
    prevState: ActionResponse,
    formData: FormData
): Promise<ActionResponse> {
    const schema = z.object({
        details: z.string().nonempty("This field cannot be empty"),
    });
    const parse = schema.safeParse({
        details: formData.get("details"),
    });
    if (!parse.success) {
        return {
            zodErrors: parse.error.errors,
        };
    }
    const data = parse.data;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const familyId = user.family_id;
    return addBeliefSystemApi(familyId, data);
}

export async function updateBeliefSystem(
    prevState: ActionResponse,
    formData: FormData
): Promise<ActionResponse> {
    const schema = z.object({
        details: z.string().nonempty("This field cannot be empty"),
    });
    const parse = schema.safeParse({
        details: formData.get("details"),
    });
    if (!parse.success) {
        return {
            zodErrors: parse.error.errors,
        };
    }
    const data = parse.data;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const familyId = user.family_id;
    return updateBeliefSystemApi(familyId, data);
}


export async function addEuogy(
    prevState: ActionResponse,
    formData: FormData
): Promise<ActionResponse> {
    const schema = z.object({
        details: z.string().nonempty("This field cannot be empty"),
    });
    const parse = schema.safeParse({
        details: formData.get("details"),
    });
    if (!parse.success) {
        return {
            zodErrors: parse.error.errors,
        };
    }
    const data = parse.data;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const familyId = user.family_id;
    return addEulogyApi(familyId, data);
}

export async function updateEulogy(
    prevState: ActionResponse,
    formData: FormData
): Promise<ActionResponse> {
    const schema = z.object({
        details: z.string().nonempty("This field cannot be empty"),
    });
    const parse = schema.safeParse({
        details: formData.get("details"),
    });
    if (!parse.success) {
        return {
            zodErrors: parse.error.errors,
        };
    }
    const data = parse.data;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const familyId = user.family_id;
    return updateEulogyApi(familyId, data);
}

export async function addOtherInfo(
    prevState: ActionResponse,
    formData: FormData
): Promise<ActionResponse> {
    const schema = z.object({
        details: z.string().nonempty("This field cannot be empty"),
    });
    const parse = schema.safeParse({
        details: formData.get("details"),
    });
    if (!parse.success) {
        return {
            zodErrors: parse.error.errors,
        };
    }
    const data = parse.data;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const familyId = user.family_id;
    return addOtherInformationApi(familyId, data);
}

export async function updateOtherInfo(
    prevState: ActionResponse,
    formData: FormData
): Promise<ActionResponse> {
    const schema = z.object({
        details: z.string().nonempty("This field cannot be empty"),
    });
    const parse = schema.safeParse({
        details: formData.get("details"),
    });
    if (!parse.success) {
        return {
            zodErrors: parse.error.errors,
        };
    }
    const data = parse.data;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const familyId = user.family_id;
    return updateOtherInformationApi(familyId, data);
}

export async function addHandler(
    prevState: ActionResponse,
    formData: FormData
): Promise<ActionResponse> {
    const schema = z.object({
        operator_id: z.string().nonempty("This field cannot be empty"),
    });
    const parse = schema.safeParse({
        operator_id: formData.get("person-id"),
    });
    if (!parse.success) {
        return {
            zodErrors: parse.error.errors,
        };
    }
    const data = parse.data;
    return addHandlerApi(data.operator_id);
}
