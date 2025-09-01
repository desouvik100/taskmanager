import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Plus, Filter, Search } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import './Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: ''
  });

  const fetchTasks = useCallback(async () => {
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;

      const response = await axios.get('/api/tasks', { params });
      setTasks(response.data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [filters.status, filters.priority]);

  useEffect(() => {
    // Set axios base URL for this component
    axios.defaults.baseURL = API_BASE_URL;
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async (taskData) => {
    try {
      const response = await axios.post('/api/tasks', taskData);
      setTasks([response.data, ...tasks]);
      setShowForm(false);
      toast.success('Task created successfully!');
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const handleUpdateTask = async (taskId, taskData) => {
    try {
      const response = await axios.put(`/api/tasks/${taskId}`, taskData);
      setTasks(tasks.map(task => 
        task._id === taskId ? response.data : task
      ));
      setEditingTask(null);
      toast.success('Task updated successfully!');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleToggleStatus = async (taskId) => {
    try {
      const response = await axios.patch(`/api/tasks/${taskId}/toggle`);
      setTasks(tasks.map(task => 
        task._id === taskId ? response.data : task
      ));
      toast.success('Task status updated!');
    } catch (error) {
      toast.error('Failed to update task status');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await axios.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
      toast.success('Task deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const filteredTasks = tasks.filter(task => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return task.title.toLowerCase().includes(searchLower) ||
             task.description?.toLowerCase().includes(searchLower);
    }
    return true;
  });

  const taskStats = {
    total: tasks.length,
    pending: tasks.filter(task => task.status === 'pending').length,
    completed: tasks.filter(task => task.status === 'completed').length
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div className="dashboard-title">
            <h1>My Tasks</h1>
            <div className="task-stats">
              <span className="stat">Total: {taskStats.total}</span>
              <span className="stat pending">Pending: {taskStats.pending}</span>
              <span className="stat completed">Completed: {taskStats.completed}</span>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
          >
            <Plus size={16} />
            Add Task
          </button>
        </div>

        <div className="dashboard-filters">
          <div className="search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="form-control"
            />
          </div>

          <div className="filter-group">
            <Filter size={16} />
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="form-control"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={filters.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              className="form-control"
            >
              <option value="">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <TaskList
          tasks={filteredTasks}
          onToggleStatus={handleToggleStatus}
          onEditTask={setEditingTask}
          onDeleteTask={handleDeleteTask}
        />

        {(showForm || editingTask) && (
          <TaskForm
            task={editingTask}
            onSubmit={editingTask ? 
              (data) => handleUpdateTask(editingTask._id, data) : 
              handleCreateTask
            }
            onCancel={() => {
              setShowForm(false);
              setEditingTask(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;