const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");


function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        li.addEventListener('dblclick', editTask); 
    }
    inputBox.value = "";
    saveData();
}
function editTask(e) {
    const li = e.target;
    const newText = prompt("Edit your task:", li.firstChild.textContent);
    if (newText !== null && newText.trim() !== '') {
        li.firstChild.textContent = newText.trim();
        saveData();
    }
}


listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);


function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}


function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    document.querySelectorAll('#list-container li').forEach(li => {
        li.addEventListener('dblclick', editTask);
    });
}

showTask();
