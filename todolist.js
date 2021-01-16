const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    list = document.querySelector("ul");

function del(){
    console.log("delte")
}

function paintToDo(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");
    button.addEventListener("click",del);
    span.innerText=(text);
    button.innerText=("✖");
    li.appendChild(span);
    li.appendChild(button);
    list.appendChild(li);
}

function submit(event){
    event.preventDefault()
    const text = input.value;
    paintToDo(text);
    input.value = "";
}


function init(){
    form.addEventListener("submit",submit);
}

init();