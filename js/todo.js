const form = document.querySelector(".to-do");
const input = document.querySelector(".add-to-do"); 
const list  = document.querySelector(".todo-list");

let toDos = [];

function persistToDos(){
    const stringToDo = JSON.stringify(toDos);
    localStorage.setItem("toDos", stringToDo);
}

function saveToDo(text) {
    const toDoObject = {
        id : toDos.length + 1,
        value : text
    };
    toDos.push(toDoObject);
    persistToDos();
}

function handleDelete(event){
    const target = event.target;
    const li = target.parentElement;
    const ul = li.parentElement;
    const toDoId = li.id;
    ul.removeChild(li);
    toDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(toDoId);
    });
    persistToDos();
}

function addToDo(text) {
    const toDo = document.createElement("li");
    toDo.className = "toDo";
    toDo.id = toDos.length + 1;
    const deleteButton = document.createElement("span");
    deleteButton.innerHTML = "❌";
    deleteButton.className = "toDo_button";
    deleteButton.addEventListener("click", handleDelete);
    const label = document.createElement("label");
    label.innerHTML = text;
    toDo.appendChild(deleteButton);
    toDo.appendChild(label);
    list.appendChild(toDo);
    saveToDo(text);
}

function onSubmit(event) {
    event.preventDefault();
    const value = input.value;
    input.value = "";
    addToDo(value);
}

function loadToDos() {
    const loadedToDos = localStorage.getItem("toDos");
    if (loadedToDos !== null){
        const parseToDos = JSON.parse(loadedToDos);
        parseToDos.forEach(function(toDo){
            addToDo(toDo.value);
        });
    }
    return;
}

function init() {
    loadToDos();
}

form.addEventListener("submit",onSubmit);

init();
