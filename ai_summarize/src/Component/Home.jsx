import React, { useState } from 'react';
import { FaLink, FaPaperPlane, FaCopy, FaCheck } from 'react-icons/fa';
import { assets } from '../assets/assets';
import { useLazyGetSummaryQuery } from '../services/article';
import ArticleSummary from './ArticleSummary';

const Home = () => {
  const [link, setLink] = useState('');
  const [links, setLinks] = useState([]);
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, SetCopied] = useState("");
  
  const [getSummary] = useLazyGetSummaryQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (link.trim()) {
      try {
        setIsLoading(true);

        const { data, error } = await getSummary({ articleUrl: link });

        if (error) {
          setSummary('An error occurred while fetching the summary.');
          console.error('Error:', error);
        } else if (data && data.summary) {
          setSummary(data.summary);
          setLinks([...links, link]);
        } else {
          setSummary('No summary available.');
        }

        setLink('');
      } catch (error) {
        console.error('Error:', error);
        setSummary('An error occurred while fetching the summary.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCopy = (copyUrl) => {
    SetCopied(copyUrl); // Set the copied link to the state
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => SetCopied(""), 3000); // Clear the copied state after 3 seconds
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-transparent">
        <div className="container mx-auto flex justify-between items-center p-5">
          <img src={assets.logo} alt="Summzie Logo" className="h-10" />
        </div>
      </header>

      
      <main className="container mx-auto text-center mt-16 px-4 max-w-4xl">
        <h1 className="text-6xl font-extrabold text-gray-800 leading-tight">
          Summarize Articles 
          <br className="hidden md:block" />
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
            OpenAI GPT 4
          </span>
        </h1>
        <p className="mt-4 text-gray-600 text-xl">
          Simplify your reading with Summzie, an open-source article summarizer that transforms lengthy articles into clear and concise summaries.
        </p>

        <section className="mt-12 mx-auto max-w-2xl px-4">
          <form onSubmit={handleSubmit} className="flex justify-center items-center space-x-4">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="px-3 bg-gray-200 text-gray-600">
                <FaLink />
              </span>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="p-2 w-80 focus:outline-none"
                placeholder="Paste your article link here..."
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg flex items-center"
            >
              {isLoading ? "Processing..." : <><FaPaperPlane className="mr-2" /> Summarize</>}
            </button>
          </form>

          {/* History Section: Moved under the form */}
          {links.length > 0 && (
            <div className="bg-gray-100 p-4 rounded-lg  w-full max-w-md mx-auto mt-4">
              <ul className="space-y-2">
                {links.map((submittedLink, index) => (
                  <li key={index} className="flex items-center bg-white p-2 rounded-lg shadow-sm border border-gray-200">
                    <a
                      href={submittedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline truncate w-full"
                    >
                      {submittedLink}
                    </a>
                    <button
                      onClick={() => handleCopy(submittedLink)}
                      className="text-gray-500 hover:text-gray-700 ml-2"
                    >
                      {copied === submittedLink ? <FaCheck className="text-gray-500" /> : <FaCopy />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Summary Section */}
          {isLoading ? (
            <div className="flex justify-center items-center mt-12 ">
              <img src={assets.loader} alt="Loading..." className="h-20 w-20" />
            </div>
          ) : (
            summary && <ArticleSummary summary={summary} />
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
