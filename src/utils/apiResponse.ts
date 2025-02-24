import { handleErrorsResponse } from "@/utils/responseHandler";
import { redirect } from "next/navigation";

export async function handleApiResponse(response: Response) {
    const responseBody = await response.json();
    if (response.status === 401) redirect("/login")
    return {
        data: responseBody.data || null,
        error: responseBody.error || responseBody.detail || handleErrorsResponse(responseBody) || null,
        message: responseBody.message || null,
        status: response.status,
        // errors: responseBody.errors
    };
}

export async function handlePaginatedApiResponse(response: Response) {
    const responseBody = await response.json();
    if (response.status === 401) redirect("/login")
    return {
        data: responseBody.data || null,
        error: responseBody.error || responseBody.detail || null,
        message: responseBody.message || null,
        status: response.status,
        pagination: responseBody.pagination || null,
    };
}