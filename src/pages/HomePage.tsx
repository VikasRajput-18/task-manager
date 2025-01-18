import React from "react";
import { ListFilter, SortAsc } from "lucide-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { TaskForm } from "../components/TaskForm";
import { TaskCard } from "../components/TaskCard";
import { FilterStatus, SortBy, useTasks } from "../hooks/useTasks";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    reorderTasks,
    sortBy,
    setSortBy,
    filterStatus,
    setFilterStatus,
  } = useTasks();

  const navigate = useNavigate();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    reorderTasks(result.source.index, result.destination.index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-red-200 via-pink-300 to-violet-200">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <SortAsc className="w-5 h-5 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="date">Date</option>
                <option value="priority">Priority</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <ListFilter className="w-5 h-5 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value as FilterStatus)
                }
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <TaskForm onSubmit={addTask} />
          </div>
          <div className="lg:col-span-2">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="tasks">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    {tasks.length === 0 ? (
                      <div className="text-center py-12 bg-white rounded-lg">
                        <p className="text-gray-500">No tasks found</p>
                      </div>
                    ) : (
                      tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={
                                snapshot.isDragging ? "opacity-50" : ""
                              }
                              onClick={() => navigate(`/task/${task.id}`)}
                            >
                              <TaskCard
                                task={task}
                                onToggleComplete={toggleComplete}
                                onDelete={deleteTask}
                                onUpdate={updateTask}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
}
