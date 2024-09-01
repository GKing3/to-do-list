const inputElement = document.querySelector('#todo');
const dateElement =  document.querySelector('#date');
const timeElement = document.querySelector('#time');
const addButton = document.querySelector('.todo-add-button');

const todoList = document.querySelector('.todo-list');

let listArray = JSON.parse(localStorage.getItem('todos')) || [];

const renderTodoList = () => {
    todoList.innerHTML = '';

    listArray.forEach((todo, index) => {
        const { title, dueDate, dueTime } = todo;  // Destructuring

        const pEl = document.createElement('p');
        if(todo.title === '' || todo.dueDate === '' || todo.dueTime === '') {
            pEl.style.display = 'none';
        } else {
            pEl.innerHTML = `
                <span>${title}</span> 
                <span>${dueDate}</span>
                <span>${dueTime}</span>
                <button onclick='deleteTodo(${index})' class='delete-btn'> Delete </button>
            `;
        }
        todoList.appendChild(pEl);
    });
}

const addTodo = () => {
    listArray.push({
        title: inputElement.value,
        dueDate: dateElement.value,
        dueTime: timeElement.value
    });
    console.log(listArray);

    localStorage.setItem('todos', JSON.stringify(listArray));

    inputElement.value = '';
    dateElement.value = '';
    timeElement.value = '';

    renderTodoList();
};

const deleteTodo = (index) => {
    listArray.splice(index, 1);

    localStorage.setItem('todos', JSON.stringify(listArray));

    renderTodoList();
}

addButton.addEventListener('click', () => {
    addTodo();
});

renderTodoList();