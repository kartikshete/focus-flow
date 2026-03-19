import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, Layers, CheckSquare, BarChart2 } from 'lucide-react';

const SidebarItem = ({ to, icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/10'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`
        }
    >
        {icon}
        <span className="font-medium">{label}</span>
    </NavLink>
);

import { AnimatePresence, motion } from 'framer-motion';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex bg-slate-900 text-slate-100">
            {/* Sidebar */}
            <aside className="w-64 glass-panel border-r-0 fixed h-full hidden md:flex flex-col z-10">
                <div className="p-6">
                    <h1 className="text-2xl font-bold flex items-center gap-2 text-blue-400">
                        <CheckSquare />
                        FocusFlow
                    </h1>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <SidebarItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
                    <SidebarItem to="/today" icon={<Calendar size={20} />} label="Today's Tasks" />
                    <SidebarItem to="/analytics" icon={<BarChart2 size={20} />} label="Analytics" />
                    <div className="pt-4 pb-2 px-4 text-xs font-semibold text-slate-400 uppercase">Categories</div>
                    <SidebarItem to="/category/college" icon={<Layers size={20} />} label="College" />
                    <SidebarItem to="/category/startup" icon={<Layers size={20} />} label="Startup" />
                    <SidebarItem to="/category/personal" icon={<Layers size={20} />} label="Personal" />
                </nav>

                <div className="p-4 border-t border-slate-700/50">
                    <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/20">
                        <h4 className="font-bold text-blue-300 text-sm">Pro Tip</h4>
                        <p className="text-blue-200/70 text-xs mt-1">Break big tasks into smaller chunks!</p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        key={window.location.pathname} // Triggers animation on route change
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default Layout;
