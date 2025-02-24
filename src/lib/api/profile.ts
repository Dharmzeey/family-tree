"use server";

import { fetchAccessTokenCookie } from "@/utils/cookies";
import { ADD_OFFLINE_RELATIVE, ADD_ONLINE_RELATIVES, CREATE_PROFILE, DELETE_RELATIVE, EDIT_PROFILE, FETCH_RELATIONS, GET_NOTIFICATIONS, PROCESS_NOTIFICATIONS, SEARCH_RELATIVES, VIEW_PROFILE, VIEW_RELATIVES, VIEW_USER_RELATIVES } from "../endpoints/profile";
import { handleApiResponse, handlePaginatedApiResponse } from "@/utils/apiResponse";
import { ApiResponse, PaginatedApiResponse } from "@/types/api";

const fetchWithAuth = async (url: string,
    options: { method?: string, body?: any, cache?: RequestCache, headers?: Record<string, string> } = {}) => {
    try {
        const token = await fetchAccessTokenCookie();
        const response = await fetch(url, {
            ...options,
            headers: {
                Authorization: `Bearer ${token?.value || ""}`,
                // "Content-Type": options.body instanceof FormData ? "multipart/form-data" : "application/json",
                ...options.headers
            }
        });
        return handleApiResponse(response);
    } catch (error) {
        return { error: "An error occurred" };
    }
};

export async function fetchRelationsApi(): Promise<ApiResponse> {
    return fetchWithAuth(FETCH_RELATIONS, { method: "GET", cache: "force-cache" });
}

export async function createProfileApi(data: any): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('lineage_name', data.lineage_name);
    formData.append('other_name', data.other_name);
    formData.append('picture', data.picture);

    return fetchWithAuth(CREATE_PROFILE, { method: "POST", body: formData });
}

export async function editProfileApi(data: any): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('lineage_name', data.lineage_name);
    formData.append('other_name', data.other_name);
    if (data.picture && data.picture.size > 0) {
        formData.append('picture', data.picture);
    }

    return fetchWithAuth(EDIT_PROFILE, { method: "PUT", body: formData });
}

export async function fetchProfileApi(): Promise<ApiResponse> {
    return fetchWithAuth(VIEW_PROFILE, { method: "GET"});
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

export async function addOfflineRelativeApi(data: any): Promise<ApiResponse> {
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
    } catch (error) {
        return { error: `An error occurred while searching relative` };
    }
}

export async function deleteRelativeApi(id: string): Promise<ApiResponse> {
    return fetchWithAuth(DELETE_RELATIVE(id), { method: "DELETE" });
}
