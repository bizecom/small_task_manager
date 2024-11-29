import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from './../api/task';

function Task() {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({ current_page: 1, per_page: 5, total: 0 });
  const [newTask, setNewTask] = useState({ title: '', description: '', due_date: '' });
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [pagination.current_page]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks(pagination.current_page, pagination.per_page);
      setTasks(data.data);
      setPagination({
        current_page: data.current_page,
        per_page: data.per_page,
        total: data.total,
        last_page: data.last_page,
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async () => {
    try {
      const createdTask = await createTask({
        ...newTask,
        completed: false,
      });
      setTasks([...tasks, createdTask]);
      setNewTask({ title: '', description: '', due_date: '' });
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      reset();
    }
  };

  const handleUpdateTask = async () => {
    try {
      await updateTask(selectedTaskId, { ...newTask });
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      reset();
    }
  };

  const handleSelectTask = ({ id, createdDt, ...task }) => {
    setNewTask(task);
    setSelectedTaskId(id);
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      reset();
    }
  };

  const handlePageChange = (page) => {
    setPagination({ ...pagination, current_page: page });
  };

  const reset = () => {
    fetchTasks();
    setNewTask({ title: '', description: '', due_date: '' });
    setSelectedTaskId(null);
  }

  return (
    <div>
      <h1 className='text-2xl underlinem my-3'>Task Management</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <div className='flex gap-10 flex-col lg:flex-row'>
        <div className='flex flex-col gap-3'>
          <h3 className='text-lg my-3 font-weight-bolder uppercase'>Create a new task</h3>
          <input
            type="text"
            placeholder="Title"
            value={newTask?.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newTask?.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <input
            type="date"
            value={newTask?.due_date}
            onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
          />
          <button
            onClick={!selectedTaskId ? handleCreateTask : handleUpdateTask}>
            {!selectedTaskId ? 'Create' : 'Update'} Task
          </button>
        </div>

        <div className='flex-1'>
          <h3 className='text-lg my-3 font-weight-bolder uppercase'>Task List</h3>
          {tasks.map((task) => (
            <div key={task.id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p>Due Date: {task.due_date}</p>
              <div className='flex gap-5 my-3'>
                <button onClick={() => handleSelectTask(task)}>Update</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center my-5">
            <button
              onClick={() => handlePageChange(pagination.current_page - 1)}
              disabled={pagination.current_page <= 1}
            >
              Previous
            </button>
            <span>
              Page {pagination.current_page} of {pagination.last_page}
            </span>
            <button
              onClick={() => handlePageChange(pagination.current_page + 1)}
              disabled={pagination.current_page >= pagination.last_page}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;
