import { Setter, JSX, createSignal } from 'solid-js';
import { Book } from './App';

export interface AddBookProps {
  setBooks: Setter<Book[]>;
}

type ClickHandler = JSX.EventHandler<HTMLButtonElement, MouseEvent>
type InputHandler = JSX.EventHandler<HTMLInputElement, InputEvent>

const emptyBook: Book = { title: '', author: '' };

export function AddBook(props: AddBookProps) {
  const [newBook, setNewBook] = createSignal(emptyBook);

  const addBook: ClickHandler = (event) => {
    event.preventDefault();
    props.setBooks((books) => [...books, newBook()]);
    setNewBook(emptyBook);
  };

  const setBookTitle: InputHandler = (event) => {
    setNewBook({...newBook(), title: event.currentTarget.value})
  }

  const setBookAuthor: InputHandler = (event) => {
    setNewBook({...newBook(), author: event.currentTarget.value})
  }
  
  return (
    <form>
      <div>
        <label for='title'>Book name</label>
        <input
          id='title'
          value={newBook().title}
          onInput={(e) => setBookTitle(e)}
        />
      </div>
      <div>
        <label for='author'>Author</label>
        <input
          id='author'
          value={newBook().author}
          onInput={(e) => setBookAuthor(e)}
        />
      </div>
      <button type='submit' onClick={addBook}>
        Add book
      </button>
    </form>
  );
}
