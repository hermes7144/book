import React from 'react';

import BookCard from '../components/BookCard';
import useBooks from '../hooks/useBooks';

export default function Books() {
  const {
    booksQuery: { isLoading, data: books },
  } = useBooks();

  return (
    <>
      {isLoading && <p>Loading...</p>}
      <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>{books && books.map((book: any) => <BookCard key={book.id} book={book} />)}</ul>
    </>
  );
}
