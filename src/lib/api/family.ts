import { handleApiResponse } from "@/utils/apiResponse";
import { fetchAccessTokenCookie } from "@/utils/cookies";
import { CREATE_FAMILY, VIEW_FAMILY, UPDATE_FAMILY, ADD_HANDLER, ADD_ORIGIN, ADD_HOUSE_INFO, ADD_BELIEF_SYSTEM, ADD_OTHER_INFO, ADD_EULOGY, ADD_FAMILY_HEAD, DELETE_HANDLER, UPDATE_ORIGIN, DELETE_FAMILY_HEAD, UPDATE_OTHER_INFO, UPDATE_BELIEF_SYSTEM, UPDATE_EULOGY, UPDATE_FAMILY_HEAD, UPDATE_HOUSE_INFO } from "../endpoints/family";
import { ApiResponse } from "@/types/api";
import { FamilyHeadData } from "@/types/family";

const fetchWithAuth = async (url: string,
    options: { method?: string, body?: string, headers?: Record<string, string> } = {}) => {
    try {
        const token = await fetchAccessTokenCookie();
        const response = await fetch(url, {
            ...options,
            headers: {
                Authorization: `Bearer ${token?.value || ""}`,
                "Content-Type": "application/json",
                ...options.headers
            }
        });
        return handleApiResponse(response);
    } catch {
        return { error: "An error occurred" };
    }
};


export const createFamilyApi = (data: { details: string }): Promise<ApiResponse> => fetchWithAuth(CREATE_FAMILY, { method: "POST", body: JSON.stringify(data) });
export const viewFamilyApi = (familyId: string): Promise<ApiResponse> => fetchWithAuth(VIEW_FAMILY(familyId));
export const updateFamilyApi = (familyId: string, data: { details: string }): Promise<ApiResponse> => fetchWithAuth(UPDATE_FAMILY(familyId), { method: "PUT", body: JSON.stringify(data) });

export const addHandlerApi = (operatorId: string): Promise<ApiResponse> => fetchWithAuth(ADD_HANDLER, { method: "POST", body: JSON.stringify(operatorId) });
export const deleteHandlerApi = (operatorId: string): Promise<ApiResponse> => fetchWithAuth(DELETE_HANDLER(operatorId), { method: "DELETE" });

export const addOriginApi = (familyId: string, data: { details: string }): Promise<ApiResponse> => fetchWithAuth(ADD_ORIGIN(familyId), { method: "POST", body: JSON.stringify(data) });
export const updateOriginApi = (familyId: string, data: { details: string }): Promise<ApiResponse> => fetchWithAuth(UPDATE_ORIGIN(familyId), { method: "PUT", body: JSON.stringify(data) });

export const addHouseInfoApi = (familyId: string, data: { details: string }): Promise<ApiResponse> => fetchWithAuth(ADD_HOUSE_INFO(familyId), { method: "POST", body: JSON.stringify(data) });
export const updateHouseInfoApi = (familyId: string, data: { details: string }): Promise<ApiResponse> => fetchWithAuth(UPDATE_HOUSE_INFO(familyId), { method: "PUT", body: JSON.stringify(data) });

export const addBeliefSystemApi = (familyId: string, data: { details: string }): Promise<ApiResponse> => fetchWithAuth(ADD_BELIEF_SYSTEM(familyId), { method: "POST", body: JSON.stringify(data) });
export const updateBeliefSystemApi = (familyId: string, data: { details: string }): Promise<ApiResponse> => fetchWithAuth(UPDATE_BELIEF_SYSTEM(familyId), { method: "PUT", body: JSON.stringify(data) });

export const addOtherInformationApi = (familyId: string, data: { details: string }): Promise<ApiResponse> => fetchWithAuth(ADD_OTHER_INFO(familyId), { method: "POST", body: JSON.stringify(data) });
export const updateOtherInformationApi = (familyId: string, data: { details: string }): Promise<ApiResponse> => fetchWithAuth(UPDATE_OTHER_INFO(familyId), { method: "PUT", body: JSON.stringify(data) });

export const addEulogyApi = (familyId: string, data: { details: string }): Promise<ApiResponse> => fetchWithAuth(ADD_EULOGY(familyId), { method: "POST", body: JSON.stringify(data) });
export const updateEulogyApi = (familyId: string, data: { details: string }): Promise<ApiResponse> => fetchWithAuth(UPDATE_EULOGY(familyId), { method: "PUT", body: JSON.stringify(data) });

export const addFamilyHeadApi = (familyId: string, data: FamilyHeadData): Promise<ApiResponse> => fetchWithAuth(ADD_FAMILY_HEAD(familyId), { method: "POST", body: JSON.stringify(data) });
export const updateFamilyHeadApi = (familyId: string, familyHeadId: string, data: FamilyHeadData): Promise<ApiResponse> => fetchWithAuth(UPDATE_FAMILY_HEAD(familyId, familyHeadId), { method: "PUT", body: JSON.stringify(data) });
export const deleteFamilyHeadApi = (familyId: string, familyHeadId: string): Promise<ApiResponse> => fetchWithAuth(DELETE_FAMILY_HEAD(familyId, familyHeadId), { method: "DELETE" });
