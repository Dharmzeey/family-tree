"use server";

import { fetchAccessTokenCookie } from "@/utils/cookies";
import { ADD_OFFLINE_RELATIVE, ADD_ONLINE_RELATIVES, CREATE_PROFILE, FETCH_RELATIONS, GET_NOTIFICATIONS, PROCESS_NOTIFICATIONS, SEARCH_RELATIVES, VIEW_PROFILE, VIEW_RELATIVES, VIEW_USER_RELATIVES } from "../endpoints/profile";
// import { handleErrorsResponse } from "@/types/responseHandler";
import { handleApiResponse, handlePaginatedApiResponse } from "@/utils/apiResponse";
import { ApiResponse, PaginatedApiResponse } from "@/types/api";

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
        return handleApiResponse(response)
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

export async function viewUserRelativesApi(id: string): Promise<ApiResponse> {
    try {
        const token = await fetchAccessTokenCookie();
        const response = await fetch(VIEW_USER_RELATIVES(id), {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token?.value || ""}`
            },
            // cache: "force-cache",
        })
        return handleApiResponse(response)

    } catch (error) {
        return { error: `An error occured while fetching use relatives` }
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


export async function getNotificationsApi(): Promise<ApiResponse> {
    try {
        const token = await fetchAccessTokenCookie();
        const response = await fetch(GET_NOTIFICATIONS, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token?.value || ""}`
            },
        })
        return handleApiResponse(response)

    } catch (error) {
        return { error: `An error occured while fetching notifications` }
    }
}

export async function processNotificationApi(data: { bond_request_id: string, accept: boolean }): Promise<ApiResponse> {
    try {
        const token = await fetchAccessTokenCookie();
        const response = await fetch(PROCESS_NOTIFICATIONS, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token?.value || ""}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        return handleApiResponse(response)

    } catch (error) {
        return { error: `An error occured while processing notifications` }
    }
}


export async function addOfflineRelativeApi(data: any): Promise<ApiResponse> {
    try {
        const token = await fetchAccessTokenCookie();

        const formData = new FormData();
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('other_name', data.other_name);
        formData.append('relation', data.relation);

        // Append picture only if it exists
        if (data.picture && data.picture.size > 0) {
            formData.append('picture', data.picture);
        }

        const response = await fetch(ADD_OFFLINE_RELATIVE, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token?.value || ""}`,
            },
            body: formData,
        });
        return handleApiResponse(response);
    } catch (error) {
        return { error: `An error occurred while adding offline relative`, status: 500 };
    }
}


export async function searchRelativeApi(query: string, page?: string): Promise<PaginatedApiResponse> {
    try {
        const token = await fetchAccessTokenCookie();
        const response = await fetch(SEARCH_RELATIVES(query, page), {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token?.value || ""}`,
                "Content-Type": "application/json"
            },
        })
        return handlePaginatedApiResponse(response)

    } catch (error) {
        return { error: `An error occured while searching relative` }
    }
}