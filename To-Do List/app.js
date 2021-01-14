const form = document.querySelector('#add-item');
const input = document.querySelector('#item');
const toDoList = document.querySelector('#todo-list');

toDoList.addEventListener('click', function(e) {
    if(e.target.tagName === 'BUTTON') {
        e.target.parentElement.remove();
    } 
    else if (e.target.tagName === 'LI') {
        e.target.classList.toggle('most-important');
    }
});

toDoList.addEventListener('dblclick', function(e) {
    if(e.target.tagName === 'LI') {
        e.target.classList.toggle('completed-not-deleted')
    }
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const newToDo = document.createElement('li');
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'X';

    newToDo.innerText = input.value + " ";
    newToDo.appendChild(removeBtn);
    toDoList.appendChild(newToDo);
});