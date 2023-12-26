import { useState } from "react";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { DebounceInput } from "react-debounce-input";

function App() {
  const BASE_URL = "https://www.googleapis.com/books/v1/volumes?q";

  const [bookList, setBookList] = useState([]);
  const [bookName, setBookName] = useState("");

  async function getDataBookList(name) {
    if (name != "") {
      try {
        const result = await axios.get(`${BASE_URL}=${name}`);
        setBookList(result.data.items);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    getDataBookList(bookName);
  }, [bookName]);

  return (
    <>
      <h1>Find A Book</h1>
      <div className="App">
        <DebounceInput
          type="text"
          placeholder="Enter book name here"
          debounceTimeout={500}
          onChange={(event) => setBookName(event.target.value)}
          value={bookName}
        />
      </div>
      <ul>
        {bookList.map((item, index) => {
          return <li key={index}>{item.volumeInfo.title}</li>;
        })}
      </ul>
    </>
  );
}

export default App;
