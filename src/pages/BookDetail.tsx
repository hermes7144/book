import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';
import { getUser } from '../api/firebase';

export default function BookDetail() {
  const {
    state: {
      book: { id, uid, cover, title, priceStandard, price, quality, categoryName, description, tradeType },
      book,
    },
  } = useLocation();
  const { user } = useAuthContext();
  const { dispatch } = useChatContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function setUserInfo() {
      try {
        const res = await getUser(uid);
        const writer = res.data();

        dispatch({ type: 'CHANGE_USER', payload: { ...writer, id } });
      } catch (err) {
        console.log(err);
      }
    }
    setUserInfo();
  }, [dispatch, uid, id]);

  const handleClick = () => {
    if (uid === user.uid) {
      navigate(`/chats/${id}`);
    } else {
      navigate(`/chat/${id}`);
    }
  };
  return (
    <>
      <p className='mx-4 mt-4 text-gray-700'>{categoryName}</p>
      <section className='w-full p-4'>
        {/* <img className='w-full basis-7/12 px-4' src={cover} alt={title} /> */}
        <div className='flex flex-col'>
          <div className='w-full flex justify-center'>
            <img className='w-50 h-60 ' src={cover} alt={title} />
          </div>
          <h2 className='text-3xl font-bold py-2 border-gray-400'>{title}</h2>
          <div className='flex justify-between items-center border-b border-gray-400'>
            {tradeType === 'sale' ? <p className='text-2xl font-bold py-2'>₩{price}</p> : <p className='text-2xl font-bold py-2'>나눔</p>}
            <p className='mb-2 px-2 text-gray-600'>{quality}</p>
          </div>

          <p className='py-4 text-lg'>{description}</p>
          <Button text={'채팅하기'} onClick={handleClick} />
        </div>
      </section>
    </>
  );
}
