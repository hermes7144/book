import React from 'react';
import { useNavigate } from 'react-router-dom';
import DateDifference from './ui/DateDifference';

export default function BookCard({ book, book: { id, cover, title, priceStandard, price, quality, tradeType, neighborhood, createdDate } }: any) {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        navigate(`/books/${id}`, { state: { book } });
      }}
      className='rounded-lg shadow-md cursor-pointer flex'>
      <img className='w-full max-w-[80px] h-[130px]' src={cover} alt={title} />
      <div className='mt-2 px-2 text-lg overflow-hidden w-full flex flex-col justify-between'>
        <h3 className='line-clamp-2'>{title}</h3>
        <div>
          <span className='text-gray-400 text-sm'>
            {neighborhood}
            ˑ<DateDifference date={createdDate} />
          </span>

          <div className='flex justify-between'>
            {tradeType === 'sale' ? <p>₩{price}</p> : '나눔'}
            <p className='mb-2 px-2 text-gray-600'>{quality}</p>
          </div>
        </div>
      </div>
    </li>
  );
}
