"use client";

import { useActionState } from "react";
import { createTodoAction } from "@/app/actions/todoActions";

const initialState = {
  success: false,
  message: "",
};

export default function TodoForm() {
  const [state, formAction, isPending] = useActionState(
    createTodoAction,
    initialState
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Add New Todo
      </h2>

      <form action={formAction}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            name="title"
            placeholder="What needs to be done?"
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <select
            name="priority"
            defaultValue="medium"
            className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="low">
              Low Priority
            </option>

            <option value="medium">
              Medium Priority
            </option>

            <option value="high">
              High Priority
            </option>
          </select>

          <button
            type="submit"
            disabled={isPending}
            className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {isPending ? "Adding..." : "+ Add Todo"}
          </button>
        </div>

        {state?.message && (
          <p
            className={`mt-3 text-sm font-medium ${
              state.success
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
}