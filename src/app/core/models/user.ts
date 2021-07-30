export interface UserDto {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone?: string;
}

export interface UserLoginDto {
  name: string;
  password: string;
}
