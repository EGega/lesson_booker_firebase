import {useEffect, useState} from 'react'
import Navbar from '../../../../components/navbar/Navbar';
import styled from './GoogleDriveBooks.module.css';
// This is a static List
const GoogleDriveBooks = () => {
const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch('/bookLinks.json') 
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error('Failed to load books', err));
  }, []);

  return (
    <>
    <Navbar/>
    <div className={styled.container}>
      <h2>Study Books</h2>
      <ul>
        {books.map((book, idx) => (  
          <li key={idx}>
            {book.title}
            <a href={book.url} target="_blank" rel="noopener noreferrer">
              See the books <span className={styled.arrow}> → </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default GoogleDriveBooks