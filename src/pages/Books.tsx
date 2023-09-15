import React from 'react';

import BookCard from '../components/BookCard';
import useBooks from '../hooks/useBooks';
import { useLocation } from 'react-router-dom';

export default function Books() {
  const {
    booksQuery: { isLoading, data: books },
  } = useBooks();

  const { state } = useLocation();
  const status = state?.status === 'success' || null; // state가 없을 경우 null로 설정

  return (
    <>
      {status && '동네 인증에 성공하셨습니다.'}
      {isLoading && <p>Loading...</p>}
      <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>{books && books.map((book: any) => <BookCard key={book.id} book={book} />)}</ul>
    </>
  );
}
