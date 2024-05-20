document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");
  
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const clearListButton = document.getElementById("clearListButton");
    const taskList = document.getElementById("taskList");
  
    if (!taskInput || !addTaskButton || !clearListButton || !taskList) {
        console.error("One or more elements not found:", {
            taskInput,
            addTaskButton,
            clearListButton,
            taskList
          });
          return;
        }
      
        // Add new task
        function addTask() {
            console.log("Add Task button clicked");
            let taskText = taskInput.value.trim();
            if (taskText !== "") {
              let taskItem = document.createElement("li");
              taskItem.classList.add("li-toDo");
              taskItem.innerText = taskText;
              taskItem.addEventListener("click", toggleTask);
              taskList.appendChild(taskItem);
              taskInput.value = "";
              console.log("Task added:", taskText);
            }
          }
      
        // Toggle task completion
        function toggleTask() {
          console.log("Task toggled:", this.innerText);
          this.classList.toggle("completed");
        }
      
        // Clear all tasks
        function clearList() {
          console.log("Clear List button clicked");
          taskList.innerHTML = "";
        }
      
        // Event listeners
    addTaskButton.addEventListener("click", addTask);
    clearListButton.addEventListener("click", clearList);
  });