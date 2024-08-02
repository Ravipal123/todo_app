import React, { useState } from 'react';

const TaskItem = ({ task, onToggleDone, onEditTask, onDeleteTask }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`task-item ${task.done ? 'done' : ''}`}>
      <div className="task-summary" onClick={() => setIsExpanded(!isExpanded)}>
        <h3>{task.title}</h3>
        <div>
          <button onClick={() => onToggleDone(task.id)}>
            {task.done ? 'Undo' : 'Mark as Done'}
          </button>
          <button className="edit" onClick={() => onEditTask(task)}>Edit</button>
          <button className="delete" onClick={() => onDeleteTask(task.id)}>Delete</button>
        </div>
      </div>
      {isExpanded && (
        <div className="task-details">
          <p>{task.description}</p>
          <small>Last updated: {new Date(task.timestamp).toLocaleString()}</small>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
