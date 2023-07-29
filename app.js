const form = document.querySelector("#task-form");
const input = document.querySelector("#task");
const filter = document.querySelector("#filter");
const clrBtn = document.querySelector(".clear-tasks");
const listItem = document.querySelector(".collection");

// add all event listeners
LoadEventListeners();
// DOM load event
document.addEventListener('DOMContentLoaded', getTask)
function LoadEventListeners() {
  // add Task
  form.addEventListener("submit", Addtask);
  // Remove Task
  listItem.addEventListener("click", Removetask);
  // Clear Task
  clrBtn.addEventListener("click", clrTask);
  // filter
  filter.addEventListener("keyup", filtertask);
}

function getTask(){
let tasks;
if(localStorage.getItem('tasks')===null){
  tasks=[];
}else{
  tasks=JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(function(task){
  const li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(document.createTextNode(task));

  input.value = "";

  // create link

  const link = document.createElement("a");

  link.className = "delete-item secondary-content";

  link.innerHTML = `<i class="fa fa-remove"></i>`;

  li.appendChild(link);

  listItem.appendChild(li);
})
}


// Add task
function Addtask(e) {
  if (input.value === "") {
    alert("Add Task");
  } else {
    // create li

    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(input.value));

    input.value = "";

    // create link

    const link = document.createElement("a");

    link.className = "delete-item secondary-content";

    link.innerHTML = `<i class="fa fa-remove"></i>`;

    li.appendChild(link);

    listItem.appendChild(li);
// creating LS function
    storeTaskInLocalStorage(li.textContent);
  }
  e.preventDefault();
}
// store task in LS
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task
function Removetask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();

      // creating function for remove from LS
      removeItemInLocalStorage(e.target.parentElement.parentElement);
    }
  }
}
// remove from LS
function removeItemInLocalStorage(taskItem){
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task,index){
    if(taskItem.textContent===task){
      tasks.splice(index,1)
    }
  })
  
  localStorage.setItem('tasks',JSON.stringify(tasks))
}

// Clear Task

function clrTask() {
  // using innerHTML
  // listItem.innerHTML='';

  while (listItem.firstChild) {
    listItem.removeChild(listItem.firstChild);
  }
  // creating function for clr from LS

clrInLocalStorage(listItem)
}
// clr from LS
function clrInLocalStorage(listItem){
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
localStorage.removeItem('tasks')
}




// filter task
function filtertask(e) {
  const text = e.target.value.toLowerCase();
  const task = document.querySelectorAll(".collection-item");
  task.forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
