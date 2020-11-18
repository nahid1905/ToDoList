var input = document.querySelector('#toDoInput');
var addBtn = document.querySelector('#add');
var toDo = document.querySelector('.to-do-list');
var completedList = document.querySelector('.completed-list');
var dropZoneCompleted = document.querySelector('.completed-list');
var dropZoneToDo = document.querySelector('.to-do-list');
var elementDragged = null;
var allToDoItems = document.querySelectorAll('.to-do-list .item');

let id = 0

// create item template
function createToDoItem(itemId){
    let item = document.createElement('div');
    let checkBox = document.createElement('input');
    let trashBtn = document.createElement('i');
    let editBtn = document.createElement('i');
    let buttons = document.createElement('div');
    
    item = document.body.appendChild(item);
    item.setAttribute('class', 'item');
    item.setAttribute('id', itemId);
    item.setAttribute('draggable', true);
    
    checkBox = item.appendChild(checkBox);
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('id', itemId);
    item.textContent = input.value;
    item.insertBefore(checkBox, item.firstChild);
    checkBox.addEventListener('click', () => checkBox.checked ? complete(itemId) : uncomplete(itemId))

    buttons = item.appendChild(buttons);
    buttons.setAttribute('class', 'buttons');

    editBtn = buttons.appendChild(editBtn);  
    editBtn.setAttribute('class', 'fa fa-edit');
    editBtn.setAttribute('id', itemId);

    trashBtn = buttons.appendChild(trashBtn);
    trashBtn.setAttribute('class', 'fa fa-trash');
    trashBtn.setAttribute('id', itemId);
    trashBtn.addEventListener('click', deleteItem);
    toDo.appendChild(item);
}

function add(){
    event.preventDefault();
    if(input.value != ''){
        id++;
        createToDoItem(id);
        input.value = '';
    }
}
function deleteItem(event){
    let itemForDelete = document.getElementById(event.target.id);
    itemForDelete.remove();
}
// completed tasks add to CompletedList 
function complete(id){
    let itemForComplete = document.getElementById(id);
    itemForComplete.classList.add('completed');
    completedList.appendChild(itemForComplete);
}
// unchecked tasks back to todolist from completedlist
function uncomplete(id){
    let itemForUncomplete = document.getElementById(id);
    itemForUncomplete.classList.remove('completed');
    toDo.appendChild(itemForUncomplete);
}
addBtn.addEventListener('click', add);


// drag and drop
for (var i = 0; i < allToDoItems.length; i++) {

    allToDoItems[i].addEventListener('dragstart', function(e) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text', this.innerHTML);
        elementDragged = this;
    });
    allToDoItems[i].addEventListener('dragend', function(e) {
        elementDragged = null;
    });
};

dropZoneCompleted.addEventListener('dragover', function(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
});

dropZoneCompleted.addEventListener('dragenter', function(e) {
});

// Event Listener for when the dragged element leaves the drop zone.
dropZoneCompleted.addEventListener('dragleave', function(e) {
    this.className = "";
});


dropZoneCompleted.addEventListener('drop', function(e) {
    if (e.preventDefault) e.preventDefault(); 
    if (e.stopPropagation) e.stopPropagation(); 
    this.innerHTML += "" + e.dataTransfer.getData('text');
    complete(1);
    // document.querySelector('#drag-elements').removeChild(elementDragged);
    elementDragged = null;

    return false;
});
