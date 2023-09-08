import React from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function BookDetail() {
  const {
    state: {
      book: { id, cover, title, priceStandard, priceSales, quality, categoryName, description },
    },
  } = useLocation();

  const handleClick = () => {};
  return (
    <>
      <p className='mx-12 mt-4 text-gray-700'>{categoryName}</p>
      <section className='flex flex-col md:flex-row p-4'>
        <img className='w-full basis-7/12 px-4' src={cover} alt={title} />
        <div className='w-full basis-5/12 flex flex-col'>
          <h2 className='text-3xl font-bold py-2 border-gray-400'>{title}</h2>
          <p className='text-2xl font-bold py-2 border-b border-gray-400'>₩{priceSales}</p>
          <p className='py-4 text-lg'>{description}</p>
          <p className='mb-2 px-2 text-gray-600'>{quality}</p>
          <Button text={'채팅하기'} onClick={handleClick} />
        </div>
      </section>
    </>
  );
}
