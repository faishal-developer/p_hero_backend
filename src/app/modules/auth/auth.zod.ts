import { z } from 'zod';
import { userRoles } from './auth.constant';

const create = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    role: z.enum([...userRoles] as [string, ...string[]], {
      required_error: 'Role is required',
    }),
  }),
});
const login = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    role: z.enum([...userRoles] as [string, ...string[]]).optional(),
  }),
});

export const authZodSchema = {
  create,
  login,
  update,
};
