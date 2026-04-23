import { reactive, ref, computed } from 'vue';

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  createdAt: number;
}

export const books = ref<Book[]>([
  {
    id: '1',
    title: 'Don Quijote de la Mancha',
    author: 'Miguel de Cervantes',
    category: 'Clásico',
    description: 'Una de las obras cumbre de la literatura española y universal.',
    createdAt: Date.now()
  },
  {
    id: '2',
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    category: 'Realismo Mágico',
    description: 'La historia de la familia Buendía en el pueblo ficticio de Macondo.',
    createdAt: Date.now() - 100000
  }
]);

export function addBook(book: Omit<Book, 'id' | 'createdAt'>) {
  const newBook: Book = {
    ...book,
    id: crypto.randomUUID(),
    createdAt: Date.now()
  };
  books.value.push(newBook);
}

export function deleteBook(id: string) {
  books.value = books.value.filter(b => b.id !== id);
}

export function getBookById(id: string) {
  return books.value.find(b => b.id === id);
}
