import { useEffect, useState } from "react";
const { VITE_API_URL } = import.meta.env;

export default function useTasks() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`${VITE_API_URL}/tasks`)
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error("Error fetching tasks:", error));
    }, []);

    const addTask = async newTask => {
        const response = await fetch(`${VITE_API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        });
        const data = await response.json();
        const { success, message, task } = data;

        if (!success) {
            throw new Error("Error adding task: " + message);
        }

        setTasks(prevTasks => [...prevTasks, task]);
    };

    const removeTask = async (taskId) => {
      const response = await fetch(`${VITE_API_URL}/tasks/${taskId}`, {
        method: "DELETE",
      });
      const { success, message } = await response.json();
      if (!success) {
        throw new Error("Error removing task: " + message);
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };

    const updateTask = async (updatedTask) => {
      const response = await fetch(`${VITE_API_URL}/tasks/${updatedTask.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        });

        const { success, message } = await response.json();
        if (!success) {
            throw new Error("Error updating task: " + message);
        }

        setTasks(prevTasks => 
            prevTasks.map(task => 
                task.id === updatedTask.id ? { ...task, ...updatedTask } : task
            )
        );
    };

    return { tasks, addTask, removeTask, updateTask };
}