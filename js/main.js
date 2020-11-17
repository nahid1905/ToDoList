var input = document.querySelector('#toDoInput');
var addButton = document.querySelector('#add');
var toDo = document.querySelector('.to-do');
var id = 0

function add(){
    id++;
    event.preventDefault();
    // var div = toDo.appendChild('div');
    // div.setAttribute('div', id);
    let div = document.createElement("div");
    div = document.body.appendChild(div);
    div.setAttribute('class', 'item');
    div.innerText = input.value;
    toDo.appendChild(div);
    console.log(document.body.appendChild(div));
    console.log(input.value);  
    input.value = '';
}
addButton.addEventListener('click', add);
