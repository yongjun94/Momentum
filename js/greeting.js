const nameContainer = document.querySelector(".greeting");

function paintName(name) {
    nameContainer.innerHTML = "";
    const title = document.createElement("span");
    title.className = "name_text";
    title.innerHTML = `Hello ${name}`;
    nameContainer.appendChild(title);
}

function handleSubmit(event){
    event.preventDefault();
    const form = event.target;
    const input = form.querySelector("input");
    const value = input.value;
    localStorage.setItem("username", value);
    paintName(value);
}

function paintInput() {
    const input = document.createElement("input");
    input.placeholder = "이름을 입력하세요";
    input.type = "text";
    input.className = "name_input";
    const form = document.createElement("form");
    form.addEventListener("submit", handleSubmit);
    form.appendChild(input);
    nameContainer.appendChild(form);
}

function loadName() {
    const name = localStorage.getItem("username");
    if (name===null){
        paintInput();
    } else {
        paintName(name);
    }
}

function init() {
    loadName();
}

init();
