import { Quiz, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';
import { QuizSearchableFields } from './quiz.constant';
import { IQuizFilterableFields, IOptions } from './quiz.interface';

const createQuizs = async (data: Quiz) => {
  const result = await prisma.quiz.create({
    data,
  });

  return result;
};

const getQuizs = async (filters: IQuizFilterableFields, options: IOptions) => {
  options.limit = options?.size || 10;
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: QuizSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        return {
          [key]: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            equals: (filterData as any)[key],
          },
        };
      }),
    });
  }

  const whereConditions: Prisma.QuizWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.quiz.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.quiz.count({
    where: whereConditions,
  });
  console.log(whereConditions['AND']);

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleQuiz = async (id: string): Promise<Quiz | null> => {
  const result = await prisma.quiz.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateSingleQuiz = async (
  id: string,
  data: Partial<Quiz>
): Promise<Quiz | null> => {
  const result = await prisma.quiz.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteSingleQuiz = async (id: string) => {
  await prisma.quiz.delete({
    where: {
      id,
    },
  });

  return {};
};

export const QuizService = {
  getQuizs,
  createQuizs,
  getSingleQuiz,
  updateSingleQuiz,
  deleteSingleQuiz,
};
