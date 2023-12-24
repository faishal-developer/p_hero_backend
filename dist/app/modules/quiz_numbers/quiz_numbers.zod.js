"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizMarksZodSchema = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        user_id: zod_1.z.string({
            required_error: 'user_id is required',
        }),
        form_id: zod_1.z.string({
            required_error: 'quiz_id is required',
        }),
        number: zod_1.z.number({
            required_error: 'number is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        user_id: zod_1.z.string().optional(),
        form_id: zod_1.z.string().optional(),
    }),
});
exports.QuizMarksZodSchema = {
    create,
    update,
};
