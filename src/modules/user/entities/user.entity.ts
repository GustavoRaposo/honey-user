export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  city: string | null;
  estate: string | null;
  country: string | null;
  birthDate: Date | null;
  registeredWhen: Date;
  updatedWhen: Date;
}

export class UserResponse {
  id: string;
  name: string;
  email: string;
  city: string | null;
  estate: string | null;
  country: string | null;
  birthDate: Date | null;
  registeredWhen: Date;
  updatedWhen: Date;
}