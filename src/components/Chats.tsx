import { doc, onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { fireStore } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function Chats() {
  const { uid } = useAuthContext();
  const [chats, setChats] = useState<any>([]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(fireStore, 'userChats', uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    uid && getChats();
  }, [uid]);

  return (
    <div className='bg-slate-600'>
      {Object.entries(chats)?.map((chat: any) => (
        <div className='p-2.5 flex items-center gap-2.5 text-white cursor-pointer' key={chat[0]}>
          <div className='w-10 h-10 rounded-full bg-avatar' />
          <div>
            <span>{chat[1].displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
