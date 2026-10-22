const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const remainingCount = document.getElementById("remaining-count");

function updateRemainingCount() {
  const remainingTasks = todoList.querySelectorAll(
    ".todo-item:not(.completed)",
  );

  const count = remainingTasks.length;
  remainingCount.textContent = `Còn ${count} việc chưa hoàn thành`;
}

function toggleTask(taskItem) {
  taskItem.classList.toggle("completed");
  updateRemainingCount();
}

function createTask(taskName) {
  const taskItem = document.createElement("li");
  taskItem.className = "todo-item";

  const toggleButton = document.createElement("button");
  toggleButton.className = "task-toggle";
  toggleButton.type = "button";

  const taskText = document.createElement("span");
  taskText.className = "task-text";
  taskText.textContent = taskName;

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.type = "button";
  deleteButton.textContent = "Xoá";

  taskItem.append(toggleButton, taskText, deleteButton);
  todoList.appendChild(taskItem);
}

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskName = todoInput.value.trim();

  if (taskName === "") {
    todoInput.focus();
    return;
  }

  createTask(taskName);
  todoInput.value = "";
  todoInput.focus();
  updateRemainingCount();
});

todoList.addEventListener("click", function (event) {
  const taskItem = event.target.closest(".todo-item");

  if (!taskItem) {
    return;
  }

  if (event.target.closest(".delete-button")) {
    taskItem.remove();
    updateRemainingCount();
    return;
  }

  if (
    event.target.closest(".task-toggle") ||
    event.target.classList.contains("task-text")
  ) {
    toggleTask(taskItem);
  }
});

updateRemainingCount();
