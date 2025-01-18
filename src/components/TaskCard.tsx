import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Circle, Clock, Flag, Pencil } from "lucide-react";
import { Task } from "../types/task";
import { cn, formatDate } from "../lib/utils";
import { TaskForm } from "./TaskForm";

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    title: string,
    description: string,
    priority: Task["priority"]
  ) => void;
}

const priorityColors = {
  low: "text-green-500",
  medium: "text-yellow-500",
  high: "text-red-500",
};

export function TaskCard({
  task,
  onToggleComplete,
  onDelete,
  onUpdate,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (
    title: string,
    description: string,
    priority: Task["priority"]
  ) => {
    onUpdate(task.id, title, description, priority);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <TaskForm
        initialTask={task}
        onSubmit={handleUpdate}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md p-4 transition-all duration-200",
        "hover:shadow-lg border border-gray-100",
        task.completed && "opacity-75"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <button
            onClick={() => onToggleComplete(task.id)}
            className="mt-1 focus:outline-none"
          >
            {task.completed ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400" />
            )}
          </button>
          <div>
            <Link
              to={`/task/${task.id}`}
              className="block font-medium text-gray-900 hover:text-blue-600"
            >
              <h3
                className={cn(
                  "text-lg font-semibold",
                  task.completed && "line-through text-gray-500"
                )}
              >
                {task.title}
              </h3>
            </Link>
            <p className="text-gray-600 mt-1 line-clamp-2">
              {task.description}
            </p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {formatDate(task.createdAt)}
              </div>
              <div className="flex items-center">
                <Flag
                  className={cn("w-4 h-4 mr-1", priorityColors[task.priority])}
                />
                {task.priority}
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-blue-500 focus:outline-none"
          >
            <Pencil className="w-5 h-5" />
          </button>
          <button
            name="delete"
            onClick={() => onDelete(task.id)}
            className="text-gray-400 hover:text-red-500 focus:outline-none"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
