const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let editTodo = null;


// function to add to do item
const addTodo = () => {
    const inputText = inputBox.value.trim();
    if(inputText.length <= 0){
        alert("Please enter a to do item");
        return false;
    }
 if(addBtn.value === "Edit"){
//passing the original text to editlocaltodos function before edit it in the todo list
    editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
    editTodo.target.previousElementSibling.innerHTML = inputText;
    addBtn.value = "Add";
    inputBox.value = "";
}
    
else{
// creating p tag
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    // creating edit button
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.classList.add("btn" ,"editBtn");
    li.appendChild(editBtn);


    // creating delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Remove";

    deleteBtn.classList.add("btn" , "deleteBtn")
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputBox.value ="";

    saveLocalTodos(inputText);
    }
}


// function to update (Edit/Delete)to do item
const updateTodo = (e) => {
   // console.log(e.target.innerHTML);
   if(e.target.innerHTML === "Remove"){
   // console.log(e.target.parentElement);
   todoList.removeChild(e.target.parentElement);
   deleteLocalTodos(e.target.parentElement);
   }

   if(e.target.innerHTML === "Edit"){
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addBtn.value = "Edit";
    editTodo = e;
   }
}

// function to save to do item in local stroage
const saveLocalTodos = (todo) =>{
    let todos = [];
    if(localStorage.getItem("todos") === null){
        todos = [];

    }

    else{
        todos = JSON.parse(localStorage.getItem("todos"));

    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    //console.log(todos);
} 

// funcation to get to do item from local storage
const getLocalTodos = (todo) => {
    let todos = [];
    if(localStorage.getItem("todos") === null){
        todos = [];

    }

    else{
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach((todo) => {
            // creating p tag
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = todo;
    li.appendChild(p);

    // creating edit button
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.classList.add("btn" ,"editBtn");
    li.appendChild(editBtn);


    // creating delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Remove";

    deleteBtn.classList.add("btn" , "deleteBtn")
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
        });
    }
}


// function to delete to do item from local storage
const deleteLocalTodos = (todo) => {
    let todos = [];
    if(localStorage.getItem("todos") === null){
        todos = [];

    }

    else{
        todos = JSON.parse(localStorage.getItem("todos"));

    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);

    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    //  Array function : slice / splice we can use splice for delete item from array because it will remove the item from  an original array
    console.log(todoIndex);
   
}

const editLocalTodos = (todo) => {

    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
    
}




document.addEventListener('DOMContentLoaded',getLocalTodos);
addBtn.addEventListener('click',addTodo);

todoList.addEventListener('click', updateTodo);