import React from 'react';
import { Check, Clock, Edit, Trash2, Calendar, AlertCircle } from 'lucide-react';
import './TaskList.css';

const TaskList = ({ tasks, onToggleStatus, onEditTask, onDeleteTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <Clock size={48} />
        <h3>No tasks found</h3>
        <p>Create your first task to get started!</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div
          key={task._id}
          className={`task-item ${task.status === 'completed' ? 'completed' : ''} ${isOverdue(task.dueDate) && task.status === 'pending' ? 'overdue' : ''}`}
        >
          <div className="task-content">
            <div className="task-header">
              <button
                onClick={() => onToggleStatus(task._id)}
                className={`status-toggle ${task.status}`}
                title={task.status === 'pending' ? 'Mark as completed' : 'Mark as pending'}
              >
                {task.status === 'completed' ? <Check size={16} /> : <Clock size={16} />}
              </button>
              
              <div className="task-info">
                <h3 className="task-title">{task.title}</h3>
                {task.description && (
                  <p className="task-description">{task.description}</p>
                )}
              </div>

              <div className="task-actions">
                <button
                  onClick={() => onEditTask(task)}
                  className="btn-icon"
                  title="Edit task"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDeleteTask(task._id)}
                  className="btn-icon delete"
                  title="Delete task"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="task-meta">
              <span
                className="priority-badge"
                style={{ backgroundColor: getPriorityColor(task.priority) }}
              >
                {task.priority}
              </span>

              {task.dueDate && (
                <div className={`due-date ${isOverdue(task.dueDate) && task.status === 'pending' ? 'overdue' : ''}`}>
                  {isOverdue(task.dueDate) && task.status === 'pending' && (
                    <AlertCircle size={14} />
                  )}
                  <Calendar size={14} />
                  <span>{formatDate(task.dueDate)}</span>
                </div>
              )}

              <span className="task-date">
                Created {formatDate(task.createdAt)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;