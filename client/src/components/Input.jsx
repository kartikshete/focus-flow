import React from 'react';

const Input = ({ label, type = 'text', value, onChange, placeholder, name, required = false }) => {
    return (
        <div className="flex flex-col mb-4">
            {label && <label className="mb-2 text-sm font-semibold text-slate-300">{label}</label>}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
        </div>
    );
};

export const Select = ({ label, value, onChange, options, name }) => {
    return (
        <div className="flex flex-col mb-4">
            {label && <label className="mb-2 text-sm font-semibold text-slate-300">{label}</label>}
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="px-4 py-2 bg-slate-800 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all cursor-pointer"
            >
                {options.map(opt => (
                    <option key={opt.value} value={opt.value} className="bg-slate-800 text-slate-100">{opt.label}</option>
                ))}
            </select>
        </div>
    );
};

export default Input;
