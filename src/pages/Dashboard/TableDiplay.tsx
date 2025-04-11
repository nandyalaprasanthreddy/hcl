import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { axiosInstance } from "../../utils/axiosInstance";
import SearchBox from "../../components/SearchBox";
interface Book {
  bookid: number;
  title: string;
  author: string;
  category: string;
  status: string;
  renewDate?: string;
}

const bookColumns: {
  key: keyof Book; 
  header: string;
  render?: (item: Book) => React.ReactNode;
}[] = [
  { key: "bookid", header: "Book ID" },
  { key: "title", header: "Title" },
  { key: "author", header: "Author" },
  { key: "category", header: "Category" },
  { key: "status", header: "Status" },
  { key: "renewDate", header: "Renew Date" },
];

const TableDiplay = () => {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [searchResults, setSearchResults] = useState<Book[]>(allBooks);

 
  useEffect(() => {
    const fetchBooks = async () => {
      
      try {
        const response = await axiosInstance.get("/Books");

        if (response.data.length > 0) {
          setAllBooks(
            response.data.sort((a: { title: string }, b: { title: string }) =>
              a.title.localeCompare(b.title, "en", { sensitivity: "base" })
            )
          );
          console.log(allBooks);
          console.log(searchResults);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.log(err.message);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setSearchResults(allBooks); 
      return;
    }

    const filteredItems = allBooks.filter(
      (allBooks) =>
        allBooks.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        allBooks.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        allBooks.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setAllBooks(filteredItems);
  };

  return (
    <>
      <div className="p-4">
        <SearchBox
          onSearch={handleSearch}
          placeholder="Search Books..."
          className="mb-4 w-64"
        />
      </div>
      <Table data={allBooks} columns={bookColumns} className="mt-4" />
    </>
  );
};

export default TableDiplay;
