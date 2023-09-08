import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function BookCard({ book, book: { id, cover, title, priceStandard, priceSales, quality } }: any) {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        navigate(`/books/${id}`, { state: { book } });
      }}
      className='rounded-lg shadow-md overflow-hidden cursor-pointer flex'>
      <img className='w-full max-w-[80px] h-[130px]' src={cover} alt={title} />
      <div className='mt-2 px-2 text-lg justify-between items-center'>
        <h3 className='truncate'>{title}</h3>
        <p>₩{priceSales}</p>
        <p className='mb-2 px-2 text-gray-600'>{quality}</p>
      </div>
    </li>
  );
}
