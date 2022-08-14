import { For } from 'solid-js';
import { Book } from './App';

interface BookListProps {
    books: Book[];
  }

export function BookList (props: BookListProps) {

  const totalBooks = () => props.books.length;

  return (
    <ul>
        <h2>My books: ({totalBooks()})</h2>
      <For each={props.books}>
        {(book: Book) => {
          return (
            <li>
            {book.title}
             <span style={{ "font-style": "italic" }}> ({book.author})</span>
            </li>
          );
        }}
      </For>
    </ul>
  );
};
