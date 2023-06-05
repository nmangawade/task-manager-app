import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/Styles/TaskList.css';

const api = axios.create({
    baseURL: 'http://localhost:3002',
});

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [updatedTasks, setUpdatedTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        api.get('/api/GetAllTasks')
            .then((response) => {
                setTasks(response.data);
                setUpdatedTasks(response.data.map(task => ({
                    id: task.id,
                    title: '',
                    description: ''
                })));
            })
            .catch((error) => console.error(error));
    };

    const handleUpdateTask = (id) => {
        const updatedTaskData = updatedTasks.find((task) => task.id === id);
        if (!updatedTaskData || (!updatedTaskData.title && !updatedTaskData.description)) return;

        api.put(`/api/UpdateTasks:${id}`, {
            title: updatedTaskData.title,
            description: updatedTaskData.description
        })
            .then(() => {
                fetchTasks();
            })
            .catch((error) => console.error(error));
    };

    const handleDeleteTask = (id) => {
        api.delete(`/api/DeleteTasks:${id}`)
            .then(() => {
                fetchTasks();
            })
            .catch((error) => console.error(error));
    };

    const handleTitleChange = (id, value) => {
        setUpdatedTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, title: value } : task
            )
        );
    };

    const handleDescriptionChange = (id, value) => {
        setUpdatedTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, description: value } : task
            )
        );
    };

    return (
        <div className="task-list-container">
            <h2>Task List</h2>
            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task.id} className="task-item">
                        <input
                            type="text"
                            value={updatedTasks.find(updatedTask => updatedTask.id === task.id).title}
                            onChange={(e) => handleTitleChange(task.id, e.target.value)}
                        />
                        <input
                            type="text"
                            value={updatedTasks.find(updatedTask => updatedTask.id === task.id).description}
                            onChange={(e) => handleDescriptionChange(task.id, e.target.value)}
                        />
                        <button onClick={() => handleUpdateTask(task.id)}>Update</button>
                        {task.title} - {task.description}
                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
