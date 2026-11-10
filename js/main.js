
// 1. Data & Elements

const todoLists = JSON.parse(localStorage.getItem('todoLists')) || [];

const todoButton = document.querySelector('.todo-button');
const hiddenList = document.querySelector('.todo-list');
const todoListElement = document.querySelector('.todo-list');
const tasksGrid = document.querySelector('.tasks-grid');

const searchInput = document.querySelector('#search');
const activeButton = document.querySelector('.active-task');
const completedButton = document.querySelector('.completed-task');

let currentFilter = 'active';


// 2. Sidebar Toggle

todoButton.addEventListener('click', function () {
    hiddenList.classList.toggle('hidden');
});


// 3. Render Sidebar Lists

function renderLists() {
    let todoListsHTML = '';

    for (let i = 0; i < todoLists.length; i++) {
        const value = todoLists[i];

        const html = `
            <li class="sidebar-text">
                ${value.name}
                <button class="delete-list" data-id="${value.id}">×</button>
            </li>
        `;

        todoListsHTML += html;
    }

    todoListElement.innerHTML = todoListsHTML;
}


// 4. Render Task Cards

function renderCards() {
    let filteredLists = todoLists;
    let cardsHtml = '';

    // Active Filter
    if (currentFilter === 'active') {
        filteredLists = filteredLists.filter(function (item) {
            return item.completed === false;
        });
    }

    // Completed Filter
    if (currentFilter === 'completed') {
        filteredLists = filteredLists.filter(function (item) {
            return item.completed === true;
        });
    }

    // Search Filter
    const searchValue = searchInput.value.toLowerCase().trim();

    filteredLists = filteredLists.filter(function (item) {
        return item.name.toLowerCase().includes(searchValue);
    });

    // Generate HTML
    for (let i = 0; i < filteredLists.length; i++) {
        const value = filteredLists[i];

        const html = `
            <div class="task-card">
                <div class="task-header">
                    <input type="checkbox" data-id="${value.id}"
                    ${value.completed ? 'checked' : ''}>
                    <h3>${value.name}</h3>
                </div>

                <p>${value.description}</p>

                <div class="time">
                    <span class="task-date">Due: ${value.dueDate}</span>
                    <span class="task-time">Time: ${value.time}</span>
                </div>
            </div>
        `;

        cardsHtml += html;
    }

    tasksGrid.innerHTML = cardsHtml;
}


// 5. Checkbox: Update Task Status

tasksGrid.addEventListener('change', function (event) {

    if (event.target.type === 'checkbox') {
        const id = Number(event.target.dataset.id);

        const task = todoLists.find(function (item) {
            return item.id === id;
        });

        task.completed = event.target.checked;

        localStorage.setItem('todoLists', JSON.stringify(todoLists));

        renderCards();
    }
});


// 6. Filter Buttons

activeButton.addEventListener('click', function () {
    currentFilter = 'active';
    renderCards();
});

completedButton.addEventListener('click', function () {
    currentFilter = 'completed';
    renderCards();
});


// 7. Search

searchInput.addEventListener('input', function () {
    renderCards();
});


// 8. Delete Task

todoListElement.addEventListener('click', function (event) {

    if (event.target.classList.contains('delete-list')) {
        const id = Number(event.target.dataset.id);

        const index = todoLists.findIndex(function (item) {
            return item.id === id;
        });

        todoLists.splice(index, 1);

        localStorage.setItem('todoLists', JSON.stringify(todoLists));

        renderLists();
        renderCards();
    }
});


// 9. Initial Rendering

renderLists();
renderCards();
