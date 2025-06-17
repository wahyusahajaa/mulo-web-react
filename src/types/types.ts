export type Pagination = {
  total: number;
  page: number;
  page_size: number;
};

export type Image = {
  src: string;
  blur_hash: string;
};

export const Roles = {
  Member: "member",
  Admin: "admin",
} as const;

export type Role = keyof typeof Roles;

export type RoleValue = (typeof Roles)[Role];

export type PaginateResponse<T> = {
  data: T;
  pagination: Pagination;
};

export type User = {
  id: number;
  full_name: string;
  username: string;
  email: string;
  image: Image;
  role: RoleValue;
};

export type Artist = {
  id: number;
  name: string;
  image: Image;
  slug: string;
};
