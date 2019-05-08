'use strict';

// Fetch existing todos from localStorage
const getSavedTodos = () => {
  const todoJSON = localStorage.getItem('todos');

  try {
    return todoJSON ?  JSON.parse(todoJSON) : [];
  } catch (e) {
    return [];
  }
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
  const todoEl = document.querySelector('#todos');
  const filteredTodos = todos.filter((todo) => {
    const searchTextMatch = todo.text.toLowerCase().includes (filter.searchText.toLowerCase());
    const hideCompletedMatch = !filter.hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  })
  
  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);
  
  todoEl.innerHTML = '';
  
  todoEl.appendChild(generateSummaryDOM(incompleteTodos));

  if (filteredTodos.length > 0) {
    filteredTodos.forEach((todo) => {
      todoEl.appendChild(generateTodoDOM(todo));
    })
  } else {
    const messageEl = document.createElement('p');
    messageEl.classList.add('empty-message');
    messageEl.textContent = 'No to-dos to show';
    todoEl.appendChild(messageEl);
  }

}

// Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
  const todoEl = document.createElement('label');
  const containerEl = document.createElement('div');
  const newText = document.createElement('span');
  const removeButton = document.createElement('button');
  const checkbox = document.createElement('input');

  // Setup the todo checkbox
  checkbox.setAttribute('type', 'checkbox');
  checkbox.checked = todo.completed;
  containerEl.appendChild(checkbox);
  checkbox.addEventListener('change', (e) => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filter);
  })
  
  // Setup the todo text
  newText.textContent = todo.text;
  containerEl.appendChild(newText);
  
  //Setup container
  todoEl.classList.add('list-item');
  containerEl.classList.add('list-item__container');
  todoEl.appendChild(containerEl);

  // Setup the remove button
  removeButton.textContent = 'remove';
  removeButton.classList.add('button', 'button--text');
  todoEl.appendChild(removeButton);
  removeButton.addEventListener('click', (e) => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filter)
  })


  return todoEl;
}

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement('h2');
  summary.classList.add('list-title');
  const plural = incompleteTodos.length === 1 ? '' : 's';
  summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`;
  return summary;
}