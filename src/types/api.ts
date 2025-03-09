import { ZodIssue } from "zod";
import { Pagination } from "./pagination";

interface ApiResponse {
    // This is typical of the api response from the BE server
    status?: number;
    message?: string;
    token?: string | null;
    error?: string | null;
    errors?: Record<string, string[]>;
    data?: Record<string, unknown> | Record<string, unknown>[];
};

interface ActionResponse extends ApiResponse {
    // This adds zod error to the api response
    zodErrors?: ZodIssue[];
}

interface PaginatedApiResponse extends ApiResponse {
    pagination?: Pagination;
}


export type { ApiResponse, ActionResponse, PaginatedApiResponse }

