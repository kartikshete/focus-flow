import React, { useEffect, useState } from 'react';
import { fetchTasks } from '../services/api';
import Card from '../components/Card';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import { CheckCircle, AlertTriangle, Clock, TrendingUp } from 'lucide-react';

const COLORS = ['#60A5FA', '#34D399', '#FBBF24', '#F87171', '#A78BFA'];

const Analytics = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchTasks();
                setTasks(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading Analytics...</div>;

    // --- Data Processing Helpers ---

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 1. Basic Counts
    const completedTasks = tasks.filter(t => t.status === 'Completed');
    const pendingTasks = tasks.filter(t => t.status !== 'Completed');
    const overdueTasks = tasks.filter(t => {
        if (t.status === 'Completed') return false;
        if (!t.dueDate) return false;
        return new Date(t.dueDate) < today;
    });

    // 2. Weekly Growth (Last 7 Days)
    const getLast7Days = () => {
        const result = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            result.push({
                date: d.toISOString().split('T')[0],
                label: d.toLocaleDateString('en-US', { weekday: 'short' }),
                count: 0
            });
        }
        return result;
    };

    let growthData = getLast7Days();
    // Assuming 'createdAt' or 'completedAt' exists. 
    // Since we only have simple task data, we'll simulate "Tasks Due" trend for now based on Due Date.
    // Ideally we'd store a 'completedAt' timestamp. Let's filter by Due Date for "Workload Trend".

    growthData = growthData.map(day => {
        const count = tasks.filter(t => t.dueDate === day.date && t.status === 'Completed').length;
        return { ...day, count };
    });

    // 3. Category Distribution
    const categoryCount = {};
    tasks.forEach(t => {
        const cat = t.category || 'Uncategorized';
        categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    });
    const categoryData = Object.keys(categoryCount).map(key => ({ name: key, value: categoryCount[key] }));

    // 4. Priority Analysis
    const priorityData = [
        { name: 'High', Completed: 0, Pending: 0 },
        { name: 'Medium', Completed: 0, Pending: 0 },
        { name: 'Low', Completed: 0, Pending: 0 }
    ];

    tasks.forEach(t => {
        const group = priorityData.find(p => p.name === t.priority);
        if (group) {
            t.status === 'Completed' ? group.Completed++ : group.Pending++;
        }
    });

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>

            {/* Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-blue-50 border-blue-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Total Tasks</p>
                            <h3 className="text-2xl font-bold text-gray-800">{tasks.length}</h3>
                        </div>
                    </div>
                </Card>
                <Card className="bg-green-50 border-green-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-lg text-green-600">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Completed</p>
                            <h3 className="text-2xl font-bold text-gray-800">{completedTasks.length}</h3>
                        </div>
                    </div>
                </Card>
                <Card className="bg-yellow-50 border-yellow-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-yellow-100 rounded-lg text-yellow-600">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Pending</p>
                            <h3 className="text-2xl font-bold text-gray-800">{pendingTasks.length}</h3>
                        </div>
                    </div>
                </Card>
                <Card className="bg-red-50 border-red-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-100 rounded-lg text-red-600">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Overdue</p>
                            <h3 className="text-2xl font-bold text-gray-800">{overdueTasks.length}</h3>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Charts Row 1 */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card title="Completion Trend (Last 7 Days)">
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={growthData}>
                                <defs>
                                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="label" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <Tooltip />
                                <Area type="monotone" dataKey="count" stroke="#10B981" fillOpacity={1} fill="url(#colorCount)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card title="Task Distribution by Category">
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" dataKey="value" paddingAngle={5}>
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Charts Row 2 */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card title="Priority Analysis">
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={priorityData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" width={80} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Completed" stackId="a" fill="#10B981" radius={[0, 4, 4, 0]} />
                                <Bar dataKey="Pending" stackId="a" fill="#E5E7EB" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card title="Efficiency Insight">
                    <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
                        <TrendingUp size={48} className="text-purple-500" />
                        <div>
                            <h3 className="text-4xl font-bold text-slate-100">
                                {tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0}%
                            </h3>
                            <p className="text-slate-400">Overall Completion Rate</p>
                        </div>
                        <p className="text-sm text-slate-500 px-8">
                            {overdueTasks.length > 0 ? "⚠️ You have overdue tasks. Focus on them first!" : "✅ Great job! No overdue tasks."}
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Analytics;
