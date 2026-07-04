import test from 'node:test';
import assert from 'node:assert/strict';
import { API_VERSION, validateTodo } from './index.js';

test('API_VERSION is a semver string', () => {
  assert.match(API_VERSION, /^\d+\.\d+\.\d+$/);
});

test('validateTodo accepts a well-formed todo', () => {
  assert.equal(validateTodo({ id: 1, title: 'buy milk', done: false, priority: 'low' }), true);
  assert.equal(validateTodo({ id: 2, title: 'done thing', done: true, priority: 'high' }), true);
  assert.equal(validateTodo({ id: 3, title: 'mid', done: false, priority: 'medium' }), true);
});

test('validateTodo rejects malformed values', () => {
  assert.equal(validateTodo(null), false);
  assert.equal(validateTodo(undefined), false);
  assert.equal(validateTodo('nope'), false);
  assert.equal(validateTodo({ id: '1', title: 'x', done: false, priority: 'low' }), false);
  assert.equal(validateTodo({ id: 1, title: 'x', priority: 'low' }), false);
  assert.equal(validateTodo({ id: 1, done: false, priority: 'low' }), false);
});

test('validateTodo rejects a todo with a missing priority', () => {
  assert.equal(validateTodo({ id: 1, title: 'no priority', done: false }), false);
});

test('validateTodo rejects a todo with an invalid priority', () => {
  assert.equal(validateTodo({ id: 1, title: 'bad priority', done: false, priority: 'urgent' }), false);
});
