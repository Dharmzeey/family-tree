"use server"

import { ACCESS_TOKEN_NAME, ACCESS_TOKEN_MAX_AGE, SESSION_ID, SESSION_TOKEN_MAX_AGE, USER_ROLES } from "@/lib/constants";
import { cookies } from "next/headers";



async function handleAccessToken(token: string) {
    (await cookies()).set({
        name: ACCESS_TOKEN_NAME,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: ACCESS_TOKEN_MAX_AGE,
        path: "/",
    });
}

// function handleRefreshToken(token: string) {
//     cookies().set({
//         name: REFRESH_TOKEN_NAME,
//         value: token,
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         maxAge: REFRESH_TOKEN_MAX_AGE,
//         path: "/",
//     });
// }


async function fetchAccessTokenCookie() {
    const cookieStore = cookies();
    return (await cookieStore).get(ACCESS_TOKEN_NAME);
}

async function fetchAuthenticatedUser() {
    const cookieStore = cookies();
    return (await cookieStore).get(ACCESS_TOKEN_NAME)?.value || null;
}


async function removeAllTokens() {
    return (await cookies()).delete(ACCESS_TOKEN_NAME)
    // cookieStore.delete(REFRESH_TOKEN_NAME)
}

async function setSessionId(session_token: string) {
    if (!session_token) return // if that BE does not send cookie, just move
    const extracted_token = session_token.split("=")[1].split(";")[0]; // this line extract just the token from the returned {sessionid=in4jrn9rhtk9wgim3up77l4lrm7m5uyq; expires=Mon, 11 Nov 2024 20:03:37 GMT; HttpOnly; Max-Age=1209600; Path=/; SameSite=Lax}
    (await cookies()).set({
        name: SESSION_ID,
        value: extracted_token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: SESSION_TOKEN_MAX_AGE,
        path: "/",
    });
}

async function getSessionId() {
    const cookieStore = cookies();
    return (await cookieStore).get(SESSION_ID)?.value || null;
}

async function setRoleCookie(data: { is_author: boolean, is_handler: boolean }) {
    (await cookies()).set({
        name: USER_ROLES,
        value: JSON.stringify(data),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: ACCESS_TOKEN_MAX_AGE,
        path: "/",
    })
}

async function fetchRolesCookies() {
    const roleCookies = (await cookies()).get(USER_ROLES)?.value;
    return roleCookies ? JSON.parse(roleCookies) : {};
}

async function removeRolesCookie() {
    return (await cookies()).delete(USER_ROLES)
}

export { handleAccessToken, fetchAccessTokenCookie, fetchAuthenticatedUser, removeAllTokens, setSessionId, getSessionId, setRoleCookie, fetchRolesCookies, removeRolesCookie }