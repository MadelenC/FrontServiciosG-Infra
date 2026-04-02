import React from "react";

export default function Pagination({ page, totalPages, setPage }) {
  const getPageNumbers = (current, totalPages, delta = 2) => {
    const range = [];
    const pages = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= current - delta && i <= current + delta)) range.push(i);
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) pages.push(l + 1);
        else if (i - l !== 1) pages.push("...");
      }
      pages.push(i);
      l = i;
    }
    
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 py-4">
      <button
        className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 transition"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        ⬅ Anterior
      </button>

      {getPageNumbers(page, totalPages).map((p, idx) =>
        p === "..." ? (
          <span key={`dots-${idx}`} className="px-3 text-gray-500">...</span>
        ) : (
          <button
            key={`page-${p}-${idx}`}
            className={`px-3 py-1.5 rounded-lg transition ${p === page ? "bg-blue-600 text-white shadow" : "bg-gray-100 hover:bg-gray-200"}`}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        )
      )}

      <button
        className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 transition"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Siguiente ➝
      </button>
    </div>
  );
}