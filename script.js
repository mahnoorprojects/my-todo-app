// Grabbing elements
const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

/**
 * Saving all tasks to localStorage
 */
function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li span').forEach((span) => {
    tasks.push(span.textContent);
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

/**
 * Creating a task <li> element w/ remove button
 */
function createTaskElement(taskText) {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = taskText;

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.classList.add('remove-btn');

  removeBtn.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(span);
  li.appendChild(removeBtn);

  return li;
}

/**
 * Loading tasks from localStorage on page load
 */
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) => {
    const li = createTaskElement(task);
    taskList.appendChild(li);
  });
}

/**
 * Adding task from input field
 */
function addTask() {
  const task = taskInput.value.trim();
  if (!task) {
    alert('Please enter a task!');
    return;
  }

  const li = createTaskElement(task);
  taskList.appendChild(li);

  taskInput.value = '';
  taskInput.focus();

  saveTasks();
}

// Adding event listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

// Loading existing tasks on startup
loadTasks();

});