let todoInput=document.querySelector(".todo-input");
let addToDoButton=document.querySelector(".add-todo");
let todoList=document.querySelector(".todos-list")


    addToDoButton.addEventListener("click",function(e){
        addTodo();
    });

    todoInput.addEventListener("keypress" , function(e){
        if(e.key == "Enter"){
            addTodo();
        }
    });
    function addTodo()
    {
        let todo=todoInput.value;
        
        //if todo is not a falsey value
        if(todo){
            let listItem=document.createElement("li"); //creates an li element
            listItem.classList.add("todo-item");

            let pTag=document.createElement("p"); //creates a ptag;
            pTag.classList.add("todo");
            pTag.innerHTML=todo;

            let deleteButton=document.createElement("button"); //creates a button
            deleteButton.classList.add("delete-todo");
            deleteButton.innerHTML="Delete";


            deleteButton.addEventListener("click",function(event){
                event.target.parentNode.remove();
            })
            //appends the ptag and button to the list item
            listItem.append(pTag); 
            listItem.append(deleteButton);

            todoList.append(listItem);

            todoInput.value="";
        }
        else{
            alert("you have not typed anything!!!");
        }
    }



//  <li class="todo-item">
//  <p class="todo">Learn DOM !</p>
//  <button class="delete-todo">X</button>
// </li>
