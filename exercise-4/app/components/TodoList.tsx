"use client";

import { useState } from "react";
import {
  bulkDeleteTodos,
  markSelectedComplete,
  markAllComplete,
  markAllIncomplete,
} from "@/app/actions/todoActions";

import { timeAgo } from "@/app/lib/timeAgo";

type Todo = {
  _id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
};

export default function TodoList({
  todos,
}: {
  todos: Todo[];
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    setSelectedIds((previous) =>
      previous.includes(id)
        ? previous.filter((todoId) => todoId !== id)
        : [...previous, id]
    );
  };

  const priorityStyle = {
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-green-100 text-green-700",
  };

  return (
    <div className="space-y-5">
      {/* TODO LIST */}

      <div className="space-y-3">
        {todos.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
            <div className="mb-3 text-4xl">
              📝
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              No todos found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Add your first todo above.
            </p>
          </div>
        )}

        {todos.map((todo) => (
          <div
            key={todo._id}
            className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <input
              type="checkbox"
              checked={selectedIds.includes(todo._id)}
              onChange={() => handleSelect(todo._id)}
              className="mt-1 h-5 w-5 cursor-pointer accent-blue-600"
            />

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3
                  className={`font-semibold ${
                    todo.completed
                      ? "text-gray-400 line-through"
                      : "text-gray-900"
                  }`}
                >
                  {todo.title}
                </h3>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                    priorityStyle[todo.priority]
                  }`}
                >
                  {todo.priority}
                </span>

                {todo.completed && (
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    Completed
                  </span>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-5 text-xs text-gray-400">
                <span>
                  Created {timeAgo(todo.createdAt)}
                </span>

                <span>
                  Updated {timeAgo(todo.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SELECTED ACTIONS */}

      {todos.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {/* COMPLETE SELECTED */}

          <form action={markSelectedComplete}>
            {selectedIds.map((id) => (
              <input
                key={id}
                type="hidden"
                name="todoIds"
                value={id}
              />
            ))}

            <button
              type="submit"
              disabled={selectedIds.length === 0}
              className="rounded-xl bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              ✓ Complete Selected
            </button>
          </form>

          {/* DELETE SELECTED */}

          <form action={bulkDeleteTodos}>
            {selectedIds.map((id) => (
              <input
                key={id}
                type="hidden"
                name="todoIds"
                value={id}
              />
            ))}

            <button
              type="submit"
              disabled={selectedIds.length === 0}
              className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Delete Selected
            </button>
          </form>
        </div>
      )}

      {/* ALL ACTIONS */}

      {todos.length > 0 && (
        <div className="flex flex-wrap gap-3 border-t border-gray-200 pt-5">
          <form action={markAllComplete}>
            <button
              type="submit"
              className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Mark All Complete
            </button>
          </form>

          <form action={markAllIncomplete}>
            <button
              type="submit"
              className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Mark All Incomplete
            </button>
          </form>
        </div>
      )}
    </div>
  );
}