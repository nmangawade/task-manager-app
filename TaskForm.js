import React, { useState } from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3002',
});

const inputStyle = {
    marginBottom: '10px',
    width: '300px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
};

const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

function TaskForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddTask = () => {
        api
            .post('/api/CreateTasks', { title, description })
            .then(() => {
                setTitle('');
                setDescription('');
            })
            .catch((error) => console.error(error));
    };

    return (
        <div style={{ textAlign: 'center', margin: '20px' }}>
            <h2>Add Task</h2>
            <form onSubmit={handleAddTask}>
                <div>
                    <label>Title:</label>
                    <br />
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter task title"
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <br />
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter task description"
                        style={inputStyle}
                    />
                </div>
                <button type="submit" style={buttonStyle}>
                    Add Task
                </button>
            </form>
        </div>
    );
}

export default TaskForm;
