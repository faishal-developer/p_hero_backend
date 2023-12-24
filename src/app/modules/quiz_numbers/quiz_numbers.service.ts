import { QuizeMarks, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';
import { Quiz_numberSearchableFields } from './quiz_numbers.constant';
import { IQuizMarksFilterableFields, IOptions } from './quiz_numbers.interface';

const createQuizMarks = async (data: QuizeMarks) => {
  const result = await prisma.quizeMarks.create({
    data,
  });

  return result;
};

const getQuizeMarkss = async (
  filters: IQuizMarksFilterableFields,
  options: IOptions
) => {
  options.limit = options?.size || 10;
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: Quiz_numberSearchableFields.map(field => ({
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

  const whereConditions: Prisma.QuizeMarksWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.quizeMarks.findMany({
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

  const total = await prisma.quizeMarks.count({
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

const getSingleQuizeMarks = async (id: string): Promise<QuizeMarks | null> => {
  const result = await prisma.quizeMarks.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateSingleQuizeMarks = async (
  id: string,
  data: Partial<QuizeMarks>
): Promise<QuizeMarks | null> => {
  const result = await prisma.quizeMarks.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteSingleQuizeMarks = async (id: string) => {
  await prisma.quizeMarks.delete({
    where: {
      id,
    },
  });

  return {};
};

export const QuizeMarksService = {
  getQuizeMarkss,
  createQuizMarks,
  getSingleQuizeMarks,
  updateSingleQuizeMarks,
  deleteSingleQuizeMarks,
};
