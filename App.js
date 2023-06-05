import React from 'react';
import TaskForm from '../src/components/TaskForm';
import TaskList from '../src/components/TaskList';
import '../src/components/Styles/App.css';

function App() {
  return (
    <div className="app-container">
      <h1 className="app-header">Task Management</h1>
      <div className="app-content">
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
}

export default App;
