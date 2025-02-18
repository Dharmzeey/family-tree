"use server";

import { ApiResponse } from "@/types/api";
import { SIGNUP, CONFIRM_EMAIL_VERIFICATION, SEND_EMAIL_VERIFICATION, LOGIN, FORGOT_PASSWORD, RESET_PASSWORD, CREATE_NEW_PASSWORD } from "../endpoints/auth";
import { CreateUserData, PinVerificationData, LoginUserData, ForgotPasswordData, ResetPasswordPinData, CreateNewPasswordData } from "@/types/auth";
import { handleAccessToken, fetchAccessTokenCookie, removeAllTokens, setRoleCookie } from "@/utils/cookies";
// import { handleErrorsResponse } from "@/types/responseHandler";
import { handleApiResponse } from "@/utils/apiResponse";
import { handleErrorsResponse } from "@/types/responseHandler";


export async function createUserApi(data: CreateUserData): Promise<ApiResponse> {
    try {
        const response = await fetch(SIGNUP, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const responseBody = await response.json();
        switch (response.status) {
            case 409:
                return {
                    error: "User with this email or Phone Number already exists.",
                };
            case 201:
                const access_token = responseBody.access_token;
                // const refresh_token = responseBody.refresh_token;
                await handleAccessToken(access_token);
                // handleRefreshToken(refresh_token);
                return { message: "Sign up successful", status: 201 };
            default:
                return { error: "Failed to sign up." };
        }
    } catch (error) {
        return { error: `An error occurred during signup. ${error}` };
    }
}

// code verification on signup
export async function verifyCodeApi(data: PinVerificationData): Promise<ApiResponse> {
    try {
        const token = await fetchAccessTokenCookie();
        const response = await fetch(CONFIRM_EMAIL_VERIFICATION, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token?.value || ""}`,
            },

            body: JSON.stringify(data),
        });
        return handleApiResponse(response)
    } catch (error) {
        return { message: "An error occurred during pin verification." };
    }
}

export async function resendEmailVerificationApi(): Promise<ApiResponse> {
    try {
        const token = await fetchAccessTokenCookie();
        const response = await fetch(SEND_EMAIL_VERIFICATION, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token?.value || ""}`,
            },
        });
        return handleApiResponse(response)
    } catch (error) {
        return { error: "An error occurred during PIN request." };
    }
}

export async function loginUserApi(data: LoginUserData): Promise<ApiResponse> {
    try {
        const response = await fetch(LOGIN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const responseBody = await response.json();
        switch (response.status) {
            case 401:
                return {
                    error: "Invalid Login Credentials.",
                };
            case 404:
                return {
                    error: "User does not exists",
                };
            case 400:
                return { error: handleErrorsResponse(responseBody) }
            case 200:
                const access_token = responseBody.access_token;
                // const refresh_token = responseBody.refresh_token;
                await handleAccessToken(access_token);
                await setRoleCookie(responseBody.data) // this will access the is_author or is_Handler
                // handleRefreshToken(refresh_token);
                return { message: "Login successful", status: 200 };
            default:
                return { error: "Failed to Log user in." };
        }
    } catch (error) {
        return { message: "An error occurred during login in." };
    }
}

export async function forgotPasswordApi(data: ForgotPasswordData): Promise<ApiResponse> {
    try {
        const response = await fetch(FORGOT_PASSWORD, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return handleApiResponse(response)
    } catch (error) {
        return { error: "An error occurred during PIN request." };
    }
}


export async function verifyResetCodeApi(data: ResetPasswordPinData): Promise<ApiResponse> {
    try {
        const response = await fetch(RESET_PASSWORD, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(data),
        });
        return handleApiResponse(response)
    } catch (error) {
        return { error: "An error occurred during pin verification." };
    }
}


export async function createNewPasswordApi(data: CreateNewPasswordData): Promise<ApiResponse> {
    try {
        const response = await fetch(CREATE_NEW_PASSWORD, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return handleApiResponse(response)
    } catch (error) {
        return { error: "An error occurred during password reset" };
    }
}


export async function logout() {
    removeAllTokens()
}