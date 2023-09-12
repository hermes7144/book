import React from 'react';
import { useEffect, useState } from 'react';
import { login, logout, onUserStateChange } from '../api/firebase';

import { User } from '@firebase/auth';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onUserStateChange((user: User) => {
      setUser(user);
      navigate('/');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AuthContext.Provider value={{ user, uid: user && user.uid, login, logout }}>{children}</AuthContext.Provider>;
}
