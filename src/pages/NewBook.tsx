import React, { useState } from 'react';
import Button from '../components/ui/Button';
import axios from 'axios';
import { addNewProduct } from '../api/firebase';

type BookListProps = {
  title: string;
  author: number;
  priceStandard: number;
  publisher: string;
  cover: string;
};

type BookProps = {
  title: string;
  priceStandard: number;
  category: string;
  description: string;
  options: string;
  url: string;
};

type NewBookProps = {
  title: string;
  price?: number;
  priceStandard?: number;
  category: string;
  description: string;
  options: string;
  url: string;
};

const options = [
  { value: 'B', descrption: '최상' },
  { value: 'H', descrption: '상' },
  { value: 'M', descrption: '중' },
  { value: 'L', descrption: '하' },
];

const initialProps = { title: '', category: '', description: '', options: '', url: '', price: '', quantity: '' };

export default function NewBook() {
  const [search, setSearch] = useState('');
  const [bookList, setBookList] = useState<BookListProps[]>([]);
  const [selected, setSelected] = useState();

  const [product, setProduct] = useState<any>(initialProps);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState<string | null>('');

  const handleBook = (e: any) => {
    setSearch(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(`/itemSearch?&Query=${search}&start=1&MaxResults=5&${process.env.REACT_APP_ALADIN_ITEM_SEARCH}`);
      const item = res.data.item;
      setBookList(item);
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle the error here
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setProduct((product: any) => ({ ...product, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsUploading(true);
    addNewProduct({ ...product, quality: selected }).then(() => {
      setSuccess('성공적으로 제품이 추가되었습니다.');
      setTimeout(() => {
        setSuccess(null);
      }, 4000);
    });
    setIsUploading(false);
  };

  const selectBook = (book: BookListProps) => {
    setSearch('');
    setBookList([]);
    setProduct({ ...book, price: '', quantity: 1, description: '', neighborhood: '' });
  };

  const handleSelect = (e: any) => setSelected(e.target.value);

  return (
    <section className='w-full text-center'>
      {/* <h2 className='text-2xl font-bold my-4'>새로운 책 등록</h2> */}
      {success && <p>🍬 {success}</p>}
      <div className='flex px-12 my-3'>
        <input className='my-0 flex-1 mr-2' type='text' name='book' value={search} onChange={handleBook} />
        <Button text={'책 검색하기'} onClick={handleSearch} />
      </div>
      {bookList.length > 0 &&
        bookList.map((book) => {
          return (
            <section className='flex'>
              <img className='w-32 h-32' src={book?.cover} alt={book?.title} />
              <section>
                <article>{book?.title}</article>
                <article>{book?.author}</article>
                <article>{book?.priceStandard}</article>
                <article>{book?.publisher}</article>
              </section>
              <Button text={'선택'} onClick={() => selectBook(book)} />
            </section>
          );
        })}

      {product.cover && (
        <div className='px-12'>
          <img className='w-32 h-40' src={product.cover} alt={product.title} />
        </div>
      )}
      <form className='flex flex-col px-12' onSubmit={handleSubmit}>
        <label className='text-brand font-bold text-left '>제목</label>
        <input type='text' className='bg-gray-100 focus:outline-none focus:border-blue-400' value={product.title} placeholder='책' readOnly />
        <label className='text-brand font-bold text-left '>출판사</label>
        <input type='text' className='flex-1 bg-gray-100 focus:outline-none focus:border-blue-400' value={product.publisher} placeholder='출판사' readOnly />
        <label className='text-brand font-bold text-left '>정가</label>
        <input type='number' className='bg-gray-100 focus:outline-none focus:border-blue-400' name='priceStandard' value={product.priceStandard} placeholder='원가격' readOnly />
        <label className='text-brand font-bold text-left ' htmlFor='price'>
          판매가
        </label>
        <input type='number' id='price' name='price' value={product.price} placeholder='판매가격' onChange={handleChange} />
        <label className='text-brand font-bold text-left ' htmlFor='quality'>
          품질
        </label>
        <select className='p-2 border border-gray-300 outline-none mb-2' onChange={handleSelect} value={selected}>
          <option value=''>-선택-</option>
          {options && options.map((option) => <option key={option.value}>{option.descrption}</option>)}
        </select>
        <label className='text-brand font-bold text-left' htmlFor='quantity'>
          수량
        </label>
        <input type='number' name='quantity' id='quantity' value={product.quantity} placeholder='수량' onChange={handleChange} />
        <label className='text-brand font-bold text-left' htmlFor='description'>
          자세한 설명
        </label>
        <input type='text' name='description' value={product.description} placeholder='자세한 설명' onChange={handleChange} />
        <label className='text-brand font-bold text-left' htmlFor='description'>
          동네
        </label>
        <input type='text' name='neighborhood' value={product.neighborhood} placeholder='동네' onChange={handleChange} />
        <Button text={isUploading ? '업로드 중...' : '제품 등록하기'} disabled={isUploading} />
      </form>
    </section>
  );
}
