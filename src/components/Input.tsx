import React, { useState } from 'react';
import { fireStore } from '../api/firebase';
import { Timestamp, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { useAuthContext } from '../context/AuthContext';
import { serverTimestamp } from 'firebase/database';
import { useChatContext } from '../context/ChatContext';

export default function Input() {
  const { user } = useAuthContext();
  const { data } = useChatContext();
  console.log(data);

  const [text, setText] = useState('');
  const handleSend = async () => {
    const res = await getDoc(doc(fireStore, 'chats', data.chatId));

    if (!res.data().messages.length) {
      await updateDoc(doc(fireStore, 'userChats', user.uid), {
        [data.chatId + '.userInfo']: {
          uid: data.user.uid,
          displayName: data.user.displayName,
        },
        [data.chatId + '.date']: serverTimestamp(),
      });
      await updateDoc(doc(fireStore, 'userChats', data.user.uid), {
        [data.chatId + '.userInfo']: {
          uid: user.uid,
          displayName: user.displayName,
        },
        [data.chatId + '.date']: serverTimestamp(),
      });
    }

    await updateDoc(doc(fireStore, 'chats', data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: user.uid,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(fireStore, 'userChats', user.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });

    await updateDoc(doc(fireStore, 'userChats', data.user.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });

    setText('');
  };

  return (
    <div className='h-10 bg-white p-3 flex items-center justify-between'>
      <input type='text' className='w-full border-none outline-none' onChange={(e) => setText(e.target.value)} value={text} />
      <div>
        <button className='border-none p-1 text-white bg-brand' onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}
