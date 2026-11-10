const listForm = document.querySelector('.modal-form');

const listNameInput = document.querySelector('.list-name');
const descriptionInput = document.querySelector('.list-description');
const dueDateInput = document.querySelector('.list-due-date');
const timeInput = document.querySelector('.list-time');

listForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const listName = listNameInput.value.trim();
    const description = descriptionInput.value;
    const dueDate = dueDateInput.value;
    const time = timeInput.value;

    if (listName === '') {
        return;
    }

    const todoLists = JSON.parse(localStorage.getItem('todoLists')) || [];

    todoLists.push({
        id: Date.now(),
        name: listName,
        description: description,
        dueDate: dueDate,
        time: time,
        completed: false
    });

    localStorage.setItem('todoLists', JSON.stringify(todoLists));

    window.location.href = 'index.html';
});