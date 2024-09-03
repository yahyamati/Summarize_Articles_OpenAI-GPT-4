import React from 'react';

const ArticleSummary = ({ summary }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Article Summary</h2>
      <p className="text-gray-700 leading-relaxed">{summary}</p>
    </div>
  );
};

export default ArticleSummary;
