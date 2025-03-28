"use server";

import { z } from "zod";
import { ActionResponse } from "@/types/api";
import { phoneNumberValidator } from "@/utils/formatters";
import { createUserApi, verifyCodeApi, loginUserApi, forgotPasswordApi, verifyResetCodeApi, createNewPasswordApi } from "../api/auth";

export async function createUser(
    prevState: ActionResponse,
    formData: FormData
): Promise<ActionResponse> {
    const schema = z
        .object({
            email: z.string().email("Invalid email address"),
            phone_number: z
                .string().refine(phoneNumberValidator, "Invalid Phone Number"),
            password: z.string().min(8, "Password must be at least 8 characters"),
            confirm_password: z
                .string()
                .min(8, "Password must be at least 8 characters"),
        })
        .refine((data) => data.password === data.confirm_password, {
            message: "Passwords do not match",
            path: ["confirm_password"],
        });

    const parse = schema.safeParse({
        email: formData.get("email"),
        phone_number: formData.get("phone-number"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm-password"),
    });

    if (!parse.success) {
        return {
            zodErrors: parse.error.errors,
        };
    }

    const data = parse.data;
    return createUserApi(data);
}

// Email Verification
export async function verifyCode(
    prevState: ActionResponse,
    formData: FormData
): Promise<ActionResponse> {
    const schema = z.object({
        email_pin: z.string().length(6, "Invalid pin"),
    });

    const parse = schema.safeParse({
        email_pin: formData.get("email-pin"),
    });

    if (!parse.success) {
        return {
            zodErrors: parse.error.errors,
        };
    }
    const data = parse.data;
    return verifyCodeApi(data);
}

export async function loginUser(
    prevState: ActionResponse,
    formData: FormData
): Promise<ActionResponse> {
    const schema = z.object({
        email: z.string().email("Invalid email address").optional(),
        phone_number: z
            .string().refine(phoneNumberValidator, "Invalid Phone Number").optional(),
        password: z.string().min(8, "Password must be at least 8 characters"),
    });

    const parse = schema.safeParse({
        email: formData.get("email") || undefined,
        phone_number: formData.get("phone-number") || undefined,
        password: formData.get("password"),
    });

    if (!parse.success) {
        return {
            zodErrors: parse.error.errors,
        };
    }

    const data = parse.data;
    return loginUserApi(data);
}

export async function forgotPassword(
    prevState: ActionResponse,
    formData: FormData
): Promise<ActionResponse> {
    const schema = z.object({
        email: z.string().email("Invalid email address"),
    });

    const parse = schema.safeParse({
        email: formData.get("email"),
    });

    if (!parse.success) {
        return {
            zodErrors: parse.error.errors,
        };
    }

    const data = parse.data;
    return forgotPasswordApi(data);
}

export async function verifyResetCode(
    prevState: ActionResponse,
    formData: FormData
): Promise<ActionResponse> {
    const schema = z.object({
        email: z.string().email("Invalid email address"),
        reset_token: z.string(),
        email_pin: z.string().length(6, "Invalid pin"),
    });

    const parse = schema.safeParse({
        email: formData.get("reset-email"),
        reset_token: formData.get("reset-token"),
        email_pin: formData.get("email-pin"),
    });

    if (!parse.success) {
        return {
            zodErrors: parse.error.errors,
        };
    }
    const data = parse.data;
    return verifyResetCodeApi(data);
}


export async function createNewPassword(
    prevState: ActionResponse,
    formData: FormData
): Promise<ActionResponse> {
    const schema = z.object({
        email: z.string().email("Invalid email address"),
        reset_token: z.string(),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirm_password: z
            .string()
            .min(8, "Password must be at least 8 characters"),
    })
        .refine((data) => data.password === data.confirm_password, {
            message: "Passwords do not match",
            path: ["confirm_password"],
        });

    const parse = schema.safeParse({
        email: formData.get("reset-email"),
        reset_token: formData.get("reset-token"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm-password")
    })

    if (!parse.success) {
        return {
            zodErrors: parse.error.errors,
        };
    }
    const data = parse.data;
    return createNewPasswordApi(data)
}