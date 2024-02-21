let task_arr = [];

document.querySelector("#knap").addEventListener("click", btnCreateNewTask);

function btnCreateNewTask(evt) {
  evt.preventDefault();
  const indHoldAfTxtFelt = document.querySelector("#task").value;
  makeNewTask(indHoldAfTxtFelt);
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

  task_arr
    .filter((task) => task.done === isDone)
    .forEach((task) => {
      const clone = document.querySelector("template").content.cloneNode(true);
      clone.querySelector("header").textContent = task.name;
      clone.querySelector("button").textContent = isDone ? "Regret" : "Done";

      // Delete function for the delete button
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

// let task_arr = [];

// document.querySelector("#knap").addEventListener("click", btnCreateNewTask);
// function btnCreateNewTask(evt) {
//   evt.preventDefault();
//   const indHoldAfTxtFelt = document.querySelector("#task").value;
//   console.log("HEJ FRA KNAP", indHoldAfTxtFelt);
//   makeNewTask(indHoldAfTxtFelt);
// }

// function makeNewTask(theName) {
//   const task = { name: theName, done: false };
//   task_arr.push(task);
//   filterAndSortList();
// }
// function filterAndSortList() {
//   //   const theDoneOnes = task.arr.filter((task) => task.done === true);
//   //   const notTheDoneOnes = task.arr.filter((task) => task === false);
//   showList("inProgressList", false);
//   showList("doneList", true);
//   //   let listToShow;

//   listToShow = task_arr;
//   showList();
// }

// function showList() {
//   const tbody = document.querySelector("ul");
//   tbody.innerHTML = "";
//   task_arr.forEach((task) => {
//     const clone = document.querySelector("template").content.cloneNode(true);
//     clone.querySelector("header").textContent = task.name;
//     if (task.done) {
//       clone.querySelector("button").textContent = "To Do";
//     } else {
//       clone.querySelector("button").textContent = "Done";
//     }
//     clone.querySelector("button").addEventListener("click", () => {
//       task.done = !task.done;
//       filterAndSortList();
//     });
//     listContainer.appendChild(clone);
//     // tbody.appendChild(clone);
//   });
// }
// //function clickBTN() {
// //   makeNewTask();
// // }
