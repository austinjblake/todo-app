// Fetch existing todos from localStorage
const getSavedTodos = function() {
  const todoJSON = localStorage.getItem('todos');

  if(todoJSON !== null) {
    return JSON.parse(todoJSON);
  } else {
    return todos = [];
  }
}

// Save todos to localStorage
const saveTodos = function(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
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
  const newTodo = document.createElement('p');
  newTodo.textContent = todo.text;
  return newTodo;
}

// Get the DOM elements for list summary
const generateSummaryDOM = function(incompleteTodos) {
  const summary = document.createElement('h3');
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
}