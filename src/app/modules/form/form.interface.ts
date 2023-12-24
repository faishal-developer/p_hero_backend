export const FormFilterableFields = ['title', 'searchTerm'];
export const FormSearchableFields = ['title'];

export type IFormFilterableFields = {
  title?: string;
  searchTerm?: string;
};

export type IFormSearchableFields = {
  title?: string;
};

export type IOptions = {
  page?: number;
  size?: number;
  limit?: number;
  skip?: number;
  sortBy?: string;
  sortOrder?: string;
};
