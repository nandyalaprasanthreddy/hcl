import React, { useState, useEffect, ChangeEvent } from "react";

import { Book } from "../../types/searchbook";
import { axiosInstance } from "../../utils/axiosInstance";

const BookSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState<string>("3");

  const [currentPage, setCurrentPage] = useState(1);
  const itemscount = parseInt(itemsPerPage);
  const startIndex = (currentPage - 1) * itemscount;
  const endIndex = startIndex + itemscount;
  const currentItems = searchResults.slice(startIndex, endIndex);

  const totalPages = Math.ceil(searchResults.length / itemscount);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get("/Books");

        if (response.data.length > 0) {
          setSearchResults(
            response.data.sort((a: { title: string }, b: { title: string }) =>
              a.title.localeCompare(b.title, "en", { sensitivity: "base" })
            )
          );
          setAllBooks(
            response.data.sort((a: { title: string }, b: { title: string }) =>
              a.title.localeCompare(b.title, "en", { sensitivity: "base" })
            )
          );
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleItemsPerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(event.target.value);
    console.log("Selected items per page:", event.target.value);
  };
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    const lowerCaseSearchTerm = newSearchTerm.toLowerCase();
    const results = allBooks.filter(
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
      </div>
      {searchResults.length > 0 ? (
        <div>
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
                {currentItems.map((book) => (
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
            <div className="container mx-auto p-4">
              <div className="mt-4 flex justify-center items-center space-x-4">
                {" "}
                {/* Added items-center */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                        currentPage === page
                          ? "bg-blue-500 text-white hover:bg-blue-700"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                >
                  Next
                </button>
                <div className="flex items-center space-x-2">
                  {" "}
                  {/* Container for label and select */}
                  <label htmlFor="itemsPerPage" className="text-gray-700">
                    Items per page:
                  </label>
                  <select
                    name="itemsPerPage"
                    id="itemsPerPage"
                    className="shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={itemscount} // Make sure 'itemscount' is your state variable
                    onChange={handleItemsPerPageChange} // Make sure 'handleItemsPerPageChange' is your handler
                  >
                    <option value="3">3</option>
                    <option value="6">6</option>
                    <option value="9">9</option>
                  </select>
                </div>
              </div>
            </div>
            <br></br>
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
