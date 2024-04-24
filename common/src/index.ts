import { z } from "zod";

export const signUpInput = z.object({
    email : z.string().email(),
    password : z.string().min(6),
    firstName : z.string().min(3),
    lastName : z.string().optional()
});

export type signUpType = z.infer<typeof signUpInput>;



export const signInInput = z.object({
    email : z.string().email(),
    password : z.string().min(6),
});

export type signInType = z.infer<typeof signInInput>;



export const deleteUserInput = z.object({
    email : z.string().email(),
    password : z.string().min(6),
});

export type deleteUserType = z.infer<typeof deleteUserInput>;



export const createPostInput = z.object({
    title : z.string(),
    content : z.string(),
});

export type createPostType = z.infer<typeof createPostInput>;


export const updatePostInput = z.object({
    title : z.string(),
    content : z.string(),
});

export type updatePostType = z.infer<typeof updatePostInput>;





