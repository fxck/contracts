import test from 'node:test';
import assert from 'node:assert/strict';
import { API_VERSION, validateTodo } from './index.js';

test('API_VERSION is a semver string', () => {
  assert.match(API_VERSION, /^\d+\.\d+\.\d+$/);
});

test('validateTodo accepts a well-formed todo', () => {
  assert.equal(validateTodo({ id: 1, title: 'buy milk', done: false, priority: 'low', dueDate: null }), true);
  assert.equal(validateTodo({ id: 2, title: 'done thing', done: true, priority: 'high', dueDate: '2026-08-01' }), true);
  assert.equal(validateTodo({ id: 3, title: 'mid', done: false, priority: 'medium', dueDate: null }), true);
});

test('validateTodo accepts both a null and an ISO-8601 dueDate', () => {
  assert.equal(validateTodo({ id: 1, title: 'no due date', done: false, priority: 'low', dueDate: null }), true);
  assert.equal(validateTodo({ id: 2, title: 'due', done: false, priority: 'low', dueDate: '2026-12-31' }), true);
});

test('validateTodo rejects malformed values', () => {
  assert.equal(validateTodo(null), false);
  assert.equal(validateTodo(undefined), false);
  assert.equal(validateTodo('nope'), false);
  assert.equal(validateTodo({ id: '1', title: 'x', done: false, priority: 'low', dueDate: null }), false);
  assert.equal(validateTodo({ id: 1, title: 'x', priority: 'low', dueDate: null }), false);
  assert.equal(validateTodo({ id: 1, done: false, priority: 'low', dueDate: null }), false);
});

test('validateTodo rejects a todo with a missing priority', () => {
  assert.equal(validateTodo({ id: 1, title: 'no priority', done: false, dueDate: null }), false);
});

test('validateTodo rejects a todo with an invalid priority', () => {
  assert.equal(validateTodo({ id: 1, title: 'bad priority', done: false, priority: 'urgent', dueDate: null }), false);
});

test('validateTodo rejects a todo with a missing dueDate', () => {
  assert.equal(validateTodo({ id: 1, title: 'no due field', done: false, priority: 'low' }), false);
});

test('validateTodo rejects a todo with a non-ISO dueDate', () => {
  assert.equal(validateTodo({ id: 1, title: 'bad date', done: false, priority: 'low', dueDate: 'next week' }), false);
  assert.equal(validateTodo({ id: 2, title: 'numeric date', done: false, priority: 'low', dueDate: 20260801 }), false);
});
