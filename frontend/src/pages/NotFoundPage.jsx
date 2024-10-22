import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
            <div className="flex flex-col items-center text-center">
                {/* Large 404 text */}
                <h1 className="text-9xl font-bold text-indigo-500 animate-bounce">404</h1>

                {/* Message */}
                <h2 className="mt-4 text-4xl font-semibold">Oops! Page Not Found</h2>
                <p className="mt-2 text-lg text-gray-400">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                {/* Link back to Home */}
                <Link
                    to="/"
                    className="mt-6 px-6 py-3 bg-indigo-500 text-gray-900 rounded-lg shadow hover:bg-indigo-600 transition-transform duration-300 ease-in-out transform hover:scale-105"
                >
                    Go back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
