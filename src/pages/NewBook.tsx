import React, { useState } from 'react';
import Button from '../components/ui/Button';
import axios from 'axios';
import { addNewBook, getNeighborhood } from '../api/firebase';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type BookListProps = {
  title: string;
  author: number;
  priceStandard: number;
  publisher: string;
  cover: string;
};

const options = [
  { value: 'B', descrption: '최상' },
  { value: 'H', descrption: '상' },
  { value: 'M', descrption: '중' },
  { value: 'L', descrption: '하' },
];

const initialProps = { title: '', category: '', description: '', options: '', url: '', price: '' };

export default function NewBook() {
  const { user } = useAuthContext();

  const [search, setSearch] = useState('');
  const [bookList, setBookList] = useState<BookListProps[]>([]);
  const [quality, setQuality] = useState('');
  const [book, setBook] = useState<any>(initialProps);
  const [isUploading, setIsUploading] = useState(false);
  const [isSale, setIsSale] = useState(true);
  const [isGiveaway, setIsGiveaway] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const queryClient = useQueryClient();
  const addBook = useMutation((book: any) => addNewBook(book), {
    onSuccess: () => queryClient.invalidateQueries(['books']),
  });

  const navigate = useNavigate();

  const handleBook = (e: any) => {
    setSearch(e.target.value);
  };

  const handleOnKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    if (!search) return;
    try {
      const res = await axios.get(`/itemSearch?Query=${search}&start=1&MaxResults=5&${process.env.REACT_APP_ALADIN_ITEM_SEARCH}`);
      const item = res.data.item;
      if (item.length === 0) {
        alert('검색결과가 없습니다!');
        return;
      }

      if (item.length > 0) {
        setBookList(item);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle the error here
    }
  };

  const selectBook = (book: BookListProps) => {
    setSearch('');
    setQuality('');
    setBookList([]);
    setBook({ ...book, price: '', description: '', neighborhood: '' });
  };

  const giveawayForm = (isGiveaway: boolean) => {
    if (isGiveaway) {
      setBook((book: any) => ({ ...book, price: 0 }));
      setIsDisabled(true);
    } else {
      setBook((book: any) => ({ ...book, price: '' }));
      setIsDisabled(false);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setBook((book: any) => ({ ...book, [name]: value }));
  };

  const handleSelect = (e: any) => setQuality(e.target.value);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsUploading(true);

    const tradeType = isSale ? 'sale' : 'giveaway';

    const neighborhood = await getNeighborhood(user);

    addBook.mutate(
      { ...book, quality, tradeType, neighborhood, uid: user.uid },
      {
        onSuccess: (res) => {
          navigate(`/`);
        },
      }
    );

    setIsUploading(false);
  };

  return (
    <section className='w-full text-center'>
      <h2 className='text-2xl font-bold my-1'>새로운 책 등록</h2>
      <div className='flex p-2'>
        <input
          className='my-0 flex-1 mr-2'
          type='text'
          name='book'
          value={search}
          onChange={handleBook}
          onKeyDown={handleOnKeyPress} // Enter 입력 이벤트 함수
        />
        <Button text={'책 검색하기'} onClick={handleSearch} />
      </div>
      {bookList.length > 0 &&
        bookList.map((book) => {
          return (
            <div className='flex my-2 border border-gray-200' key={book.title}>
              <img className='w-24 h-32' src={book?.cover} alt={book?.title} />
              <section className='text-left flex-grow ml-3'>
                <article>{book?.title}</article>
                <article>{book?.author}</article>
                <article>{book?.publisher}</article>
                <article>{book?.priceStandard}</article>
              </section>
              <Button text={'선택'} onClick={() => selectBook(book)} />
            </div>
          );
        })}
      <br />

      <form className='flex flex-col px-12' onSubmit={handleSubmit}>
        {book.cover && (
          <div className='w-full flex justify-center'>
            <img className='w-50 h-60 ' src={book.cover} alt={book.title} />
          </div>
        )}
        <label className='text-brand font-bold text-left '>제목</label>
        <input type='text' className='bg-gray-100' value={book.title} readOnly />
        <label className='text-brand font-bold text-left '>출판사</label>
        <input type='text' className='bg-gray-100' value={book.publisher} readOnly />
        <label className='text-brand font-bold text-left '>정가</label>
        <input type='number' className='bg-gray-100' value={book.priceStandard} readOnly />

        <label className='text-brand font-bold text-left pt-5 border-t border-gray-200 active '>거래 방식</label>
        <div className='flex my-2 gap-2'>
          <button
            type='button'
            onClick={() => {
              setIsSale(true);
              setIsGiveaway(false);
              giveawayForm(false);
            }}
            className={`py-2.5 px-5 text-sm font-bold focus:loutline-none rounded-full border border-gray-200 hover:bg-gray-100  ${isSale ? 'bg-brand text-white hover:bg-brand' : 'bg-white text-gray-900'}`}>
            판매하기
          </button>
          <button
            type='button'
            onClick={() => {
              setIsSale(false);
              setIsGiveaway(true);
              giveawayForm(true);
            }}
            className={`py-2.5 px-5 text-sm font-bold focus:loutline-none  rounded-full border border-gray-200 hover:bg-gray-100  ${isGiveaway ? 'bg-brand text-white hover:bg-brand' : 'bg-white text-gray-900'}`}>
            나눔하기
          </button>
        </div>

        <label className='text-brand font-bold text-left' htmlFor='quality'>
          품질
        </label>
        <select className=' border border-gray-300 my-2 p-2.5 rounded-lg block w-full ' onChange={handleSelect} value={quality} required>
          <option value=''>-선택-</option>
          {options && options.map((option) => <option key={option.value}>{option.descrption}</option>)}
        </select>
        <label className='text-brand font-bold text-left' htmlFor='price'>
          판매가
        </label>
        <div className='relative mb-6'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none'>￦</div>
          <input type='number' id='price' name='price' className='border border-gray-300 focus:border-2 focus:border-gray-900 rounded-lg block w-full pl-10 p-2.5' value={book.price} onChange={handleChange} disabled={isDisabled} placeholder='가격을 입력해주세요.' required />
        </div>

        <label className='text-brand font-bold text-left' htmlFor='description'>
          자세한 설명
        </label>
        <textarea id='description' name='description' rows={4} className='block w-full px-0 text-gray-800 bg-white border border-gray-200 mb-2 resize-none' placeholder='신뢰할 수 있는 거래를 위해 자세히 적어주세요.' value={book.description} onChange={handleChange} required></textarea>

        <Button text={isUploading ? '업로드 중...' : '제품 등록하기'} disabled={isUploading} />
      </form>
    </section>
  );
}
