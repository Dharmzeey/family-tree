import { ZodIssue } from "zod";

interface ApiResponse<T = any> {
    // This is typical of the api response from the BE server
    status?: number;
    message?: string;
    token?: string | null;
    error?: string | null;
    data?: T;
};

interface ActionResponse extends ApiResponse {
    // This adds zod error to the api response
    zodErrors?: ZodIssue[];
}

interface PaginatedApiResponse extends ApiResponse {
    pagination?: Pagination;
}


export type { ApiResponse,  ActionResponse, PaginatedApiResponse }

