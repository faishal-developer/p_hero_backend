import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getUsers = async () => {
  const result = await prisma.user.findMany({});

  return result;
};

const getSingleUser = async (id: string): Promise<User | null> => {
  const result = prisma.user.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateSingleUser = async (
  id: string,
  data: Partial<User>
): Promise<User | null> => {
  const result = prisma.user.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteSingleUser = async (id: string): Promise<User | null> => {
  const result = prisma.user.delete({
    where: {
      id,
    },
  });

  return result;
};

export const userService = {
  getUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
