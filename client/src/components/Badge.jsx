import React from 'react';

const Badge = ({ text, type = 'default' }) => {
    const getColors = (t) => {
        switch (t?.toLowerCase()) {
            case 'high': return 'bg-red-500/10 text-red-400 border border-red-500/20';
            case 'medium': return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20';
            case 'low': return 'bg-green-500/10 text-green-400 border border-green-500/20';
            case 'startup': return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
            case 'college': return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
            case 'personal': return 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';
            case 'completed': return 'bg-green-500/10 text-green-400 border border-green-500/20';
            case 'pending': return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
            default: return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
        }
    };

    return (
        <span className={`px-2 py-1 rounded text-xs font-semibold ${getColors(text || type)}`}>
            {text}
        </span>
    );
};

export default Badge;
