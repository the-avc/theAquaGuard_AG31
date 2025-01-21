import React from 'react';

const Error404Page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-extrabold text-black">404</h1>
        <p className="text-lg text-black mt-4">Oops! The page you're looking for doesn't exist.</p>
        <button
          className="mt-6 px-6 py-3 bg-white text-indigo-600 font-semibold text-lg rounded-full shadow-lg transition duration-300 hover:bg-indigo-600 hover:text-white"
          onClick={() => window.location.href = '/'}
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default Error404Page;
