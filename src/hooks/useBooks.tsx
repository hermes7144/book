import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBooks as fetchBooks, addNewBook } from '../api/firebase';

export default function useBooks() {
  const queryClient = useQueryClient();

  const booksQuery = useQuery(['books'], fetchBooks, { staleTime: 5000 * 60 });

  const addBook = useMutation((book: any) => addNewBook(book), {
    onSuccess: () => queryClient.invalidateQueries(['books']),
  });

  return { booksQuery, addBook };
}
