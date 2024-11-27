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
export const Input = ({ className, ...props }) => (
    <input
      className={`px-4 py-2 border rounded w-full ${className}`}
      {...props}
    />
  );
  export const Label = ({ children, className, ...props }) => (
    <label className={`block font-medium text-gray-700 ${className}`} {...props}>
      {children}
    </label>
  );

  export const Card = ({ children, className, ...props }) => (
    <div className={`rounded-lg shadow-lg bg-white p-4 ${className}`} {...props}>
      {children}
    </div>
  );
  
  export const CardContent = ({ children }) => <div>{children}</div>;
  export const CardHeader = ({ children }) => <div className="mb-4">{children}</div>;
  export const CardTitle = ({ children }) => <h2 className="text-xl font-bold">{children}</h2>;
  export const CardDescription = ({ children }) => <p className="text-sm text-gray-500">{children}</p>;
    