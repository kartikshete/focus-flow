import React from 'react';
import { Trash2, CheckCircle, Circle } from 'lucide-react';
import Badge from './Badge';

const TaskItem = ({ task, onToggle, onDelete }) => {
    const isCompleted = task.status === 'Completed';

    return (
        <div className={`flex items-center justify-between p-4 glass-card ${isCompleted ? 'opacity-60 border-green-500/30' : 'border-slate-700/50'}`}>
            <div className="flex items-center gap-4">
                <button
                    onClick={() => onToggle(task.id, !isCompleted)}
                    className={`text-2xl transition-colors ${isCompleted ? 'text-green-500' : 'text-slate-500 hover:text-blue-400'}`}
                >
                    {isCompleted ? <CheckCircle /> : <Circle />}
                </button>

                <div>
                    <h4 className={`font-semibold ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-100'}`}>
                        {task.title}
                    </h4>
                    <div className="flex gap-2 mt-1 text-sm text-slate-400">
                        <Badge text={task.category} />
                        <Badge text={task.priority} />
                        {task.dueDate && <span>📅 {new Date(task.dueDate).toLocaleDateString()}</span>}
                    </div>
                </div>
            </div>

            <button
                onClick={() => onDelete(task.id)}
                className="text-slate-500 hover:text-red-400 p-2 transition-colors"
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
};

export default TaskItem;
