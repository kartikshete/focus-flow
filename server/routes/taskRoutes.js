const express = require('express');
const router = express.Router();
const { readTasks, writeTasks } = require('../services/dbService');
const { v4: uuidv4 } = require('uuid'); // We'll just use Date.now() for simplicity if uuid not installed, but let's stick to unique IDs. 
// Actually, I didn't verify if uuid is installed. I'll use Date.now().toString() to be safe without extra deps.

// GET all tasks
router.get('/', (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
});

// POST new task
router.post('/', (req, res) => {
    const { title, description, category, priority, dueDate } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    const tasks = readTasks();
    const newTask = {
        id: Date.now().toString(),
        title,
        description: description || "",
        category: category || "Personal",
        priority: priority || "Medium",
        dueDate: dueDate || null,
        status: "Pending",
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
});

// PUT update task
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    let tasks = readTasks();
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ message: "Task not found" });
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
    writeTasks(tasks);
    res.json(tasks[taskIndex]);
});

// DELETE task
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let tasks = readTasks();
    const newTasks = tasks.filter(t => t.id !== id);

    if (tasks.length === newTasks.length) {
        return res.status(404).json({ message: "Task not found" });
    }

    writeTasks(newTasks);
    res.json({ message: "Task deleted" });
});

module.exports = router;
