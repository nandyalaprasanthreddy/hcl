import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Book } from "../../types/searchbook";

const API_URL = "http://localhost:4000/Books"; 

const BookSearch: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Book[] = await response.json();
        setSearchResults(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []); 
  const handleBorrowButtonClick = () => {
    navigate("/borrow"); 
  };
  const handleReturnButtonClick = () => {
    navigate("/return"); 
  };
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const results = searchResults.filter(
      (book) =>
        book.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        book.author.toLowerCase().includes(lowerCaseSearchTerm) ||
        book.category.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setSearchResults(results);
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading books...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">Error loading books: {error}</div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book Search</h1>

      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Search by title, author, or category"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {searchResults.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-md">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Author
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Renew Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {searchResults.map((book) => (
                <tr key={book.bookid}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {book.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {book.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {book.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {book.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {book.renewDate
                      ? new Date(book.renewDate).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : "---"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>{" "}
          <br></br>
          <div>
            {" "}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleBorrowButtonClick}
            >
              Borrow Book{" "}
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleReturnButtonClick}
            >
              Return Book{" "}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700">
          No books found matching your search criteria.
        </p>
      )}
    </div>
  );
};

export default BookSearch;
