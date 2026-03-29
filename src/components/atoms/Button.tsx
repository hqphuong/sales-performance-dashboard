import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  isActive?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isActive = false, 
  ...props 
}) => {
  const baseClass = "px-4 py-2 rounded-md font-medium transition duration-200 text-sm";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50"
  };

  const activeClass = isActive ? "ring-2 ring-blue-500 ring-offset-2" : "";

  return (
    <button 
      {...props} 
      className={`${baseClass} ${variants[variant]} ${activeClass}`}
    >
      {children}
    </button>
  );
};