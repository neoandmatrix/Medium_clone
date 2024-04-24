"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePost = exports.createPost = exports.deleteUserInput = exports.signInInput = exports.signUpInput = void 0;
const zod_1 = require("zod");
exports.signUpInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    firsstName: zod_1.z.string().min(3),
    lastName: zod_1.z.string().optional()
});
exports.signInInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.deleteUserInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.createPost = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
});
exports.updatePost = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
});
