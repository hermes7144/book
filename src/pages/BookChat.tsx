import React, { useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { fireStore } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import Chat from '../components/Chat';
import { useChatContext } from '../context/ChatContext';

export default function BookChat() {
  const { user } = useAuthContext();
  const { data } = useChatContext();
  const params = useParams(); // test

  const combineId = params.id + (data.otherUser.uid > user.uid ? data.otherUser.uid + user.uid : user.uid + data.otherUser.uid);
  useEffect(() => {
    async function getChatInfo() {
      try {
        //  check whether the group(chats in firestore) exists, if not create
        const res = await getDoc(doc(fireStore, 'chats', combineId));

        // create a chat in chats collection
        if (!res.exists()) {
          await setDoc(doc(fireStore, 'chats', combineId), { messages: [] });
        }
      } catch (err) {
        console.log(err);
      }
    }
    getChatInfo();
  }, [combineId]);

  return <Chat />;
}
