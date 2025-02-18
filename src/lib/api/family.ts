import { handleApiResponse } from "@/utils/apiResponse";
import { fetchAccessTokenCookie } from "@/utils/cookies";
import { CREATE_FAMILY, VIEW_FAMILY, UPDATE_FAMILY, ADD_HANDLER, ADD_ORIGIN, ADD_HOUSE_INFO, ADD_BELIEF_SYSTEM, ADD_OTHER_INFO, ADD_EULOGY, ADD_FAMILY_HEAD } from "../endpoints/family";
import { ApiResponse } from "@/types/api";

const fetchWithAuth = async (url:string, options: { method?: string, body?: string, headers?: Record<string, string> } = {}) => {
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
    } catch (error) {
        return { error: "An error occurred" };
    }
};

// export async function viewFamilyApi(familyId: string): Promise<ApiResponse> {
//     try {
//         const token = await fetchAccessTokenCookie();
//         const response = await fetch(VIEW_FAMILY(familyId), {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token?.value || ""}`
//             },
//         })
//         return handleApiResponse(response)

//     } catch (error) {
//         return { error: `An error occured while fetching family information` }
//     }
// }


export const createFamilyApi = (data: any): Promise<ApiResponse> => fetchWithAuth(CREATE_FAMILY, { method: "POST", body: JSON.stringify(data) });

export const viewFamilyApi = (familyId: string): Promise<ApiResponse> => fetchWithAuth(VIEW_FAMILY(familyId));

export const updateFamilyApi = (familyId: string, data: any) :Promise<ApiResponse> => fetchWithAuth(UPDATE_FAMILY(familyId), { method: "PUT", body: JSON.stringify(data) });

export const addHandlerApi = (data: any) :Promise<ApiResponse> => fetchWithAuth(ADD_HANDLER, { method: "POST", body: JSON.stringify(data) });

export const addOriginApi = (familyId: string, data: any) :Promise<ApiResponse> => fetchWithAuth(ADD_ORIGIN(familyId), { method: "POST", body: JSON.stringify(data) });

export const addHouseInfoApi = (familyId: string, data: any) :Promise<ApiResponse> => fetchWithAuth(ADD_HOUSE_INFO(familyId), { method: "POST", body: JSON.stringify(data) });

export const addBeliefSystemApi = (familyId: string, data: any) :Promise<ApiResponse> => fetchWithAuth(ADD_BELIEF_SYSTEM(familyId), { method: "POST", body: JSON.stringify(data) });

export const addOtherInformationApi = (familyId: string, data: any) :Promise<ApiResponse> => fetchWithAuth(ADD_OTHER_INFO(familyId), { method: "POST", body: JSON.stringify(data) });

export const addEulogyApi = (familyId: string, data: any) :Promise<ApiResponse> => fetchWithAuth(ADD_EULOGY(familyId), { method: "POST", body: JSON.stringify(data) });

export const addFamilyHeadApi = (familyId: string, data: any) :Promise<ApiResponse> => fetchWithAuth(ADD_FAMILY_HEAD(familyId), { method: "POST", body: JSON.stringify(data) });
