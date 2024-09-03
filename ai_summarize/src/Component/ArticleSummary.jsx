import React from 'react';

const ArticleSummary = ({ summary }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full   mx-auto mt-8">
      <h1 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600 mb-4">
        Article Summary
      </h1>
      <p className="text-gray-700 leading-relaxed">{summary}</p>
    </div>
  );
};

export default ArticleSummary;
