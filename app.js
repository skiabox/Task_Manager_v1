// Define UI Vars
const form = document.querySelector('#task-form'); // get a variable on the form
const taskList = document.querySelector('.collection'); // get a variable on the collection we create by adding tasks
const clearBtn = document.querySelector('.clear-tasks'); // get a variable to this a link with a style for button
const filter = document.querySelector('#filter'); // get a variable to input field that gets the search text
const taskInput = document.querySelector('#task');

// Store Task function
const storeTaskInLocalStorage = task => {
  let tasks;
  // -->First check if there is a task already saved
  // Check if local storage is empty
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks')); // get tasks array from local storage where everything is a string (so we use JSON.parse to get the stringified array as a normal javascript array)
  }

  tasks.push(task);

  // Save the array to the local storage after we stringify it
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Get Tasks from Local Storage function
const getTasks = () => {
  let tasks;
  // -->First check if there is a task already saved
  // Check if local storage is empty
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks')); // get tasks array from local storage where everything is a string (so we use JSON.parse to get the stringified array as a normal javascript array)
  }

  tasks.forEach(task => {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task)); // task is an item in the array of tasks
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
};

// Remove task from Local Storage
const removeTaskFromLocalStorage = taskItem => {
  // console.log(taskItem); // returns a li item
  let tasks;
  // -->First check if there is a task already saved
  // Check if local storage is empty
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks')); // get tasks array from local storage where everything is a string (so we use JSON.parse to get the stringified array as a normal javascript array of strings)
  }

  // Loop the array of strings
  tasks.forEach((task, index) => {
    console.log('This is the task we removed:', task);
    // check if the li item text content matches with the task (text item) contained in the array
    if (taskItem.textContent === task) {
      tasks.splice(index, 1); // index is the position in the array, second argument is the number of items to remove
    }
  });

  // Set the local storage with the new altered array
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Clear Tasks from Local Storage
const clearTasksFromLocalStorage = () => {
  localStorage.clear();
};

// --> define arrow functions before they are used
// Add Task function
const addTask = e => {
  if (taskInput.value === '') {
    alert('Add a task');
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value)); // taskInput.value is what we typed at new task field
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in Local Storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear inout
  taskInput.value = '';

  e.preventDefault();
};

// Remove task function
const removeTask = e => {
  // target the delete item (we want the a tag) - li is parent of a which is parent of i
  // we click the a tag and we want to delete the li tag
  if (e.target.parentElement.classList.contains('delete-item')) {
    // console.log(e.target);
    if (window.confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
};

// Clear Tasks function
const clearTasks = () => {
  // taskList.innerHTML = '';
  // Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from Local Storage
  clearTasksFromLocalStorage();
};

// Filter Tasks function
const filterTasks = e => {
  const text = e.target.value.toLowerCase(); // input from the filter text field
  console.log(text);
  // we can use forEach because querySelectorAll returns a nodelist
  document.querySelectorAll('.collection-item').forEach(task => {
    console.log(task);
    // returns the task (in this case the list item)
    /* 
    <li class="collection-item" style="display: none|block;">
      "Task One"
      <a class="delete-item secondary-content"></a>
    </li>
    */
    const item = task.firstChild.textContent; // text content is the first child of the li item AND a tag is the second child of the li item
    console.log(item); // returns the first child text content (in this case Task One)

    if (item.toLowerCase().indexOf(text) !== -1) {
      // If no match found the indexOf string method returns -1, so on this case we found a match
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
};

// Load all event listeners
const loadEventListeners = () => {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
};

// Load all event listeners
loadEventListeners();
