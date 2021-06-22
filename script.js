const input = document.getElementById("add__task");
const list = document.getElementById("content__list");
let amountOfAllTasks = document.getElementById("total");

input.onkeydown = async function (e){
    if(e.keyCode === 13 && input.value !== ""){
        let listItem = `
        <div  class="list-item">
            <h3 class="list-item__text">${input.value}</h3>
            <span class="material-icons-outlined list-item__remove-icon">highlight_off</span>
        </div>`;
        amountOfAllTasks.value = list.children.length+=1;
        list.innerHTML += listItem;
        input.value = "";
    }
    const removeIcons = document.querySelectorAll('.list-item__remove-icon');
    const listItems = document.querySelectorAll('.list-item');
    for(let elem of listItems){
        elem.addEventListener('click', () => {
            elem.children[0].classList.add('list-item_done');
        });
    }
    for(let elem of removeIcons){
        elem.onclick = () => {
            elem.parentNode.classList.add('list-item_remove');
            setTimeout( () => {
                elem.parentNode.remove();
            }, 1000);
            amountOfAllTasks.value--;
        }
    }
}

