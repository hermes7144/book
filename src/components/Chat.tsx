import React from 'react';
import Messages from './Messages';
import Input from './Input';

export default function Chat() {
  return (
    <div className='flex flex-col w-full border border-gray-500'>
      <div className='h-12 bg-slate-500 flex items-center justify-between text-gray-100'></div>
      <Messages />
      <Input />
    </div>
  );
}
