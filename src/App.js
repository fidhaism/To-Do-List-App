// App.js

import React, { useState } from 'react';
import { Input, Button, List, Typography, Checkbox } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './App.css';

const { Title } = Typography;

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: inputValue, isCompleted: false }]);
      setInputValue('');
    }
  };

  const handleDeleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = id => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };

  const handleSaveTask = (id, newText) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, text: newText, isEditing: false } : task
      )
    );
  };

  const handleToggleComplete = id => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const renderTask = (tasks, actionHandlers) => task => (
    <List.Item
      style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}
      actions={[
        <Button
          type="primary"
          onClick={() => actionHandlers.handleEditTask(task.id)}
          icon={<EditOutlined />}
        />,
        <Button
          type="danger"
          onClick={() => actionHandlers.handleDeleteTask(task.id)}
          icon={<DeleteOutlined />}
        />,
      ]}
    >
      <Checkbox
        checked={task.isCompleted}
        onChange={() => actionHandlers.handleToggleComplete(task.id)}
      />
      {task.isEditing ? (
        <Input
          defaultValue={task.text}
          autoFocus
          onPressEnter={(e) => actionHandlers.handleSaveTask(task.id, e.target.value)}
          onBlur={(e) => actionHandlers.handleSaveTask(task.id, e.target.value)}
        />
      ) : (
        <span onClick={() => actionHandlers.handleToggleComplete(task.id)}>
          {task.text}
        </span>
      )}
    </List.Item>
  );

  const activeTasks = tasks.filter(task => !task.isCompleted);
  const completedTasks = tasks.filter(task => task.isCompleted);

  return (
    <div className="app-container">
      <Title level={2} className="title-center">To-Do List</Title>
      <div className="add-task">
        <Input
          placeholder="Enter task"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button type="primary" onClick={handleAddTask}>
          Add
        </Button>
      </div>
      <div className="task-list-container">
        <div className="task-list">
          <Title level={4}>Active Tasks</Title>
          <List
            dataSource={activeTasks}
            renderItem={renderTask(activeTasks, {
              handleEditTask,
              handleDeleteTask,
              handleToggleComplete,
              handleSaveTask
            })}
          />
        </div>
        <div className="completed-task-list">
          <Title level={4}>Completed Tasks</Title>
          <List
            dataSource={completedTasks}
            renderItem={renderTask(completedTasks, {
              handleEditTask,
              handleDeleteTask,
              handleToggleComplete,
              handleSaveTask
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
