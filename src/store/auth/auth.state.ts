import { Employee, User } from 'models';

export type AuthState = {
  loading: boolean;
  currentUser?: User;
  currentEmployee?: Employee;
}

export const initialState: AuthState = {
  loading: true
};
