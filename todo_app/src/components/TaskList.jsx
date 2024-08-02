import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // Initialize tasks as an empty array
  const [searchTerm, setSearchTerm] = useState('');
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    // Fetch tasks from JSON file
    axios.get('/data/tasks.json')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          console.error('Data fetched is not an array:', response.data);
          setTasks([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
        setTasks([]);
      });
  }, []);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    setTaskToEdit(null);
  };

  const handleToggleDone = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, done: !task.done } : task)));
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="task-list">
      <input 
        type="text" 
        placeholder="Search tasks..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <TaskForm 
        onAddTask={handleAddTask} 
        taskToEdit={taskToEdit} 
        onUpdateTask={handleUpdateTask} 
      />
      {filteredTasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggleDone={handleToggleDone} 
          onEditTask={handleEditTask} 
          onDeleteTask={handleDeleteTask} 
        />
      ))}
    </div>
  );
};

export default TaskList;
