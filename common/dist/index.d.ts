import { z } from "zod";
export declare const signUpInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    firsstName: z.ZodString;
    lastName: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    firsstName: string;
    lastName?: string | undefined;
}, {
    email: string;
    password: string;
    firsstName: string;
    lastName?: string | undefined;
}>;
export type signUpType = z.infer<typeof signUpInput>;
export declare const signInInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type signInType = z.infer<typeof signInInput>;
export declare const deleteUserInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type deleteUserType = z.infer<typeof deleteUserInput>;
export declare const createPost: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export type createPostType = z.infer<typeof createPost>;
export declare const updatePost: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export type updatePostType = z.infer<typeof updatePost>;
