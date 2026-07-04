// @ts-check

/**
 * Current version of the todo API contract.
 * Bump this whenever the Todo shape or validation changes.
 * @type {string}
 */
export const API_VERSION = '1.2.0';

/**
 * A single todo item exchanged between the api and web services.
 * @typedef {Object} Todo
 * @property {number} id     Unique identifier (assigned by the database).
 * @property {string} title  Human-readable description.
 * @property {boolean} done  Whether the todo has been completed.
 * @property {"low" | "medium" | "high"} priority  Relative importance of the todo.
 * @property {string | null} dueDate  ISO-8601 date the todo is due (e.g. "2026-08-01"), or null when unset.
 */

/**
 * Matches an ISO-8601 calendar date such as "2026-08-01".
 * @type {RegExp}
 */
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Validate that an unknown value conforms to the {@link Todo} shape.
 * @param {unknown} value
 * @returns {value is Todo}
 */
export function validateTodo(value) {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const t = /** @type {Record<string, unknown>} */ (value);
  return (
    typeof t.id === 'number' &&
    typeof t.title === 'string' &&
    typeof t.done === 'boolean' &&
    (t.priority === 'low' || t.priority === 'medium' || t.priority === 'high') &&
    (t.dueDate === null || (typeof t.dueDate === 'string' && ISO_DATE.test(t.dueDate)))
  );
}
