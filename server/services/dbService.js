const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/tasks.json');

// Ensure DB file exists
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([], null, 2));
}

const readTasks = () => {
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading DB:", err);
        return [];
    }
};

const writeTasks = (tasks) => {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(tasks, null, 2));
        return true;
    } catch (err) {
        console.error("Error writing to DB:", err);
        return false;
    }
};

module.exports = { readTasks, writeTasks };
