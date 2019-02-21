// Fetch existing todos from localStorage
const getSavedTodos = function() {
  const todoJSON = localStorage.getItem('todos');

  if(todoJSON !== null) {
    return JSON.parse(todoJSON);
  } else {
    return [];
  }
}

// Save todos to localStorage
const saveTodos = function(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Remove todo by id
const removeTodo = function(id) {
  const todoIndex = todos.findIndex(function(todo){
    return todo.id === id;
  })
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
}


// Render application todos based on filters
const renderTodos = function(todos, filter){

  const filteredTodos = todos.filter(function(todo){
    const searchTextMatch = todo.text.toLowerCase().includes (filter.searchText.toLowerCase());
    const hideCompletedMatch = !filter.hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  })
  
  const incompleteTodos = filteredTodos.filter(function (todo){
    return !todo.completed;
  })
  
  document.querySelector('#todos').innerHTML = '';
  
  document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos));
  
  filteredTodos.forEach(function(todo){
    document.querySelector('#todos').appendChild(generateTodoDOM(todo));
  })
  
}

// Get the DOM elements for an individual note
const generateTodoDOM = function(todo) {
  const todoEl = document.createElement('div');
  const newText = document.createElement('span');
  const button = document.createElement('button');
  const checkbox = document.createElement('input');

  // Setup the todo checkbox
  checkbox.setAttribute('type', 'checkbox');
  todoEl.appendChild(checkbox);
  
  // Setup the todo text
  newText.textContent = todo.text;
  todoEl.appendChild(newText);

  // Setup the remove button
  button.textContent = 'x';
  todoEl.appendChild(button);
  button.addEventListener('click', function(e){
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filter)
  })

  return todoEl;
}

// Get the DOM elements for list summary
const generateSummaryDOM = function(incompleteTodos) {
  const summary = document.createElement('h3');
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
}