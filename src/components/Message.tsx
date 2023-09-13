import React, { useRef, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';

export default function Message({ message: { text, senderId } }: any) {
  const { uid } = useAuthContext();

  const ref = useRef<any>();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div ref={ref} className={`flex p-4 ${senderId === uid ? 'flex-row-reverse' : ''}`}>
      <div>{senderId !== uid && <div className='w-10 h-10 rounded-full object-cover bg-avatar' />}</div>
      <div className='max-w-3/4'>
        <p className='bg-white p-2 m-2' style={{ borderRadius: '0 10px 10px 10px' }}>
          {text}
        </p>
      </div>
    </div>
  );
}
