export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
// export const BASE_URL = 'http://localhost:8000/v1';

export const ACCESS_TOKEN_NAME = "fam_tree"; // access token
export const ACCESS_TOKEN_MAX_AGE = 60 * 60 * 24 * 14; // 14 days
export const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 30; // 1 day
export const SESSION_TOKEN_MAX_AGE = 60 * 60 * 24 * 14; // 14 days
export const SESSION_ID = "sessionid";

export const USER_ROLES = "user_roles";