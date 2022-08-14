import type { Component } from 'solid-js';
import { createSignal, Show } from 'solid-js';

import styles from './App.module.css';
import { BookList } from './BookList';
import { AddBook } from './AddBook';

export type Book = {
  title: string;
  author: string;
};

const initialBooks: Book[] = [
  { title: 'Code Complete', author: 'Steve McConnell' },
  { title: 'The Hobbit', author: 'J.R.R. Tolkien' },
  { title: 'Living a Feminist Life', author: 'Sarah Ahmed' },
];

interface BookshelfProps {
  name: string;
}

function BookShelf(props: BookshelfProps) {
  const [books, setBooks] = createSignal(initialBooks);
  const [showForm, setShowForm] = createSignal(false);

  const toggleForm = () => setShowForm(!showForm());

  return (
    <div>
      <h1>{props.name} Bookshelf</h1>
      <BookList books={books()} />
      <Show
        when={showForm()}
        fallback={<button onClick={toggleForm}>Add new book</button>}>
        <AddBook setBooks={setBooks} />
      </Show>
    </div>
  );
}

const App: Component = () => {
  return <BookShelf name='My' />;
};

export default App;
