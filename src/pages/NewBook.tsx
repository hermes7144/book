import React, { useState } from 'react';
import Button from '../components/ui/Button';
import axios from 'axios';
import { addNewProduct, getNeighborhood } from '../api/firebase';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

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

const initialProps = { title: '', category: '', description: '', options: '', url: '', price: '', quantity: '' };

export default function NewBook() {
  const { user } = useAuthContext();

  const [search, setSearch] = useState('');
  const [bookList, setBookList] = useState<BookListProps[]>([]);
  const [quality, setQuality] = useState('');
  const [product, setProduct] = useState<any>(initialProps);
  const [isUploading, setIsUploading] = useState(false);

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
      const res = await axios.get(`/itemSearch?&Query=${search}&start=1&MaxResults=5&${process.env.REACT_APP_ALADIN_ITEM_SEARCH}`);
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

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setProduct((product: any) => ({ ...product, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsUploading(true);

    const neighborhood = await getNeighborhood(user);
    console.log({ ...product, quality, neighborhood });

    addNewProduct({ ...product, quality, neighborhood }).then(() => {
      navigate(`/`);
    });

    setIsUploading(false);
  };

  const selectBook = (book: BookListProps) => {
    setSearch('');
    setQuality('');
    setBookList([]);
    setProduct({ ...book, price: '', quantity: 1, description: '', neighborhood: '' });
  };

  const handleSelect = (e: any) => setQuality(e.target.value);

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
        {product.cover && (
          <div className='w-full flex justify-center'>
            <img className='w-50 h-60 ' src={product.cover} alt={product.title} />
          </div>
        )}
        <label className='text-brand font-bold text-left '>제목</label>
        <input type='text' className='bg-gray-100 focus:outline-none focus:border-blue-400' value={product.title} placeholder='책' readOnly />
        <label className='text-brand font-bold text-left '>출판사</label>
        <input type='text' className='flex-1 bg-gray-100 focus:outline-none focus:border-blue-400' value={product.publisher} placeholder='출판사' readOnly />
        <label className='text-brand font-bold text-left '>정가</label>
        <input type='number' className='bg-gray-100 focus:outline-none focus:border-blue-400' name='priceStandard' value={product.priceStandard} placeholder='원가격' readOnly />
        <label className='text-brand font-bold text-left ' htmlFor='price'>
          판매가
        </label>
        <input type='number' id='price' name='price' value={product.price} placeholder='판매가격' onChange={handleChange} required />
        <label className='text-brand font-bold text-left ' htmlFor='quality'>
          품질
        </label>
        <select className='p-2 border border-gray-300 outline-none mb-2' onChange={handleSelect} value={quality} required>
          <option value=''>-선택-</option>
          {options && options.map((option) => <option key={option.value}>{option.descrption}</option>)}
        </select>
        <label className='text-brand font-bold text-left' htmlFor='quantity'>
          수량
        </label>
        <input type='number' name='quantity' id='quantity' value={product.quantity} placeholder='수량' onChange={handleChange} required />
        <label className='text-brand font-bold text-left' htmlFor='description'>
          자세한 설명
        </label>
        <input type='text' name='description' value={product.description} placeholder='자세한 설명' onChange={handleChange} />
        <Button text={isUploading ? '업로드 중...' : '제품 등록하기'} disabled={isUploading} />
      </form>
    </section>
  );
}
