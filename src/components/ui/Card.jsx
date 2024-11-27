import React from 'react';

export const Card = ({ children, className, ...props }) => (
  <div className={`rounded-lg shadow-md bg-white p-6 ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ children, className, ...props }) => (
  <div className={`mb-6 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className, ...props }) => (
  <h2 className={`text-2xl font-bold text-gray-900 ${className}`} {...props}>
    {children}
  </h2>
);

export const CardDescription = ({ children, className, ...props }) => (
  <p className={`text-sm text-gray-600 ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent = ({ children, className, ...props }) => (
  <div className={`space-y-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className, ...props }) => (
  <div className={`mt-6 ${className}`} {...props}>
    {children}
  </div>
);
