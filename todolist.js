const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    list = document.querySelector("ul");

let toDos = [];
const TODO_LS = "toDos";

function saveTodo(){
    localStorage.setItem(TODO_LS,JSON.stringify(toDos));
}

function eachPaint(toDo){
    paintToDo(toDo.text);
}

function loadToDo(){
    const loadToDos = localStorage.getItem(TODO_LS);
    if(loadToDos !== null){
        const paintToDos = JSON.parse(loadToDos);
        paintToDos.forEach(eachPaint);
    }
}

function del(event){
    const btn = event.target;
    const li = btn.parentNode;
    list.removeChild(li);
    const removeText = toDos.filter(function(delToDo){
        console.log(parseInt(li.id));
        return delToDo.id !== parseInt(li.id);
    })
    toDos = removeText;
    saveTodo();
}

function returnSccss(event){
    const box=event.target;
    box.innerText = "⚪";
    
    console.log("bye");
}

function success(event){
    const box=event.target;
    box.innerText = "✔";
    box.addEventListener("click", returnSccss);
    console.log("hi");
}

function paintToDo(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const successBox = document.createElement("button");
    const delButton = document.createElement("button");
    const id = toDos.length;
    li.id = id;
    successBox.addEventListener("click",success);
    delButton.addEventListener("click",del);
    span.innerText=text;
    delButton.innerText="✖";
    successBox.innerText="⚪";
    li.appendChild(span);
    li.appendChild(successBox);
    li.appendChild(delButton);
    list.appendChild(li);
    const toDoData = {
        text,
        id
    }
    toDos.push(toDoData);
    saveTodo();
}

function submit(event){
    event.preventDefault()
    const text = input.value;
    paintToDo(text);
    input.value = "";
}


function init(){
    loadToDo();
    form.addEventListener("submit",submit);
}

init();