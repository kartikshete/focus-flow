import React, { useState } from 'react';
import Button from './Button';
import Input, { Select } from './Input';

const TaskForm = ({ onSubmit, layout = 'vertical' }) => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        category: 'Personal',
        priority: 'Medium',
        dueDate: ''
    });

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(task);
        setTask({ title: '', description: '', category: 'Personal', priority: 'Medium', dueDate: '' });
    };

    return (
        <form onSubmit={handleSubmit} className={layout === 'inline' ? 'flex gap-2' : 'space-y-4'}>
            <Input
                name="title"
                value={task.title}
                onChange={handleChange}
                placeholder="Task Title"
                required
            />

            {layout === 'vertical' && (
                <>
                    <Input
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        placeholder="Description (Optional)"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Select
                            name="category"
                            value={task.category}
                            onChange={handleChange}
                            options={[
                                { value: 'College', label: 'College' },
                                { value: 'Startup', label: 'Startup' },
                                { value: 'Personal', label: 'Personal' }
                            ]}
                        />
                        <Select
                            name="priority"
                            value={task.priority}
                            onChange={handleChange}
                            options={[
                                { value: 'High', label: 'High' },
                                { value: 'Medium', label: 'Medium' },
                                { value: 'Low', label: 'Low' }
                            ]}
                        />
                    </div>
                    <Input
                        type="date"
                        name="dueDate"
                        value={task.dueDate}
                        onChange={handleChange}
                    />
                </>
            )}

            <Button type="submit" className="w-full">Add Task</Button>
        </form>
    );
};

export default TaskForm;
