import React from 'react';

const Card = ({ children, className = '', title, action }) => {
    return (
        <div className={`glass-card p-6 ${className}`}>
            {title && (
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-slate-100">{title}</h3>
                    {action && <div>{action}</div>}
                </div>
            )}
            {children}
        </div>
    );
};

export default Card;
