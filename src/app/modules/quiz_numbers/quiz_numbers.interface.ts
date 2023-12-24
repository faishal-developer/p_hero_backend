/* eslint-disable @typescript-eslint/ban-types */
export type IQuizMarksFilterableFields = {
  searchTerm?: string;
  user_id?: string;
  quiz_id?: string;
};

export type IQuizMarksSearchableFields = {};

export type IOptions = {
  page?: number;
  size?: number;
  limit?: number;
  skip?: number;
  sortBy?: string;
  sortOrder?: string;
};
