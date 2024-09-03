import React, { useState } from 'react';
import { FaLink, FaPaperPlane, FaCopy } from 'react-icons/fa';
import { assets } from '../assets/assets';

const API_KEY = "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"; // Replace with your API key

const Home = () => {
  const [link, setLink] = useState('');
  const [links, setLinks] = useState([]);
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Fetch article content from URL
  const fetchArticleContent = async (url) => {
    try {
      // Use a CORS proxy
      const corsProxy = "https://cors-anywhere.herokuapp.com/";
      const response = await fetch(corsProxy + url);
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const articleContent = doc.querySelector('article')?.textContent || '';
      return articleContent;
    } catch (error) {
      console.error('Failed to fetch article content:', error);
      return '';
    }
  };
  

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (link.trim()) {
    try {
      setIsLoading(true);
      const content = await fetchArticleContent(link);

      // Log the content for debugging
      console.log('Article content:', content);

      // Send content to ChatGPT API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: 'system', content: "Explain things like you're talking to a software professional with 2 years of experience." },
            { role: 'user', content: `Summarize the following article: ${content}` }
          ]
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setSummary(data.choices[0]?.message?.content || 'No summary available');

      setLinks([...links, link]);
      setLink('');
    } catch (error) {
      console.error('Error:', error);
      setSummary('An error occurred while fetching the summary.');
    } finally {
      setIsLoading(false);
    }
  }
};
  

  // Handle copying the link to the clipboard
  const handleCopy = (link) => {
    navigator.clipboard.writeText(link);
    // You can show a toast or a message here instead of an alert
  };

  return (
    <div className="min-h-screen bg-gray-10">
      <header className="bg-transparent">
        <div className="container mx-auto flex justify-between items-center p-5">
          <img src={assets.logo} alt="Summzie Logo" className="h-10" />
        </div>
      </header>

      <main className="container mx-auto text-center mt-16 px-4">
        <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">
          Summarize Articles 
          <br className="hidden md:block" />
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
            OpenAI GPT 4
          </span>
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Simplify your reading with Summzie, an open-source article summarizer that transforms lengthy articles into clear and concise summaries.
        </p>

        <section className="mt-12">
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

          <div className="mt-8">
            {summary && (
              <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-md mx-auto">
                <p className="text-gray-800">{summary}</p>
              </div>
            )}
            {links.length > 0 && (
              <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-md mx-auto mt-4">
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
                        <FaCopy />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
