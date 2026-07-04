import test from 'node:test';
import assert from 'node:assert/strict';
import { API_VERSION, validateTodo } from './index.js';

test('API_VERSION is a semver string', () => {
  assert.match(API_VERSION, /^\d+\.\d+\.\d+$/);
});

test('validateTodo accepts a well-formed todo', () => {
  assert.equal(validateTodo({ id: 1, title: 'buy milk', done: false }), true);
  assert.equal(validateTodo({ id: 2, title: 'done thing', done: true }), true);
});

test('validateTodo rejects malformed values', () => {
  assert.equal(validateTodo(null), false);
  assert.equal(validateTodo(undefined), false);
  assert.equal(validateTodo('nope'), false);
  assert.equal(validateTodo({ id: '1', title: 'x', done: false }), false);
  assert.equal(validateTodo({ id: 1, title: 'x' }), false);
  assert.equal(validateTodo({ id: 1, done: false }), false);
});
