import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Flag } from "lucide-react";
import { useTasks } from "../hooks/useTasks";
import { formatDate } from "../lib/utils";

export function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { tasks, toggleComplete } = useTasks();
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Task not found
          </h2>
          <Link
            to="/"
            className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to tasks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-gradient-to-tr from-red-200 via-pink-300 to-violet-200">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to tasks
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
            <button
              onClick={() => toggleComplete(task.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                task.completed
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {task.completed ? "Completed" : "Mark as Complete"}
            </button>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(task.createdAt)}
            </div>
            <div className="flex items-center">
              <Flag className="w-4 h-4 mr-1" />
              {task.priority}
            </div>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">
              {task.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
