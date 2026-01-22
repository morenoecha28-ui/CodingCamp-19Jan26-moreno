let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  if (tasks.length === 0) {
    list.innerHTML = `<tr><td colspan="4" class="empty">No tasks found</td></tr>`;
  }

  tasks.forEach((task, index) => {
    list.innerHTML += `
      <tr>
        <td class="${task.done ? 'done' : ''}">${task.name}</td>
        <td>${task.date}</td>
        <td>${task.done ? 'Completed' : 'Pending'}</td>
        <td>
          <button class="small success" onclick="toggleTask(${index})">✓</button>
          <button class="small danger" onclick="deleteTask(${index})">✕</button>
        </td>
      </tr>
    `;
  });

  updateSummary();
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const dateInput = document.getElementById("dateInput");

  if (taskInput.value === "" || dateInput.value === "") {
    alert("Task dan tanggal wajib diisi!");
    return;
  }

  tasks.push({
    name: taskInput.value,
    date: dateInput.value,
    done: false
  });

  taskInput.value = "";
  dateInput.value = "";

  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function updateSummary() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;
  const pending = total - completed;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  document.getElementById("total").innerText = total;
  document.getElementById("completed").innerText = completed;
  document.getElementById("pending").innerText = pending;
  document.getElementById("progress").innerText = progress + "%";
}

renderTasks();
