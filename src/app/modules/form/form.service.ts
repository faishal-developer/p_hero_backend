import { Form, Prisma, Quiz } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';
import {
  FormSearchableFields,
  IFormFilterableFields,
  IOptions,
} from './form.interface';

const createForm = async (data: { title: string; quizes: Quiz[] }) => {
  const result = await prisma.form.create({
    data: { title: data.title },
  });

  await prisma.quiz.createMany({
    data: data.quizes.map(item => {
      item.form_id = result.id;
      return item;
    }),
  });
  return result;
};

const getForms = async (filters: IFormFilterableFields, options: IOptions) => {
  options.limit = options?.size || 10;
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: FormSearchableFields.map(field => ({
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

  const whereConditions: Prisma.FormWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.form.findMany({
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

  const total = await prisma.form.count({
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

const getSingleForm = async (id: string): Promise<Form | null> => {
  const result = await prisma.form.findUnique({
    where: {
      id,
    },
    include: {
      Quiz: true,
    },
  });

  return result;
};

const updateSingleForm = async (
  id: string,
  data: { title: string; quizes: Quiz[] }
): Promise<Form | null> => {
  const updatedForm = await prisma.form.update({
    where: { id: id },
    data: { title: data.title },
  });

  await prisma.quiz.updateMany({
    where: { form_id: id },
    data: data.quizes.map(quiz => ({
      where: { id: quiz.id },
      data: {
        title: quiz.title,
        options: quiz.options,
        type: quiz.type,
        marks: quiz.marks,
        description: quiz.description,
        ans: quiz.ans,
        image: quiz.image,
      },
    })),
  });

  return updatedForm;
};

const deleteSingleForm = async (id: string) => {
  await prisma.form.delete({
    where: {
      id,
    },
  });

  return {};
};

export const FormService = {
  getForms,
  createForm,
  getSingleForm,
  updateSingleForm,
  deleteSingleForm,
};
