var input = document.querySelector('#toDoInput');
var addBtn = document.querySelector('#add');
var toDo = document.querySelector('.to-do-list');
var completedList = document.querySelector('.completed-list');
var dropZoneCompleted = document.querySelector('.completed-list');
var dropZoneToDo = document.querySelector('.to-do-list');
var elementDragged = null;
var allToDoItems = document.querySelectorAll('.to-do-list .item');

let isEdit;

let id = 0;

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
    editBtn.addEventListener('click', function(){
        editItem(itemId);
    });

    trashBtn = buttons.appendChild(trashBtn);
    trashBtn.setAttribute('class', 'fa fa-trash');
    trashBtn.setAttribute('id', itemId);
    trashBtn.addEventListener('click', function(){
        deleteItem(itemId);
    });
    toDo.appendChild(item);
}

function add(){
    event.preventDefault();
    if(!isEdit){
        if(input.value != ''){
            id++;
            createToDoItem(id);
            input.value = '';
        }
    }
    else{
        if(input.value != ''){
            input.value = '';
            addBtn.value = 'Add';
            isEdit = false;
        }
    }
    isEdit = false;
}
function deleteItem(id){
    let itemForDelete = document.getElementById(id);
    itemForDelete.remove();
}
function editItem(id){
    let itemForEdit = document.getElementById(id);
    input.value = itemForEdit.textContent;
    addBtn.value = "Edit";
    addBtn.setAttribute('id', 'edit');
    isEdit = true;
    // var editBtn = document.querySelector('#edit');
    // let idEditItem = itemForEdit.id;
    // editBtn.addEventListener('click', function(e){
    //     itemForEdit.textContent = input.value;
    // })
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
    // check.checked = false;
    toDo.appendChild(itemForUncomplete);
    itemForUncomplete.classList.remove('completed');
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

// Event Listener for when the dragged element leaves the drop zone.
dropZoneCompleted.addEventListener('dragleave', function(e) {
    this.className = "";
});


dropZoneCompleted.addEventListener('drop', function(e) {
    if (e.preventDefault) e.preventDefault(); 
    if (e.stopPropagation) e.stopPropagation(); 
    complete(1);
    this.innerHTML += "" + e.dataTransfer.getData('text');
    document.querySelector('#drag-elements').removeChild(elementDragged);
    elementDragged = null;
    var data = ev.dataTransfer.getData("text");
    thisdiv = ev.target;
    document.getElementById(data).insertBefore(thisdiv);
    return false;
});

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}