export type IQuizFilterableFields = {
  type?: string;
  options?: string;
  title?: string;
  searchTerm?: string;
  description?: string;
  ans?: string;
};

export type IQuizSearchableFields = {
  title?: string;
  description?: string;
  ans?: string;
};

export type IOptions = {
  page?: number;
  size?: number;
  limit?: number;
  skip?: number;
  sortBy?: string;
  sortOrder?: string;
};
