import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function App() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (!inputValue.trim()) {
            return;
        }
        setTasks([...tasks, { id: Date.now(), text: inputValue.trim(), completed: false }]);
        setInputValue('');
    };

    const handleTaskDelete = (taskId) => {
        const filteredTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(filteredTasks);
    };

    const handleTaskToggle = (taskId) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const handleAllTasksComplete = () => {
        const completedTasks = tasks.map(task => {
            return {...task, completed: true};
        });
        setTasks(completedTasks);
    };

    return (
        <div className="container">
            <h2>Todo List</h2>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    placeholder="Escreva uma nova tarefa!"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button type="submit">Adicionar</button>
            </form>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <label>
                            <input type="checkbox" checked={task.completed} onChange={() => handleTaskToggle(task.id)} />
                            {task.text}
                        </label>
                        <button onClick={() => handleTaskDelete(task.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </li>
                ))}
            </ul>
            <div className="button-container">
                <button
                    className="delete-completed"
                    onClick={() => setTasks(tasks.filter(task => !task.completed))}
                >
                    Excluir tarefas já feitas
                </button>
                <button
                    className="complete-all"
                    onClick={handleAllTasksComplete}
                >
                    Concluir todas as tarefas
                </button>
            </div>
        </div>
    );
}

export default App;
