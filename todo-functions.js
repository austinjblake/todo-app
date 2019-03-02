// Fetch existing todos from localStorage
const getSavedTodos = () => {
  const todoJSON = localStorage.getItem('todos');
  return todoJSON ?  JSON.parse(todoJSON) : [];
}

// Save todos to localStorage
const saveTodos = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Remove todo by id
const removeTodo = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
}

// Toggle the completed value for a given todo
const toggleTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
}

// Render application todos based on filters
const renderTodos = (todos, filter) => {

  const filteredTodos = todos.filter((todo) => {
    const searchTextMatch = todo.text.toLowerCase().includes (filter.searchText.toLowerCase());
    const hideCompletedMatch = !filter.hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  })
  
  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);
  
  document.querySelector('#todos').innerHTML = '';
  
  document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos));
  
  filteredTodos.forEach((todo) => {
    document.querySelector('#todos').appendChild(generateTodoDOM(todo));
  })
  
}

// Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
  const todoEl = document.createElement('div');
  const newText = document.createElement('span');
  const button = document.createElement('button');
  const checkbox = document.createElement('input');

  // Setup the todo checkbox
  checkbox.setAttribute('type', 'checkbox');
  checkbox.checked = todo.completed;
  todoEl.appendChild(checkbox);
  checkbox.addEventListener('change', (e) => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filter);
  })
  
  // Setup the todo text
  newText.textContent = todo.text;
  todoEl.appendChild(newText);

  // Setup the remove button
  button.textContent = 'x';
  todoEl.appendChild(button);
  button.addEventListener('click', (e) => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filter)
  })

  return todoEl;
}

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement('h3');
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
}