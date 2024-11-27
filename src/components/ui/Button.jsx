import React from 'react';
import clsx from 'clsx';

export const Button = ({ children, className, ...props }) => (
  <button
    className={clsx(
      'w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2',
      className
    )}
    {...props}
  >
    {children}
  </button>
);
