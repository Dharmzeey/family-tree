"use server";

import { fetchAccessTokenCookie } from "@/utils/cookies";
import { ADD_OFFLINE_RELATIVE, ADD_ONLINE_RELATIVES, CREATE_PROFILE, FETCH_RELATIONS, SEARCH_RELATIVES, VIEW_PROFILE, VIEW_RELATIVES } from "../endpoints/profile";
import { handleErrorsResponse } from "@/types/responseHandler";
import { handleApiResponse } from "@/utils/apiResponse";
import { ApiResponse } from "@/types/api";

export async function fetchRelationsApi(): Promise<ApiResponse> {
    try {
        const token = await fetchAccessTokenCookie();
        const response = await fetch(FETCH_RELATIONS, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token?.value || ""}`
            },
            cache: "force-cache",
        });
        // Generic response handler
        return handleApiResponse(response)
    }
    catch (error) {
        return { error: `An error occurred while fetching relations.` };
    }
}


export async function createProfileApi(data: any): Promise<ApiResponse> {
    try {
        const token = await fetchAccessTokenCookie();
        // Create FormData object
        const formData = new FormData();
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('lineage_name', data.lineage_name);
        formData.append('other_name', data.other_name);
        formData.append('picture', data.picture);

        const response = await fetch(CREATE_PROFILE, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token?.value || ""}`,
                // "Content-Type": "multipart/form-data"
            },
            body: formData,
        });
        const responseBody = await response.json()
        switch (response.status) {
            case 401:
                return { error: responseBody.detail, status: 401 }
            case 409:
                return { error: responseBody.error, status: 409 }
            case 400:
                return handleErrorsResponse(responseBody)
            case 201:
                return { message: responseBody.message, data: responseBody.data }
            default:
                return { error: responseBody.errors };
        }
    } catch (error) {
        return { error: `An error occurred while creating profile.` };
    }
}


export async function fetchProfileApi(): Promise<ApiResponse> {
    try {
        const token = await fetchAccessTokenCookie();
        const response = await fetch(VIEW_PROFILE, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token?.value || ""}`
            },
            cache: "force-cache",
        });
        return handleApiResponse(response)
    } catch (error) {
        return { error: `An error occurred while fetching profile.` };
    }
}


export async function viewRelativesApi(): Promise<ApiResponse> {
    try {
        const token = await fetchAccessTokenCookie();
        const response = await fetch(VIEW_RELATIVES, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token?.value || ""}`
            },
            // cache: "force-cache",
        })
        return handleApiResponse(response)

    } catch (error) {
        return { error: `An error occured while fetching relatives` }
    }
}


export async function addOnlineRelativeApi(
    data: { relative_id: string, relation_id: string }
)
    : Promise<ApiResponse> {
    try {
        const token = await fetchAccessTokenCookie();
        const response = await fetch(ADD_ONLINE_RELATIVES, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token?.value || ""}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })
        return handleApiResponse(response)

    } catch (error) {
        return { error: `An error occured while adding online relative` }
    }
}


export async function addOfflineRelativeApi(data: any): Promise<ApiResponse> {
    try {
        const token = await fetchAccessTokenCookie();
        const response = await fetch(ADD_OFFLINE_RELATIVE, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token?.value || ""}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })
        return handleApiResponse(response)

    } catch (error) {
        return { error: `An error occured while adding offline relative`, status: 500 }
    }
}


export async function searchRelativeApi(query: string): Promise<ApiResponse> {
    try {
        const token = await fetchAccessTokenCookie();
        const response = await fetch(SEARCH_RELATIVES(query), {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token?.value || ""}`,
                "Content-Type": "application/json"
            },
        })
        return handleApiResponse(response)

    } catch (error) {
        return { error: `An error occured while searching relative` }
    }
}