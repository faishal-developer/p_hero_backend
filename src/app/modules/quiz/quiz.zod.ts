import { z } from 'zod';

export const types = ['radio', 'checkbox'];

export const quizType = {
  type: z.enum([...types] as [string, ...string[]], {
    required_error: 'title is required',
  }),
  options: z.string({
    required_error: 'options is required',
  }),
  title: z.string({
    required_error: 'title is required',
  }),
  description: z.string({
    required_error: 'description is required',
  }),
  marks: z.number({
    required_error: 'marks is required',
  }),
  ans: z.string({
    required_error: 'ans is required',
  }),
  image: z.string().optional(),
};

const create = z.object({
  body: z.object({
    ...quizType,
  }),
});

const update = z.object({
  body: z.object({
    type: z.string().optional(),
    options: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    marks: z.number().optional(),
    ans: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const QuizZodSchema = {
  create,
  update,
};
