const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    // const inputBox = document.getElementById("input-box");
    if (inputBox.value === "") {
        alert("You must write something!!");
    } else {
        // Create a new task container to hold the unchecked image, task text, and cross sign
        let newTaskContainer = document.createElement("div");
        newTaskContainer.classList.add("flex", "px-7", "py-1");

        // Create the unchecked image element
        let uncheckedImg = document.createElement("img");
        uncheckedImg.src = "images/unchecked.png";
        uncheckedImg.classList.add("mt-1", "w-5", "h-5");

        // Create a new list item element with the task text
        let newTaskElement = document.createElement("li");
        newTaskElement.classList.add("pl-4", "flex-1", "cursor-pointer");
        newTaskElement.textContent = inputBox.value;

        // Create the cross sign element
        let crossSign = document.createElement("span");
        crossSign.classList.add("ml-2", "text-red-600", "cursor-pointer", "hover:scale-125", "hover:text-red-800");
        crossSign.textContent = "\u00d7";

        // Add an event listener to the cross sign to remove the task on click
        crossSign.addEventListener("click", function () {
            newTaskContainer.remove();
            saveData();
        });

        // Add an event listener to the task to toggle checked/unchecked state and apply strikethrough
        uncheckedImg.addEventListener("click", function () {
            if (uncheckedImg.src.includes("unchecked.png")) {
                uncheckedImg.src = "images/checked.png";
                newTaskElement.style.textDecoration = "line-through";
                saveData();
            }
            else {
                uncheckedImg.src = "images/unchecked.png";
                newTaskElement.style.textDecoration = "none";
                saveData();
            }
        });

        // Append the unchecked image, task text, and cross sign to the new task container
        newTaskContainer.appendChild(uncheckedImg);
        newTaskContainer.appendChild(newTaskElement);
        newTaskContainer.appendChild(crossSign);

        // Get the list container and append the new task container to it
        listContainer.appendChild(newTaskContainer);
    }
    // Clear the input field after adding the task
    inputBox.value = "";
    saveData();
}

//Saving the data so that it remains whenever page is refreshed
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

/*
----ISSUE FACED-----

The event listeners for checking/unchecking tasks and removing tasks are attached to the elements that are dynamically created when adding a new task. 
When you refresh the page, the dynamically created elements are lost, and the event listeners are not reattached to the existing tasks loaded from local storage.

To resolve this issue, you need to reattach the event listeners to the existing tasks after loading the saved data from local storage
*/

// Displaying the saved data and reattaching event listeners
function showSaveData() {
    listContainer.innerHTML = localStorage.getItem("data");

    // Attach event listeners to the tasks after loading from local storage
    const tasks = listContainer.getElementsByClassName("flex");
    for (const task of tasks) {
        const uncheckedImg = task.querySelector("img");
        const taskText = task.querySelector("li");
        const crossSign = task.querySelector("span");

        uncheckedImg.addEventListener("click", function () {
            if (uncheckedImg.src.includes("unchecked.png")) {
                uncheckedImg.src = "images/checked.png";
                taskText.style.textDecoration = "line-through";
                saveData();
            } else {
                uncheckedImg.src = "images/unchecked.png";
                taskText.style.textDecoration = "none";
                saveData();
            }
        });

        crossSign.addEventListener("click", function () {
            task.remove();
            saveData();
        });
    }
}
// Call the showSaveData() function to display saved data and attach event listeners
showSaveData();