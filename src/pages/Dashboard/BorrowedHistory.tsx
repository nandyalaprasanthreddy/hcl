import { useEffect, useState } from "react";
import { Userborrowhistory } from "../../types/userborrowhistory";
import { axiosInstance } from "../../utils/axiosInstance";

const BorrowedHistory: React.FC = () => {
  interface TableHeader {
    label: string;
    key: string; // Optional: if you need a unique key for mapping or data access
  }

  const headers: TableHeader[] = [
    { label: "Title", key: "title" },
    { label: "Book Status", key: "status" },
    { label: "User Id", key: "userId" },
    { label: "Renew Date", key: "renewDate" },
    // Add more headers as needed
  ];
  const [userBorrowed, setUserBorrowed] = useState<Userborrowhistory[]>([]);
  useEffect(() => {
    const fetchBorrowedHistory = async () => {
      try {
        const response = await axiosInstance.get("/userBorrowedBooks");

        if (response.data.length > 0) {
          setUserBorrowed(response.data);
          console.log(response.data);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.log(err);

        //setError(err.message);
      }
    };

    fetchBorrowedHistory();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">User Borrowed History </h1>
      {userBorrowed.length > 0 ? (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-md">
              <thead className="bg-gray-50">
                <tr>
                  {headers.map((header) => (
                    <th
                      key={header.key || header.label} // Use key if available, otherwise label
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {userBorrowed.map((history) => (
                  <tr key={history.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {history.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {history.book_status}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {history.userId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {history.returnDate
                        ? new Date(history.returnDate).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )
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
                {/* <button
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
                {/* <label htmlFor="itemsPerPage" className="text-gray-700">
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
                </div> */}
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
    </>
  );
};

export default BorrowedHistory;
