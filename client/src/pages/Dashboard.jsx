import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/api';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';
import Card from '../components/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useParams } from 'react-router-dom';

const Dashboard = ({ filter }) => {
    const { category } = useParams();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadTasks = async () => {
        try {
            const data = await fetchTasks();
            setTasks(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const getFilteredTasks = () => {
        let filtered = [...tasks];

        if (filter === 'today') {
            const today = new Date().toISOString().split('T')[0];
            filtered = filtered.filter(t => t.dueDate === today);
        } else if (filter === 'category' && category) {
            filtered = filtered.filter(t => t.category.toLowerCase() === category.toLowerCase());
        }

        return filtered.sort((a, b) => {
            // Sort by priority (High > Medium > Low) then Date
            const priorityOrder = { High: 0, Medium: 1, Low: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    };

    const dTasks = getFilteredTasks();

    const handleAddTask = async (newTask) => {
        const created = await createTask(newTask);
        setTasks([...tasks, created]);
    };

    const handleToggle = async (id, status) => {
        const newStatus = status ? 'Completed' : 'Pending';
        // Optimistic update
        const updatedTasks = tasks.map(t => t.id === id ? { ...t, status: newStatus } : t);
        setTasks(updatedTasks);
        await updateTask(id, { status: newStatus });
    };

    const handleDelete = async (id) => {
        setTasks(tasks.filter(t => t.id !== id));
        await deleteTask(id);
    };

    // Analytics Data (Context aware)
    const completedCount = dTasks.filter(t => t.status === 'Completed').length;
    const pendingCount = dTasks.length - completedCount;
    const data = [
        { name: 'Completed', value: completedCount, color: '#10B981' },
        { name: 'Pending', value: pendingCount, color: '#F59E0B' },
    ];

    return (
        <div>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Stats Cards */}
                <Card title={filter === 'today' ? "Today's Overview" : (category ? `${category} Overview` : "Overview")} className="md:col-span-2">
                    <div className="flex gap-8 items-center">
                        <div className="text-center">
                            <span className="block text-4xl font-bold text-blue-400">{dTasks.length}</span>
                            <span className="text-slate-400 text-sm">Tasks</span>
                        </div>
                        <div className="text-center">
                            <span className="block text-4xl font-bold text-green-400">{completedCount}</span>
                            <span className="text-slate-400 text-sm">Completed</span>
                        </div>
                        <div className="h-32 w-32 ml-auto">
                            {/* Simple Pie Chart if data exists */}
                            {dTasks.length > 0 && (
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie data={data} innerRadius={25} outerRadius={40} dataKey="value">
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>
                </Card>

                <Card title="Quick Add">
                    <TaskForm onSubmit={handleAddTask} layout="vertical" />
                </Card>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-100">
                    {filter === 'today' ? "Tasks Due Today" : (category ? `${category} Tasks` : "All Tasks")}
                </h2>
                {loading ? <p>Loading...</p> : (
                    dTasks.length === 0 ? <p className="text-gray-500">No tasks found in this view.</p> : (
                        <AnimatePresence>
                            {dTasks.map((task, index) => (
                                <motion.div
                                    key={task.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <TaskItem
                                        task={task}
                                        onToggle={handleToggle}
                                        onDelete={handleDelete}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )
                )}
            </div>
        </div>
    );
};

export default Dashboard;
