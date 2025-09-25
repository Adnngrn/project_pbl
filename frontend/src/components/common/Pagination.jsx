import React from "react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-4 space-x-2">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className={`px-3 py-1 border rounded ${
          page === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-white"
        }`}
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-1 border rounded ${
            page === i + 1 ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className={`px-3 py-1 border rounded ${
          page === totalPages ? "bg-gray-200 cursor-not-allowed" : "bg-white"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
