import React from 'react';
import TaskList from './components/TaskList';
import './index.css';

const App = () => (
  <div className="App">
    <h1 className='app-list'>Todo List</h1>
    <TaskList />
  </div>
);

export default App;
