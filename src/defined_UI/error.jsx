import React from 'react';

const ErrorPage = ({ onNavigate }) => {
  const goHome = () => {
    if (onNavigate) {
      onNavigate('/');
    } else {
      // Fallback for direct use
      window.location.href = '/';
    }
  };

  const goBack = () => {
    if (onNavigate) {
      onNavigate(-1);
    } else {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full text-center">
        {/* 404 Animation */}
        <div className="relative mb-8">
          <div className="text-8xl sm:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
            404
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-0 left-1/4 w-4 h-4 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          
          {/* Sad Face */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl sm:text-5xl text-gray-400 animate-pulse opacity-30">
              😕
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Oops! Page Not Found
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            The page you're looking for seems to have gone missing. 
            Don't worry, even the best explorers sometimes take a wrong turn!
          </p>
        </div>

        {/* Search Suggestions */}
        <div className="mb-8 p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            What you can do:
          </h3>
          <ul className="text-left space-y-2 text-gray-600">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
              Check the URL for typos
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
              Go back to the previous page
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
              Visit our homepage
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
              Try searching for what you need
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={goHome}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            🏠 Go Home
          </button>
          
          <button
            onClick={goBack}
            className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg shadow-lg border border-gray-200 hover:shadow-xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-300"
          >
            ← Go Back
          </button>
        </div>

        {/* Fun Animation */}
        <div className="mt-12 relative">
          <div className="text-6xl animate-bounce">
            🚀
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Let's get you back on track!
          </p>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-pink-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-10 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
    </div>
  );
};

// Alternative Minimal 404 Component
const Minimal404 = ({ onNavigate }) => {
  const goHome = () => {
    if (onNavigate) {
      onNavigate('/');
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="text-9xl font-bold text-gray-300 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          Sorry, the page you are looking for doesn't exist.
        </p>
        <button
          onClick={goHome}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

// Creative 404 with Search
const Creative404 = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() && onNavigate) {
      onNavigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const goHome = () => {
    if (onNavigate) {
      onNavigate('/');
    } else {
      window.location.href = '/';
    }
  };

  const goBack = () => {
    if (onNavigate) {
      onNavigate(-1);
    } else {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-cyan-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <svg className="mx-auto w-64 h-32" viewBox="0 0 200 100">
            <text x="100" y="70" className="text-6xl font-bold fill-indigo-600 animate-pulse" textAnchor="middle">
              404
            </text>
            <circle cx="50" cy="30" r="3" className="fill-indigo-400 animate-bounce" />
            <circle cx="150" cy="25" r="2" className="fill-cyan-400 animate-bounce" style={{ animationDelay: '0.5s' }} />
            <circle cx="100" cy="90" r="2.5" className="fill-purple-400 animate-bounce" style={{ animationDelay: '1s' }} />
          </svg>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Lost in Space? 🛸
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          This page has drifted off into the digital void
        </p>

        {/* Search Input */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search for what you need..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
            >
              🔍 Search
            </button>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <button
            onClick={goHome}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all font-semibold"
          >
            🏠 Return Home
          </button>
          <button
            onClick={goBack}
            className="w-full sm:w-auto px-8 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 hover:shadow-md transform hover:scale-105 transition-all font-semibold"
          >
            ← Previous Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;