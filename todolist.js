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

function paintToDo(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");
    const id = toDos.length;
    li.id = id;
    button.addEventListener("click",del);
    span.innerText=(text);
    button.innerText=("✖");
    li.appendChild(span);
    li.appendChild(button);
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