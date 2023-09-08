import React from 'react';

export default function Banner() {
  return (
    <section className='h-96 bg-yellow-900 relative'>
      <div className='w-full h-full bg-cover bg-banner' />
      <div className='absolute w-full top-32 text-center text-gray-50'>
        <h2 className='text-6xl'>Read with US</h2>
        <p className='text-2xl'>책을 저렴하게 구매하세요.</p>
      </div>
    </section>
  );
}
