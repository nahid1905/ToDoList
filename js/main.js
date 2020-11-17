var input = document.querySelector('#toDoInput');
var addBtn = document.querySelector('#add');
var toDo = document.querySelector('.to-do-list');
var completedList = document.querySelector('.completed-list');
var toDoItem = document.querySelector('.item');
var deleteBtn = document.querySelector('.fa-trash');
let div = document.createElement("div");

var id = 0


function createToDoItem(){
    id++;
    div = document.body.appendChild(div);
    div.setAttribute('class', 'item');
    div.setAttribute('id', id);
    toDo.appendChild(div);
    div.textContent = input.value;
}
function add(){
    event.preventDefault();
    if(input.value != ''){
        createToDoItem();
        input.value = '';
    }
}
function deleteItemFromToDo(){
    let itemForDelete = deleteBtn.parentElement.parentElement;
    itemForDelete.remove();
}
function complete(){
    deleteItemFromToDo();
    completedList.appendChild(div);
    div.style.textDecoration = 'line-through';
    div.style.backgroundColor = 'rgb(93 138 35)'
}

deleteBtn.addEventListener('click', deleteItemFromToDo);
addBtn.addEventListener('click', add);
