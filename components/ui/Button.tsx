import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";
  
  const variants = {
    primary: "bg-brand-900 hover:bg-brand-800 text-white shadow-lg shadow-brand-900/20 border border-transparent focus:ring-brand-500",
    accent: "bg-accent-500 hover:bg-accent-600 text-white shadow-lg shadow-accent-500/30 border border-transparent focus:ring-accent-500",
    secondary: "bg-brand-700 hover:bg-brand-800 text-white border border-transparent focus:ring-brand-500 shadow-md",
    outline: "bg-transparent border-2 border-brand-800 text-brand-900 hover:bg-brand-50 focus:ring-brand-500",
    white: "bg-white text-brand-900 hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg tracking-wide"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;