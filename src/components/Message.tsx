import React, { useRef, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';

export default function Message({ message: { id, text, senderId } }: any) {
  const { uid } = useAuthContext();

  const ref = useRef<any>();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div ref={ref} className={`flex gap-4 ${senderId === uid ? 'flex-row-reverse' : ''}`}>
      <div>{senderId !== uid && <img className='w-10 h-10 rounded-full object-cover' src='' alt='' />}</div>
      <div className='max-w-[80px]'>
        <p className='bg-white p-2 m-2' style={{ borderRadius: '0 10px 10px 10px' }}>
          {text}
        </p>
      </div>
    </div>
  );
}
