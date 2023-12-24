"use strict";
// import { z } from 'zod';
// import { quizType, types } from '../quiz/quiz.zod';
// const create = z.object({
//   body: z.object({
//     title: z.string({
//       required_error: 'title is required',
//     }),
//     quizes: z.array({
//       type: z.enum([...types] as [string, ...string[]], {
//         required_error: 'title is required',
//       }),
//       options: z.string({
//         required_error: 'options is required',
//       }),
//       title: z.string({
//         required_error: 'title is required',
//       }),
//       description: z.string({
//         required_error: 'description is required',
//       }),
//       marks: z.number({
//         required_error: 'marks is required',
//       }),
//       ans: z.string({
//         required_error: 'ans is required',
//       }),
//       image: z.string().optional(),
//     }),
//   }),
// });
// const update = z.object({
//   body: z.object({
//   }),
// });
// export const FormZodSchema = {
//   create,
//   update,
// };
