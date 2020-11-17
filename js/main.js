var input = document.querySelector('#toDoInput');
var addButton = document.querySelector('#add');
var toDo = document.querySelector('.to-do');
var id = 0

function add(){
    if(input.value != ''){
        id++;
        event.preventDefault();
        let div = document.createElement("div");
        div = document.body.appendChild(div);
        div.setAttribute('class', 'item');
        div.setAttribute('id', id);
        div.textContent = input.value;
        toDo.appendChild(div);
        input.value = '';
    }
}
addButton.addEventListener('click', add);
