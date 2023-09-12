import React, { useEffect } from 'react';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { fireStore } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import Chat from '../components/Chat';

export default function BookChat() {
  const {
    state: {
      // book: { id, uid, cover, title, priceStandard, price, quality, categoryName, description, tradeType },
      book,
    },
  } = useLocation();
  const { user } = useAuthContext();

  const combineId = book.id + (book.uid > user.uid ? book.uid + user.uid : user.uid + book.uid);
  useEffect(() => {
    async function getChatInfo() {
      try {
        //  check whether the group(chats in firestore) exists, if not create
        const res = await getDoc(doc(fireStore, 'chats', combineId));

        // create a chat in chats collection
        if (!res.exists()) {
          await setDoc(doc(fireStore, 'chats', combineId), { messages: [] });

          // await updateDoc(doc(fireStore, 'userChats', combineId), {});
        }
      } catch (err) {
        console.log(err);
      }
    }
    getChatInfo();
  }, [combineId]);

  return <Chat chatId={combineId} bookUid={book.uid} />;
}
