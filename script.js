let tasks = []; // Array to store tasks
let editIndex = null; // Track which task is being edited

// Open modal
function openModal(index = null) {
  const modal = document.getElementById("taskModal");
  modal.classList.add("open");

  if (index !== null) {
    editIndex = index;
    document.getElementById("taskName").value = tasks[index].name;
    document.getElementById("taskStatus").value = tasks[index].status;
  } else {
    editIndex = null;
    document.getElementById("taskName").value = "";
    document.getElementById("taskStatus").value = "open";
  }
}

// Close modal
function closeModal() {
  const modal = document.getElementById("taskModal");
  modal.classList.remove("open");
}

// Save task
function saveTask() {
  const name = document.getElementById("taskName").value;
  const status = document.getElementById("taskStatus").value;

  if (editIndex !== null) {
    // Edit task
    tasks[editIndex] = { name, status };
  } else {
    // Add new task
    tasks.push({ name, status });
  }

  closeModal();
  renderTasks();
}

// Render tasks
function renderTasks() {
  const table = document.getElementById("taskTable");
  table.innerHTML = "";

  tasks.forEach((task, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${task.name}</td>
      <td>${task.status}</td>
      <td>
        <button onclick="openModal(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Sort tasks
function sortTasks(key) {
  tasks.sort((a, b) => a[key].localeCompare(b[key]));
  renderTasks();
}

// Initial render
renderTasks();
