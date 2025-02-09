export async function handleApiResponse(response: Response) {
    const responseBody = await response.json();
    return {
        data: responseBody.data || null,
        error: responseBody.error || responseBody.detail || null,
        message: responseBody.message || null,
        status: response.status,
    };
}

export async function handlePaginatedApiResponse(response: Response) {
    const responseBody = await response.json();
    return {
        data: responseBody.data || null,
        error: responseBody.error || responseBody.detail || null,
        message: responseBody.message || null,
        status: response.status,
        pagination: responseBody.pagination || null,
    };
}
