import React from 'react';
import { useBrowse } from '../context/BrowseContext';

const Pagination: React.FC = () => {
  const { currentPage, totalPages, totalDogs, setCurrentPage } = useBrowse();

  return (
    <div className="mt-4 flex items-center justify-self-center justify-center gap-4 bg-secondary text-primary text-sm w-fit py-0.5 rounded-full shadow-md">
      {/* Previous button */}
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 0}
        className={`px-3 py-1 rounded ${
          currentPage === 0
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-accent-color transition'
        }`}
      >
        Prev
      </button>

      {/* Page information */}
      <span className="font-semibold">
        Page {currentPage + 1} of {totalPages} ({totalDogs} dogs found)
      </span>

      {/* Next button */}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        className={`px-3 py-1 rounded ${
          currentPage >= totalPages - 1
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-accent-color transition'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
