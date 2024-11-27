import React from 'react';

export const Input = ({ className, ...props }) => (
  <input
    className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 ${className}`}
    {...props}
  />
);
