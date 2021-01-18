const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    list = document.querySelector("ul"),
    To = document.querySelector(".to"),
    Do = document.querySelector(".do"),
    perc = document.querySelector(".perc");

let toDos = [];
const TODO_LS = "toDos";

function saveTodo(){
    localStorage.setItem(TODO_LS,JSON.stringify(toDos));
}

function eachPaint(toDo){
    paintToDo(toDo.text,toDo.check);
}

function loadToDo(){
    const loadToDos = localStorage.getItem(TODO_LS);
    if(loadToDos !== null){
        const paintToDos = JSON.parse(loadToDos);
        paintToDos.forEach(eachPaint);
    }
    percent();
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

function success(event){
    const box=event.target;
    const li = box.parentNode;
    if(box.checked===true){
        li.classList.add("true");
        toDos[li.id].check = true;
        console.log(toDos[li.id].check);
    } else{
        li.classList.remove("true");
        toDos[li.id].check = false;
        console.log(toDos[li.id].check);
    }
    saveTodo();
}

function percent(){
    const toDo = toDos.length;
    let i=0;
    let successToDo=0;
    for(i=0;i<toDo;i++){
        if(toDos[i].check === true){
            successToDo++;
        }
    }
    To.innerText=`할일 목록${toDo-successToDo}개`;
    Do.innerText=`한일 목록${successToDo}개`;
    perc.innerText = `한일 퍼센트${Math.round((successToDo/toDo)*100)}%`;
}

function paintToDo(text,check){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const successBox = document.createElement("input");
    const delButton = document.createElement("button");
    const id = toDos.length;
    successBox.type = "checkbox";
    successBox.checked = check;
    li.classList.add(check);
    li.id = id;
    successBox.checked   
    successBox.addEventListener("click",success);
    successBox.addEventListener("click",percent);
    delButton.addEventListener("click",del);
    delButton.addEventListener("click",percent);
    span.innerText=text;
    delButton.innerText="✖";
    successBox.innerText="⚪";
    li.appendChild(span);
    li.appendChild(successBox);
    li.appendChild(delButton);
    list.appendChild(li);
    const toDoData = {
        text,
        id,
        check:check
    }
    toDos.push(toDoData);
    saveTodo();
    percent();
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