import { Todo } from '@/models/Todo';
import { test, expect, type Page } from '@playwright/test';

const setupMockBackend = async (page: Page, path: string, json: any) => {
  // https://playwright.dev/docs/mock
  await page.route(`http://localhost:8080${path}`, async route => {
    await route.fulfill({ json });
  });
}

test.beforeEach(async ({ page }) => {

  setupMockBackend(page, "/todos", [])

  await page.goto('/todos');

  const json: Todo[] = [
    {
      id: 1,
      title: "buy some cheese",
      completed: false,
      createdAt: "",
      updatedAt: ""
    },
    {
      id: 2,
      title: "feed the cat",
      completed: false,
      createdAt: "",
      updatedAt: ""
    },
    {
      id: 3,
      title: "book a doctors appointment",
      completed: false,
      createdAt: "",
      updatedAt: ""
    }
  ]
  setupMockBackend(page, "/todos", json)
});

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
];

test.describe('New Todo', () => {

  test.afterEach(async ({ page }) => {
    const buttons = page.getByRole("button", { name: "Del" })
    for (let i = 0; i < await buttons.count(); i++) {
      await buttons.nth(i).click();
    }
  });

  test('should allow me to add todo items', async ({ page }) => {

    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?');

    // Create 1st todo.
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press('Enter');

    // Make sure the list only has one todo item.
    await expect(page.getByTestId('todo-title').first())
      .toHaveValue(TODO_ITEMS[0]);

    // Create 2nd todo.
    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press('Enter');

    // Make sure the list now has two todo items.
    await expect(page.getByTestId('todo-title').nth(0))
      .toHaveValue(TODO_ITEMS[0]);
    await expect(page.getByTestId('todo-title').nth(1))
      .toHaveValue(TODO_ITEMS[1]);
  });

  test('should clear text input field when an item is added', async ({ page }) => {

    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?');

    // Create one todo item.
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press('Enter');

    // Check that input is empty.
    await expect(newTodo).toBeEmpty();
  });

  test('should append new items to the bottom of the list', async ({ page }) => {

    await page.goto('/todos');

    // create a todo count locator
    const todoCount = page.getByTestId('todo-count')

    // Check test using different methods.
    await expect(page.getByText('3 items left')).toBeVisible();
    await expect(todoCount).toHaveText('3 items left');
    await expect(todoCount).toContainText('3');
    await expect(todoCount).toHaveText(/3/);

    // input cnanot check all items in one call.
    await expect(page.getByTestId('todo-title').nth(0)).toHaveValue(TODO_ITEMS[0]);
    await expect(page.getByTestId('todo-title').nth(1)).toHaveValue(TODO_ITEMS[1]);
    await expect(page.getByTestId('todo-title').nth(2)).toHaveValue(TODO_ITEMS[2]);
  });
});

async function createDefaultTodos(page: Page) {
  // create a new todo locator
  const newTodo = page.getByPlaceholder('What needs to be done?');

  for (const item of TODO_ITEMS) {
    await newTodo.fill(item);
    await newTodo.press('Enter');
    // fix random failure
    await page.waitForTimeout(1000)
  }
}
