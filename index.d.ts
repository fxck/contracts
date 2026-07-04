/** Current version of the todo API contract. */
export declare const API_VERSION: string;

/** A single todo item exchanged between the api and web services. */
export interface Todo {
  /** Unique identifier (assigned by the database). */
  id: number;
  /** Human-readable description. */
  title: string;
  /** Whether the todo has been completed. */
  done: boolean;
  /** Relative importance of the todo. */
  priority: "low" | "medium" | "high";
  /** ISO-8601 date the todo is due (e.g. "2026-08-01"), or null when unset. */
  dueDate: string | null;
}

/** Validate that an unknown value conforms to the {@link Todo} shape. */
export declare function validateTodo(value: unknown): value is Todo;
