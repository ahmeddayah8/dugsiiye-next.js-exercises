import { ObjectId } from "mongodb";

export type Priority = "low" | "medium" | "high";

export interface Todo {
  _id?: ObjectId;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: Date;
  updatedAt: Date;
}