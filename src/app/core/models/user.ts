export interface UserDto {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone?: string;
  token?: string;
}

export interface UserLoginDto {
  name: string;
  password: string;
}
