"use server";

import { fetchAccessTokenCookie } from "@/utils/cookies";
import { ADD_OFFLINE_RELATIVE, ADD_ONLINE_RELATIVES, CONFIRM_FAMILY_REQUEST, CREATE_PROFILE, DELETE_RELATIVE, EDIT_PROFILE, FETCH_RELATIONS, GET_NOTIFICATIONS, INCLUDE_FAMILY_REQUEST, PROCESS_NOTIFICATIONS, SEARCH_RELATIVES, VIEW_PROFILE, VIEW_RELATIVES, VIEW_USER_RELATIVES } from "../endpoints/profile";
import { handleApiResponse, handlePaginatedApiResponse } from "@/utils/apiResponse";
import { ApiResponse, PaginatedApiResponse } from "@/types/api";
import { OfflineRelativesData, SendProfileData } from "@/types/profile";

const fetchWithAuth = async (url: string,
    options: { method?: string, body?: string | FormData, cache?: RequestCache, headers?: Record<string, string> } = {}) => {
    try {
        const token = await fetchAccessTokenCookie();
        const headers: Record<string, string> = {
            Authorization: `Bearer ${token?.value || ""}`,
            ...options.headers
        };
        // Only assign a 'Content-Type' header if the body is not an instance of FormData

        if (!(options.body instanceof FormData)) {
            headers["Content-Type"] = "application/json";
        }

        const response = await fetch(url, {
            ...options,
            headers
        });
        return handleApiResponse(response);
    } catch (error){
        console.log(error)
        return { error: "A server error occurred", status: 500 };
    }
};

// This is used to shuffle between the profile page and the landing page
export async function userLoggedIn(): Promise<ApiResponse>{
    try {
        const token = await fetchAccessTokenCookie();
        const response = await fetch(VIEW_PROFILE, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token?.value || ""}`,
            },
        });
        return { status: response.status, data: await response.json() };
    }catch (error) {
        console.error("Error checking user login status:", error);
        return { error: "An error occurred while checking login status", status: 500 };
    }
}


export async function fetchRelationsApi(): Promise<ApiResponse> {
    return fetchWithAuth(FETCH_RELATIONS, { method: "GET", cache: "force-cache" });
}

export async function createProfileApi(data: SendProfileData): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('lineage_name', data.lineage_name);
    formData.append('other_name', data.other_name);
    formData.append('about', data.about);
    formData.append('picture', data.picture);

    return fetchWithAuth(CREATE_PROFILE, { method: "POST", body: formData });
}

export async function editProfileApi(data: SendProfileData): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('lineage_name', data.lineage_name);
    formData.append('other_name', data.other_name);
    formData.append('about', data.about);
    if (data.picture && data.picture.size > 0) {
        formData.append('picture', data.picture);
    }

    return fetchWithAuth(EDIT_PROFILE, { method: "PUT", body: formData });
}

export async function fetchProfileApi(): Promise<ApiResponse> {
    return fetchWithAuth(VIEW_PROFILE, { method: "GET" });
}

export async function viewRelativesApi(): Promise<ApiResponse> {
    return fetchWithAuth(VIEW_RELATIVES, { method: "GET" });
}

export async function viewUserRelativesApi(id: string): Promise<ApiResponse> {
    return fetchWithAuth(VIEW_USER_RELATIVES(id), { method: "GET" });
}

export async function addOnlineRelativeApi(data: { relative_id: string, relation_id: string }): Promise<ApiResponse> {
    return fetchWithAuth(ADD_ONLINE_RELATIVES, { method: "POST", body: JSON.stringify(data) });
}

export async function getNotificationsApi(): Promise<ApiResponse> {
    return fetchWithAuth(GET_NOTIFICATIONS, { method: "GET" });
}

export async function processNotificationApi(data: { bond_request_id: string, accept: boolean }): Promise<ApiResponse> {
    return fetchWithAuth(PROCESS_NOTIFICATIONS, { method: "POST", body: JSON.stringify(data) });
}

export async function addOfflineRelativeApi(data: OfflineRelativesData): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('other_name', data.other_name);
    formData.append('relation', data.relation);

    if (data.picture && data.picture.size > 0) {
        formData.append('picture', data.picture);
    }

    return fetchWithAuth(ADD_OFFLINE_RELATIVE, { method: "POST", body: formData });
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
        });
        return handlePaginatedApiResponse(response);
    } catch {
        return { error: `An error occurred while searching relative` };
    }
}

export async function deleteRelativeApi(id: string): Promise<ApiResponse> {
    return fetchWithAuth(DELETE_RELATIVE(id), { method: "DELETE" });
}

export async function includeFamilyApi(data: { family_id: string }): Promise<ApiResponse> {
    return fetchWithAuth(INCLUDE_FAMILY_REQUEST, { method: "POST", body: JSON.stringify(data) });
}

export async function confirmFamilyRequestApi(data: { family_id: string }): Promise<ApiResponse> {
    return fetchWithAuth(CONFIRM_FAMILY_REQUEST, { method: "POST", body: JSON.stringify(data) });
}