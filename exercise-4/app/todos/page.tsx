import clientPromise from "@/app/lib/mongodb";
import TodoForm from "@/app/components/TodoForm";
import TodoList from "@/app/components/TodoList";

type Props = {
  searchParams: Promise<{
    search?: string;
    status?: string;
  }>;
};

export default async function TodosPage({ searchParams }: Props) {
  const params = await searchParams;

  const search = params.search || "";
  const status = params.status || "all";

  const client = await clientPromise;

  const db = client.db("AD8");

  const query: {
    title?: {
      $regex: string;
      $options: string;
    };
    completed?: boolean;
  } = {};

  // SEARCH
  if (search) {
    query.title = {
      $regex: search,
      $options: "i",
    };
  }

  // FILTER
  if (status === "completed") {
    query.completed = true;
  }

  if (status === "incomplete") {
    query.completed = false;
  }

  // GET TODOS
  const todos = await db.collection("todos").find(query).toArray();

  // PRIORITY SORT
  const priorityOrder = {
    high: 3,
    medium: 2,
    low: 1,
  };

  todos.sort((a, b) => {
    const aPriority =
      priorityOrder[a.priority as keyof typeof priorityOrder] || 0;

    const bPriority =
      priorityOrder[b.priority as keyof typeof priorityOrder] || 0;

    return bPriority - aPriority;
  });

  // SERIALIZE
  const serializedTodos = todos.map((todo) => ({
    _id: todo._id.toString(),

    title: todo.title,

    completed: todo.completed,

    priority: todo.priority as "low" | "medium" | "high",

    createdAt: todo.createdAt.toISOString(),

    updatedAt: todo.updatedAt.toISOString(),
  }));

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        {/* HEADER */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Advanced Todo App
          </h1>

          <p className="mt-2 text-gray-500">
            Organize your tasks, priorities and progress.
          </p>
        </div>

        {/* ADD TODO */}

        <TodoForm />

        {/* SEARCH & FILTER */}

        <div className="my-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-semibold text-gray-900">Search & Filter</h2>

          <form className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              name="search"
              placeholder="Search todos..."
              defaultValue={search}
              className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <select
              name="status"
              defaultValue={status}
              className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">All Todos</option>

              <option value="completed">Completed</option>

              <option value="incomplete">Incomplete</option>
            </select>

            <button
              type="submit"
              className="rounded-xl bg-gray-900 px-6 py-3 font-medium text-white transition hover:bg-gray-700"
            >
              Search
            </button>
          </form>
        </div>

        {/* RESULT COUNT */}

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Your Todos</h2>

          <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-600">
            {serializedTodos.length} tasks
          </span>
        </div>

        {/* TODOS */}

        <TodoList todos={serializedTodos} />
      </div>
    </main>
  );
}
