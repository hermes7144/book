import React, { useState } from 'react';
import Button from '../components/ui/Button';
import axios from 'axios';

type NewBookProps = {
  title: string;
  price: string;
  category: string;
  description: string;
  options: string;
  url: string;
};

const initialProps = { title: '', price: '', category: '', description: '', options: '', url: '' };

export default function NewBook() {
  const [book, setBook] = useState('');

  const [product, setProduct] = useState<NewBookProps>(initialProps);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleBook = (e: any) => {
    setBook(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(`/itemSearch?&Query=${book}&MaxResults=10&${process.env.REACT_APP_ALADIN_ITEM_SEARCH}`);
      console.log(res.data); // Use res.data to access the response data
      // Do something with the response data here
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle the error here
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setProduct((product) => ({ ...product, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (e.target.innerText) {
      console.log(e.target.innerText);
    } else {
      setIsUploading(true);
    }
  };

  return (
    <section className='w-full text-center'>
      {product.url && <img src={product.url} alt='local file' />}
      {/* <h2 className='text-2xl font-bold my-4'>새로운 책 등록</h2> */}
      {success && <p>🍬 {success}</p>}
      <div className='flex flex-col px-12'>
        <input type='text' name='book' value={book ?? ''} placeholder='책' onChange={handleBook} />
        <Button text={'검색'} onClick={handleSearch}></Button>
      </div>
      <form className='flex flex-col px-12' onSubmit={handleSubmit}>
        <input type='text' name='title' value={product.title ?? ''} placeholder='책' onChange={handleChange} />
        <input type='number' name='price' value={product.price ?? ''} placeholder='가격' onChange={handleChange} />
        <input type='text' name='category' value={product.category ?? ''} placeholder='카테고리' onChange={handleChange} />
        <input type='text' name='description' value={product.description ?? ''} placeholder='책 설명' onChange={handleChange} />
        <input type='text' name='options' value={product.options ?? ''} placeholder='책 상태' onChange={handleChange} />
        <Button text={isUploading ? '업로드 중...' : '제품 등록하기'} disabled={isUploading}></Button>
      </form>
    </section>
  );
}
