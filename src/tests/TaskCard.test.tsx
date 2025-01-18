import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { TaskCard } from "../components/TaskCard";
import "@testing-library/jest-dom"; // Import jest-dom matchers

describe("TaskCard", () => {
  const mockTask = {
    id: "1",
    title: "Test Task",
    description: "Test Description",
    completed: false,
    createdAt: new Date(),
    priority: "medium" as const,
  };

  const mockToggleComplete = vi.fn();
  const mockDelete = vi.fn();
  const mockUpdate = vi.fn();

  it("renders task details correctly", () => {
    render(
      <BrowserRouter>
        <TaskCard
          task={mockTask}
          onToggleComplete={mockToggleComplete}
          onDelete={mockDelete}
          onUpdate={mockUpdate}
        />
      </BrowserRouter>
    );

    expect(screen.getByText(mockTask.title)).toBeInTheDocument();
    expect(screen.getByText(mockTask.description)).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <BrowserRouter>
        <TaskCard
          task={mockTask}
          onToggleComplete={mockToggleComplete}
          onDelete={mockDelete}
          onUpdate={mockUpdate}
        />
      </BrowserRouter>
    );

    const deleteButton = screen.getByRole("button", { name: /delete task/i });
    fireEvent.click(deleteButton);
    expect(mockDelete).toHaveBeenCalledWith(mockTask.id);
  });
});
