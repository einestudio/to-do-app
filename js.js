let task_arr = [];

document.addEventListener("DOMContentLoaded", () => {
  const knap = document.getElementById("knap");
  const taskInput = document.getElementById("task");
  const inProgressList = document.getElementById("inProgressList");
  const doneList = document.getElementById("doneList");
  const taskTemplate = document.querySelector("template");

  const darkmodeToggle = document.getElementById("darkmode-toggle");

  darkmodeToggle.addEventListener("click", () => {
    document.body.classList.toggle("darkmode");
  });

  knap.addEventListener("click", btnCreateNewTask);

  function btnCreateNewTask(evt) {
    evt.preventDefault();
    const taskName = taskInput.value.trim();
    if (taskName.length === 0) {
      alert("Please enter a task name.");
      return;
    }
    makeNewTask(taskName);
  }

  function makeNewTask(theName) {
    let uuid = self.crypto.randomUUID();
    const task = { name: theName, done: false, id: uuid };
    task_arr.push(task);
    saveTaskArrToLocalStorage();
    filterAndSortList();
    console.log("task", task);
  }

  function filterAndSortList() {
    showList("inProgressList", false);
    showList("doneList", true);
  }

  function showList(listId, isDone) {
    const listContainer = document.querySelector(`#${listId}`);
    listContainer.innerHTML = "";

    const tasks = task_arr.filter((task) => task.done === isDone);
    tasks.forEach((task) => {
      const clone = document.querySelector("template").content.cloneNode(true);
      clone.querySelector("header").textContent = task.name;
      clone.querySelector("button").textContent = isDone ? "Regret" : "Done";

      clone.querySelector(".delete").addEventListener("click", () => {
        task_arr = task_arr.filter((t) => t.id !== task.id);
        saveTaskArrToLocalStorage();
        filterAndSortList();
      });

      clone.querySelector("button").addEventListener("click", () => {
        task.done = !task.done;
        saveTaskArrToLocalStorage();
        filterAndSortList();
      });

      listContainer.appendChild(clone);
    });
  }

  function saveTaskArrToLocalStorage() {
    localStorage.setItem("taskArr", JSON.stringify(task_arr));
  }

  function loadTaskArrFromLocalStorage() {
    const storedTaskArr = localStorage.getItem("taskArr");
    if (storedTaskArr) {
      task_arr = JSON.parse(storedTaskArr);
      filterAndSortList();
    }
  }

  window.onload = loadTaskArrFromLocalStorage;
});
