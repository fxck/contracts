// @ts-check

/**
 * Current version of the todo API contract.
 * Bump this whenever the Todo shape or validation changes.
 * @type {string}
 */
export const API_VERSION = '1.0.0';

/**
 * A single todo item exchanged between the api and web services.
 * @typedef {Object} Todo
 * @property {number} id     Unique identifier (assigned by the database).
 * @property {string} title  Human-readable description.
 * @property {boolean} done  Whether the todo has been completed.
 */

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
    typeof t.done === 'boolean'
  );
}
