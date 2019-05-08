'use strict';

let todos = getSavedTodos();

const filter = {
  searchText: '',
  hideCompleted: false
}

renderTodos(todos, filter);

//Listen for search bar text change
document.querySelector('#search-text').addEventListener('input', (e) => {
  filter.searchText = e.target.value;
  renderTodos(todos, filter);
})

//Add todo to array and rerender
document.querySelector('#add-todo-form').addEventListener('submit', (e) => {
  let input = e.target.elements.addTodo.value.trim();
  e.preventDefault();
  if (input) {
    todos.push({
      id: uuidv4(),
      text: input,
      completed: false});
    saveTodos(todos);  
    renderTodos(todos, filter);
    e.target.elements.addTodo.value = '';
  }
})


document.querySelector('#hide-completed-todos').addEventListener('change', (e) => {
  filter.hideCompleted = e.target.checked;
  renderTodos(todos, filter);
})
