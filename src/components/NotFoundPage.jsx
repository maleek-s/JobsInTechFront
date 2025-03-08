import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 flex flex-col items-center justify-center text-blue-900">
      <div className="text-center">
        <h1 className="text-9xl font-bold mb-4 animate-bounce">404</h1>
        <p className="text-2xl mb-8">Oops! The page you're looking for doesn't exist.</p>
        <button
          onClick={handleGoHome}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;