document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addBtn");
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const filterBtns = document.querySelectorAll(".filters button");

  // Ladda sparade uppgifter
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let currentFilter = "all";
  renderTasks();

  // Lägg till uppgift
  addBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
  });

  // Filter-knappar
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderTasks();
    });
  });

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const newTask = {
      text: taskText,
      completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();

    taskInput.value = "";
    taskInput.focus();
  }

  function renderTasks() {
    taskList.innerHTML = "";

    let filteredTasks = tasks;
    if (currentFilter === "active") {
      filteredTasks = tasks.filter(t => !t.completed);
    } else if (currentFilter === "completed") {
      filteredTasks = tasks.filter(t => t.completed);
    }

    filteredTasks.forEach((task, index) => {
      const li = document.createElement("li");
      if (task.completed) li.classList.add("completed");

      // Vänster sida: checkbox + text
      const left = document.createElement("div");
      left.classList.add("task-left");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        saveTasks();
        renderTasks();
      });

      const span = document.createElement("span");
      span.textContent = task.text;

      left.appendChild(checkbox);
      left.appendChild(span);

      // Ta bort-knapp
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "✖";
      deleteBtn.classList.add("delete");
      deleteBtn.addEventListener("click", () => {
        const taskIndex = tasks.indexOf(task);
        tasks.splice(taskIndex, 1);
        saveTasks();
        renderTasks();
      });

      li.appendChild(left);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
