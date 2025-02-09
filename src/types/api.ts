import { ZodIssue } from "zod";

interface ApiResponse<T = any> {
    status?: number;
    message?: string;
    token?: string;
    error?: string;
    data?: T;
    fieldErrors?: {};
};


interface ActionResponse extends ApiResponse {
    errors?: ZodIssue[];
}

interface PaginatedApiResponse extends ApiResponse {
    pagination?: Pagination;
}


export type { ApiResponse,  ActionResponse, PaginatedApiResponse }
