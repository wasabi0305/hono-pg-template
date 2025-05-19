export interface UserCreateInput {
  email: string;
  name: string;
}

export interface UserUpdateInput {
  email?: string;
  name?: string;
}
