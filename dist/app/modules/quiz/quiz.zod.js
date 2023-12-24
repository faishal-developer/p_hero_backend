"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizZodSchema = exports.quizType = exports.types = void 0;
const zod_1 = require("zod");
exports.types = ['radio', 'checkbox'];
exports.quizType = {
    type: zod_1.z.enum([...exports.types], {
        required_error: 'title is required',
    }),
    options: zod_1.z.string({
        required_error: 'options is required',
    }),
    title: zod_1.z.string({
        required_error: 'title is required',
    }),
    description: zod_1.z.string({
        required_error: 'description is required',
    }),
    marks: zod_1.z.number({
        required_error: 'marks is required',
    }),
    ans: zod_1.z.string({
        required_error: 'ans is required',
    }),
    image: zod_1.z.string().optional(),
};
const create = zod_1.z.object({
    body: zod_1.z.object(Object.assign({}, exports.quizType)),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        type: zod_1.z.string().optional(),
        options: zod_1.z.string().optional(),
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        marks: zod_1.z.number().optional(),
        ans: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
    }),
});
exports.QuizZodSchema = {
    create,
    update,
};
