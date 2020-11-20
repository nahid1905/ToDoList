var input = document.querySelector('#toDoInput');
var addBtn = document.querySelector('#add');
var toDo = document.querySelector('.to-do-list');
var completedList = document.querySelector('.completed-list');
var dropZoneCompleted = document.querySelector('.completed-list');
var dropZoneToDo = document.querySelector('.to-do-list');
var elementDragged = null;
var allToDoItems = document.querySelectorAll('.to-do-list .item');
var formSubmit = document.querySelector('#formSubmit');
let editBtn;

let isEdit;

let id = 0;


addBtn.addEventListener('click', add);


// create item template
function createToDoItem(itemId){
    let item = document.createElement('div');
    let itemText = document.createElement('p')
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
    itemText = item.appendChild(itemText);
    itemText.textContent = input.value;
    item.insertBefore(checkBox, item.firstChild);
    checkBox.addEventListener('click', () => checkBox.checked ? complete(itemId) : uncomplete(itemId))

    buttons = item.appendChild(buttons);
    buttons.setAttribute('class', 'buttons');

    editBtn = buttons.appendChild(editBtn);  
    editBtn.setAttribute('class', 'fa fa-edit');
    editBtn.setAttribute('id', itemId);
    editBtn.addEventListener('click', () => editItem(itemId));

    trashBtn = buttons.appendChild(trashBtn);
    trashBtn.setAttribute('class', 'fa fa-trash');
    trashBtn.setAttribute('id', itemId);
    trashBtn.addEventListener('click', () => deleteItem(itemId));
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
    if(!editBtn){
        editBtn = document.createElement('input');
        editBtn = formSubmit.appendChild(editBtn);
        editBtn.setAttribute('id', 'edit');
        editBtn.setAttribute('type', 'submit')
        editBtn.value = "Edit";
        addBtn.disabled = true;
    }
    let itemForEdit = document.getElementById(id);
    input.value = itemForEdit.textContent;
    editBtn.addEventListener('click', function(e){
        e.preventDefault();
        if(input.value != ''){
            let itemText = itemForEdit.childNodes[1];
            itemText.textContent = input.value;
            input.value = '';
            editBtn.remove();
            editBtn = null;
            addBtn.disabled = false;
        }
    })
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
    toDo.appendChild(itemForUncomplete);
    itemForUncomplete.classList.remove('completed');
}


// drag and drop

//   allToDoItems.forEach(function(item) {
//     item.addEventListener('dragstart', handleDragStart, false);
//     item.addEventListener('dragover', handleDragOver, false);
//     item.addEventListener('dragenter', handleDragEnter, false);
//     item.addEventListener('dragleave', handleDragLeave, false);
//     item.addEventListener('dragend', handleDragEnd, false);
// });

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

dropZoneCompleted.addEventListener('drop', function(e) {
    if (e.preventDefault) e.preventDefault(); 
    if (e.stopPropagation) e.stopPropagation(); 
    complete(e.target.id);
    this.innerHTML += e.dataTransfer.getData('text');
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