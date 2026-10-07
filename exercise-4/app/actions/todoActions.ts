"use server";

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

import clientPromise from "@/app/lib/mongodb";
import {
  DB_NAME,
  TODOS_COLLECTION,
} from "@/app/lib/db";

type Priority = "low" | "medium" | "high";

type FormState = {
  success: boolean;
  message: string;
};

export async function createTodoAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const title = formData.get("title")?.toString().trim();

    const priority =
      (formData.get("priority")?.toString() as Priority) ||
      "medium";

    if (!title) {
      return {
        success: false,
        message: "Title is required",
      };
    }

    const client = await clientPromise;

    const db = client.db(DB_NAME);
    const todos = db.collection(TODOS_COLLECTION);

    const result = await todos.insertOne({
      title,
      completed: false,
      priority,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("Created Todo:", result.insertedId);
    console.log("Database:", DB_NAME);

    revalidatePath("/todos", "page");

    return {
      success: true,
      message: "Todo created successfully!",
    };
  } catch (error) {
    console.error("CREATE ERROR:", error);

    return {
      success: false,
      message: "Failed to create todo",
    };
  }
}

// COMPLETE SELECTED
export async function markSelectedComplete(
  formData: FormData
) {
  const ids = formData
    .getAll("todoIds")
    .map((id) => id.toString());

  if (ids.length === 0) return;

  const objectIds = ids.map((id) => new ObjectId(id));

  const client = await clientPromise;

  const db = client.db(DB_NAME);
  const todos = db.collection(TODOS_COLLECTION);

  await todos.updateMany(
    {
      _id: {
        $in: objectIds,
      },
    },
    {
      $set: {
        completed: true,
        updatedAt: new Date(),
      },
    }
  );

  revalidatePath("/todos", "page");
}

// DELETE SELECTED
export async function bulkDeleteTodos(
  formData: FormData
) {
  const ids = formData
    .getAll("todoIds")
    .map((id) => id.toString());

  if (ids.length === 0) return;

  const objectIds = ids.map((id) => new ObjectId(id));

  const client = await clientPromise;

  const db = client.db(DB_NAME);
  const todos = db.collection(TODOS_COLLECTION);

  await todos.deleteMany({
    _id: {
      $in: objectIds,
    },
  });

  revalidatePath("/todos", "page");
}

// MARK ALL COMPLETE
export async function markAllComplete() {
  const client = await clientPromise;

  const db = client.db(DB_NAME);
  const todos = db.collection(TODOS_COLLECTION);

  await todos.updateMany(
    {},
    {
      $set: {
        completed: true,
        updatedAt: new Date(),
      },
    }
  );

  revalidatePath("/todos", "page");
}

// MARK ALL INCOMPLETE
export async function markAllIncomplete() {
  const client = await clientPromise;

  const db = client.db(DB_NAME);
  const todos = db.collection(TODOS_COLLECTION);

  await todos.updateMany(
    {},
    {
      $set: {
        completed: false,
        updatedAt: new Date(),
      },
    }
  );

  revalidatePath("/todos", "page");
}