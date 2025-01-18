import React from "react";
import { useState, useEffect } from "react";
import { Task, TaskPriority } from "../types/task";

export type SortBy = "date" | "priority" | "custom";
export type FilterStatus = "all" | "completed" | "incomplete";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      return JSON.parse(saved).map((task: Task) => ({
        ...task,
        createdAt: new Date(task.createdAt),
      }));
    }
    return [];
  });

  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (
    title: string,
    description: string,
    priority: TaskPriority
  ) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      createdAt: new Date(),
      priority,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (
    id: string,
    title: string,
    description: string,
    priority: TaskPriority
  ) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title, description, priority } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const reorderTasks = (startIndex: number, endIndex: number) => {
    setTasks((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
    setSortBy("custom");
  };

  const filteredAndSortedTasks = tasks
    .filter((task) => {
      if (filterStatus === "completed") return task.completed;
      if (filterStatus === "incomplete") return !task.completed;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "custom") return 0;
      if (sortBy === "date") {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

  return {
    tasks: filteredAndSortedTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    reorderTasks,
    sortBy,
    setSortBy,
    filterStatus,
    setFilterStatus,
  };
}
