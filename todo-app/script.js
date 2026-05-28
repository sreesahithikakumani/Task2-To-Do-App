// Load saved tasks
window.onload = function () {
    loadTasks();
};

function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value;

    if (task === "") return;

    createTaskElement(task);
    saveTask(task);

    input.value = "";
}

// Create task UI
function createTaskElement(taskText) {
    let li = document.createElement("li");
    li.innerText = taskText;

    // Complete toggle
    li.onclick = function () {
        li.classList.toggle("done");
    };

    // Delete button
    let delBtn = document.createElement("button");
    delBtn.innerText = "X";

    delBtn.onclick = function (e) {
        e.stopPropagation();
        li.remove();
        removeTask(taskText);
    };

    li.appendChild(delBtn);
    document.getElementById("taskList").appendChild(li);
}

// Save task
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTaskElement(task));
}

// Remove task
function removeTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
