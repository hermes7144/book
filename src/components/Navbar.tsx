import React from 'react';
import { Link } from 'react-router-dom';
import { FiBook } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';
import User from './User';
import { useAuthContext } from '../context/AuthContext';
import Button from './ui/Button';

export default function Navbar() {
  const { user, login, logout } = useAuthContext();

  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <nav className='flex items-end gap-4 font-semibold'>
        <Link to='/' className='flex items-center text-4xl text-brand'>
          <FiBook />
          <h1>Levity Book</h1>
        </Link>
        <Link to='/neighborhood'>{user ? (user?.neighborhood ? user.neighborhood : '동네 인증') : ''}</Link>
      </nav>
      <nav className='flex items-center gap-4 font-semibold'>
        {user && (
          <Link to='/books/new' className='text-2xl'>
            <BsFillPencilFill />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <Button text={'Login'} onClick={login} />}
        {user && <Button text={'Logout'} onClick={logout} />}
      </nav>
    </header>
  );
}
