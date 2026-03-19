import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button' }) => {
    const baseStyle = "px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900";

    const variants = {
        primary: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 focus:ring-blue-500",
        secondary: "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white focus:ring-slate-500",
        danger: "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white focus:ring-red-500",
        ghost: "text-slate-400 hover:bg-slate-800 hover:text-slate-200 focus:ring-slate-600"
    };

    return (
        <button
            type={type}
            className={`${baseStyle} ${variants[variant]} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
