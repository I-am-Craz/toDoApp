const input = document.getElementById("add__task");
const list = document.getElementById("content__list");
let amountOfAllTasks = document.getElementById("total");

let tasksArr = [];

if(localStorage.getItem('tasks')){
    tasksArr = JSON.parse(localStorage['tasks']);
    addFromLocalStorage(JSON.parse(localStorage['tasks']));
    interactWithTasks();
}

input.onkeydown = function (e){
    if(e.keyCode === 13 && input.value !== ""){
        tasksArr.push(input.value);
        localStorage['tasks'] = JSON.stringify(tasksArr);
        addTask(input.value);
    }
   interactWithTasks();
}

function interactWithTasks(){
    const removeIcons = document.querySelectorAll('.list-item__remove-icon');
    const tasks = document.querySelectorAll('.list-item__text');
    const editIcons = document.querySelectorAll('.list-item__edit-icon');
    markAsDone(tasks);
    removeTask(removeIcons);
    editTask(editIcons);
}

function addTask(task){
    let listItem = `
        <div  class="list-item">
            <p class="list-item__text">${task}</p>
            <div>
                <span class="material-icons-outlined list-item__edit-icon"> mode_edit</span>
                <span class="material-icons-outlined list-item__remove-icon">highlight_off</span>
            </div>
        </div>`;
    amountOfAllTasks.value = list.children.length+=1;
    list.innerHTML += listItem;
    input.value = "";
}

function addFromLocalStorage(tasks){
    for(let elem of tasks){
        addTask(elem);
    }
}

function editTask(arr){
    for(let elem of arr){
        elem.onclick = () => {
            input.value = elem.parentNode.parentNode.children[0].textContent;
            elem.parentNode.parentNode.remove();
            for(let i = 0; i < tasksArr.length; i++){
                if(tasksArr[i] === elem.parentNode.parentNode.children[0].textContent){
                    tasksArr.splice(i, 1);
                    localStorage.setItem('tasks', JSON.stringify(tasksArr));
                }
            }
        }
    }
}

function markAsDone(arr){
    for(let elem of arr){
        elem.addEventListener('click', () => {
            elem.classList.add('list-item_done');
        });
    }
}

function removeTask(arr){
    for(let elem of arr){
        elem.onclick = () => {
            for(let i = 0; i < tasksArr.length; i++){
                if(tasksArr[i] === elem.parentNode.parentNode.children[0].textContent){
                    tasksArr.splice(i, 1);
                    localStorage.setItem('tasks', JSON.stringify(tasksArr));
                }
            }
            elem.parentNode.parentNode.classList.add('list-item_remove');
            setTimeout( () => {
                elem.parentNode.parentNode.remove();
            }, 1000);
            amountOfAllTasks.value--;
        }
    }
}