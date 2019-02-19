let todos = [];


const filter = {
  searchText: '',
  hideCompleted: false
}

//Check for exisitng data
const todoJSON = localStorage.getItem('todos');

if(todoJSON !== null) {
  todos = JSON.parse(todoJSON);
}

// Render Starts
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

const reminder = document.createElement('h3');
reminder.textContent = `You have ${incompleteTodos.length} todos left`;
document.querySelector('#todos').appendChild(reminder);

filteredTodos.forEach(function(todo){
  const newTodo = document.createElement('p');
  newTodo.textContent = todo.text;
  document.querySelector('#todos').appendChild(newTodo);
})

}
//Ends
renderTodos(todos, filter);


//Listen for search bar text change
document.querySelector('#search-text').addEventListener('input', function(e){
  filter.searchText = e.target.value;
  renderTodos(todos, filter);
})

//Add todo to array and rerender
document.querySelector('#add-todo-form').addEventListener('submit', function(e) {
  e.preventDefault();
  todos.push({
    text: e.target.elements.addTodo.value,
    completed: false});
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos(todos, filter);
  e.target.elements.addTodo.value = '';
})


document.querySelector('#hide-completed-todos').addEventListener('change', function(e){
  filter.hideCompleted = e.target.checked;
  renderTodos(todos, filter);
})