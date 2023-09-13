import { collection, query, where, onSnapshot, doc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { fireStore } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';
import { useNavigate, useParams } from 'react-router-dom';

export default function Chats() {
  const { uid } = useAuthContext();
  const { dispatch } = useChatContext();
  const [chats, setChats] = useState<any>([]);
  const navigate = useNavigate();
  const params = useParams(); // test

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(fireStore, 'userChats', uid), (doc) => {
        const chatsData = Object.entries(doc.data()).filter((chat) => chat[1].id === params.id);
        setChats(chatsData);
      });

      return () => {
        unsub();
      };
    };
    uid && getChats();
  }, [uid, params.id]);

  const handleSelect = (user) => {
    dispatch({ type: 'CHANGE_USER', payload: user });
    navigate(`/chat/${params.id}`);
  };

  return (
    <div className='bg-slate-600'>
      {chats.map((chat: any) => (
        <div className='p-2.5 flex items-center gap-2.5 text-white cursor-pointer' key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
          <div className='w-10 h-10 rounded-full bg-avatar' />
          <div>
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
