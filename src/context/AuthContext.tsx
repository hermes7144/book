import { createContext, useContext } from 'react';
import { User } from '@firebase/auth';

type UserType = {
  user: User | null;
  login: (provider: string) => {};
  logout: () => void;
};

export const AuthContext = createContext<any | null>(null);

export function useAuthContext() {
  return useContext(AuthContext);
}
