import {useEffect, useState} from 'react'
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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Book Library</h2>
      <ul className="space-y-2">
        {books.map((book, idx) => (
          <li key={idx}>
            <a href={book.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              {book.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GoogleDriveBooks