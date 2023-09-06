import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBook } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';
import { login, logout, onUserStateChange } from '../api/firebase';
import User from './User';
import Button from './ui/button';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    onUserStateChange((user: any) => {
      console.log(user);

      setUser(user);
    });
  }, []);

  const handleLogin = () => {
    login().then(setUser);
  };
  const handleLogout = () => {
    logout().then(setUser);
  };

  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link to='/' className='flex items-center text-4xl text-brand'>
        <FiBook />
        <h1>Levity Book</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/books'>Books</Link>
        {user && user.isAdmin && (
          <Link to='/books/new' className='text-2xl'>
            <BsFillPencilFill />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <Button text={'Login'} onClick={handleLogin} />}
        {user && <Button text={'Logout'} onClick={handleLogout} />}
      </nav>
    </header>
  );
}
