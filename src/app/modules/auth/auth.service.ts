import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  generateAccessToken,
  generateRefreashToken,
} from '../../../shared/helper';
import prisma from '../../../shared/prisma';

const signUp = async (data: User): Promise<User | null> => {
  const result = await prisma.user.create({ data });

  return result;
};

const login = async (data: Partial<User>) => {
  const { email, password } = data;
  const isUserExist = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  console.log(isUserExist);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wrong user or password ');
  }

  const passwordMatched = await bcrypt.compare(
    password as string,
    isUserExist.password as string
  );
  if (!passwordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const response: Partial<User> = {
    email: isUserExist.email,
    role: isUserExist.role,
    id: isUserExist.id,
  };

  const accessToken = generateAccessToken(response);
  const refreshToken = generateRefreashToken(response);

  return {
    accessToken,
    refreshToken,
    user: response,
  };
};

export const authService = {
  signUp,
  login,
};
