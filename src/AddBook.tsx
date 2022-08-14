import { createSignal, Setter, JSX, createResource, Show, For } from 'solid-js';
import type { Book } from './App';
import type {resultItem} from "./searchBooks";
import { searchBooks } from './searchBooks';

export interface AddBookProps {
  setBooks: Setter<Book[]>;
}

type ClickHandler = JSX.EventHandler<HTMLButtonElement, MouseEvent>;
type InputHandler = JSX.EventHandler<HTMLInputElement, InputEvent>;

export function AddBook(props: AddBookProps) {
  const [input, setInput] = createSignal('');
  const [query, setQuery] = createSignal('');

  const [data] = createResource<Book[], string>(query, searchBooks);

  const handleSubmit: ClickHandler = (e) => {
    e.preventDefault();
    setQuery(input());
  };

  const setTitle: InputHandler = (e) => {
    setInput(e.currentTarget.value);
  };

  return (
    <form>
      <div>
        <label for='title'>Search books</label>
        <input id='title' value={input()} onInput={(e) => setTitle(e)} />
      </div>
      <button type='submit' onClick={handleSubmit}>
        Search
      </button>

      <Show when={!data.loading} fallback={<>Searching...</>}>
        <ul>
          <For each={data()}>
            {(book) => (
              <li>
                <p>
                  {book.title} by {book.author}{' '}
                </p>
                <button onClick={(e) => {
                    e.preventDefault();
                    props.setBooks((books) => [...books, book])
                }}>Add Book</button>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </form>
  );
}
