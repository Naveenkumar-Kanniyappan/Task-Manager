class TaskManager {
    constructor() {
        this.taskStoreAll = JSON.parse(localStorage.getItem("taskStore")) || [];

        this.taskTitle = document.getElementById("taskTitle");
        this.assignedTask = document.getElementById("assignedTo");
        this.addTaskBtn = document.querySelector("button");
        this.taskListContainer = document.getElementById("taskList");

        this.addTaskBtn.addEventListener("click", () => {
            this.handleAddTask();
        });

        this.displayTask();
    }

    handleAddTask() {
        let title = this.taskTitle.value.trim();
        let assignedTo = this.assignedTask.value.trim();

        if (title === "" || assignedTo === "") {
            alert("Please enter both title and assigned person.");
            return;
        }

        let task = {
            id: Date.now(),
            title,
            assignedTo,
            completed: false
        };

        this.addTask(task);
        this.displayTask();

        this.taskTitle.value = '';
        this.assignedTask.value = '';
    }

    addTask(task) {
        this.taskStoreAll.push(task);
        this.saveTasks();
    }

    displayTask() {
        this.taskListContainer.innerHTML = '';
        this.taskStoreAll = JSON.parse(localStorage.getItem("taskStore")) || [];

        this.taskStoreAll.forEach(task => {
            let taskItem = document.createElement("li");
            taskItem.innerHTML = `
                <span style="${task.completed ? 'text-decoration: line-through;' : ''}">
                    ${task.title}
                </span>
                <button class="mark-btn"><i class="fa-solid fa-marker"></i></button>
                <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            `;

            let markBtn = taskItem.querySelector(".mark-btn");
            let editBtn = taskItem.querySelector(".edit-btn");
            let deleteBtn = taskItem.querySelector(".delete-btn");

            markBtn.addEventListener("click", () => this.markTask(task.id));
            editBtn.addEventListener("click", () => this.editTask(task.id));
            deleteBtn.addEventListener("click", () => this.deleteTask(task.id));

            this.taskListContainer.appendChild(taskItem);
        });
    }

    markTask(taskId) {
        this.taskStoreAll = this.taskStoreAll.map(task => {
            if (task.id === taskId) {
                task.completed = !task.completed;
            }
            return task;
        });
        this.saveTasks();
        this.displayTask();
    }

    editTask(taskId) {
        let taskIndex = this.taskStoreAll.findIndex(task => task.id === taskId);
        
        console.log(taskIndex);
    }

    deleteTask(taskId) {
        this.taskStoreAll = this.taskStoreAll.filter(task => task.id !== taskId);
        this.saveTasks();
        this.displayTask();
    }

    saveTasks() {
        localStorage.setItem("taskStore", JSON.stringify(this.taskStoreAll));
    }
}

let taskApplication = new TaskManager();
