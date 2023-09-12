import React from 'react';
import { getBooks } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import BookCard from '../components/BookCard';
import { useAuthContext } from '../context/AuthContext';

export default function Books() {
  const { isLoading, error, data: books } = useQuery(['books'], getBooks, { staleTime: 1000 * 60 });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {/* {error && <p>{error}</p>} */}
      <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>{books && books.map((book: any) => <BookCard key={book.id} book={book} />)}</ul>
    </>
  );
}
