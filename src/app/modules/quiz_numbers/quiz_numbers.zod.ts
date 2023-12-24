import { z } from 'zod';

const create = z.object({
  body: z.object({
    user_id: z.string({
      required_error: 'user_id is required',
    }),
    form_id: z.string({
      required_error: 'quiz_id is required',
    }),
    number: z.number({
      required_error: 'number is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    user_id: z.string().optional(),
    form_id: z.string().optional(),
  }),
});

export const QuizMarksZodSchema = {
  create,
  update,
};
