let filterCodes = {
    "red":"#e74c3c",
    "blue":"#3498db",
    "green":"#2ecc71",
    "black":"#34495e"
}

let selectedFilter = "black";

let allFilters = document.querySelectorAll(".ticket-filters div");// selects the small color divs in the ticket filter div
let ticketContainer = document.querySelector(".tickets-container");
let openModalBtn=document.querySelector(".open-modal");
let closeModal= document.querySelector(".close-modal");

loadTickets();

openModalBtn.addEventListener("click",handleOpenModal);
closeModal.addEventListener("click",handleCloseModal);

// [ <div></div> ,<div></div> ,<div></div> ,<div></div>  ];
for (let i = 0; i < allFilters.length; i++) {
  allFilters[i].addEventListener("click", chooseFilter);
}

function chooseFilter(e) {
    // it active filter class is currently active then load home page
    if(e.target.classList.contains("active-filter"))
    {
        e.target.classList.remove("active-filter");
        loadTickets();
        return;
    }


    // if a class with the name active filter already exist then remove it first
    if(document.querySelector(".filter.active-filter")){
        document.querySelector(".filter.active-filter").classList.remove("active-filter");
    }
  e.target.classList.add("active-filter");
  let ticketFilter = e.target.classList[1];
  loadSelectedFilter(ticketFilter);

}

function handleOpenModal(e){
    let modal=document.querySelector(".modal");
    if(modal) //if already present then return
    {
        return;
    }

    // else create a div with class modal 
    let modalDiv=createModal();

    //to empty a modal text box add a click event on modal text box
    modalDiv
        .querySelector(".modal-textbox")
        .addEventListener("click",clearModalTextBox);
    
    // to add a ticket when pressing enter in the modal text box
    modalDiv
        .querySelector(".modal-textbox")
        .addEventListener("keypress",addTicket);
    
        // get all modal filters
    let allModalFilters=modalDiv.querySelectorAll('.modal-filter');
    
    // console.log(allModalFilters);
    
    for(let i=0;i<allModalFilters.length;i++)
    {
        // add a click event on every modal filter
        allModalFilters[i].addEventListener("click",chooseModalFilter);
    }
    
    //append modal div on UI!!
    ticketContainer.append(modalDiv);
}

function handleCloseModal(e){
    if(document.querySelector(".modal"))
    {
        document.querySelector(".modal").remove();
    }
}

function handleDeleteButton(e){
    let ticketToBeDeleted=e.target.id;

    let allTickets=JSON.parse(localStorage.getItem("allTickets"));

    let filteredTickets=allTickets.filter(function (ticketObject){
        return ticketObject.ticketId!=ticketToBeDeleted;
    });

    localStorage.setItem("allTickets",JSON.stringify(filteredTickets));
    loadTickets();
}

function toggleTicketFilter(e){
    let filters=["red","blue","green","black"];
    let currentFilter = e.target.classList[1];

    let idx=filters.indexOf(currentFilter);
    idx++;
    idx=idx%filters.length;
    let currentTicket=e.target;
    currentTicket.classList.remove(currentFilter);
    currentTicket.classList.add(filters[idx]);

    let allTickets=JSON.parse(localStorage.getItem("allTickets"));

    let id=currentTicket.nextElementSibling.children[0].textContent.split("#")[1];

    for(let i=0;i<allTickets.length;i++)
    {
        if(allTickets[i].ticketId==id)
        {
            allTickets[i].ticketFilter=filters[idx];
        }
    }

    localStorage.setItem("allTickets",JSON.stringify(allTickets));
    
}

function clearModalTextBox(e)
{
    if(e.target.getAttribute("data-typed")=="true"){
        return;
    }
    e.target.innerHTML="";  
    e.target.setAttribute("data-typed","true");
}

function addTicket(e)
{
    if(e.key=="Enter"){
        // get the content of the modal text box !!
        let modalText=e.target.textContent;

        let ticketId=uid();
        //create a div and add class ticket to it !
        let ticketDiv=document.createElement("div");
        ticketDiv.classList.add("ticket");

        //set the html of ticket vala div
        ticketDiv.innerHTML=`<div class="ticket-filter ${selectedFilter}"></div>
        <div class="ticket-info">
            <div class="ticket-id">#${ticketId}</div>
            <div class="ticket-delete">
                <i id=${ticketId} class="fas fa-trash-alt"></i>
            </div>
        </div>
        <div class="ticket-content">${modalText}</div> `;

        ticketDiv.querySelector(".ticket-filter")
            .addEventListener("click",toggleTicketFilter);

        ticketDiv.querySelector(".ticket-delete i")
            .addEventListener("click",handleDeleteButton);
        

        
        ticketContainer.append(ticketDiv);
        e.target.parentNode.remove();
    // ticket has been appended on the document !!!
        
        if(!localStorage.getItem("allTickets"))
        {
            //if no ticket is present create one
            let allTickets=[];

            //push an empty array in local storage which will store all the ticket objects
            localStorage.setItem("allTickets",JSON.stringify(allTickets));
        }
        
        //tickets are already present so append new ticket after them
        let allTickets=JSON.parse(localStorage.getItem("allTickets"));
        let ticketObject={};
        ticketObject.ticketId=ticketId;
        ticketObject.ticketFilter=selectedFilter;
        ticketObject.ticketContent=modalText;

        allTickets.push(ticketObject);
 
        localStorage.setItem("allTickets",JSON.stringify(allTickets));
                
        //again set the default selected filter
        selectedFilter="black";
    }
}

function chooseModalFilter(e){
    let selectedModalFilter=e.target.classList[1];
    if(selectedModalFilter==selectedFilter)
    {
        return;
    }
    selectedFilter=selectedModalFilter;

    document.querySelector('.modal-filter.active-filter').classList.remove('active-filter');
    e.target.classList.add('active-filter');
}

function createModal(){
    let modalDiv=document.createElement("div");
    modalDiv.classList.add("modal");
    modalDiv.innerHTML=`<div class="modal-textbox" data-typed="false" contenteditable="true">
        Enter your Task Here
    </div>

    <div class="modal-filter-options">
        <div class="modal-filter red"></div>
        <div class="modal-filter blue"></div>
        <div class="modal-filter green"></div>
        <div class="modal-filter black active-filter"></div>
    </div>`

    return modalDiv;
}

function loadSelectedFilter(ticketFilter)
{
    if(localStorage.getItem("allTickets")){
        let allTickets=JSON.parse(localStorage.getItem("allTickets"));

        let filteredTickets=allTickets.filter(function(filterObject){
            return filterObject.ticketFilter == ticketFilter
        });

        //emoty tickets container

        ticketContainer.innerHTML="";

        for(let i=0;i<filteredTickets.length;i++){
            // object destructuring
            let{ticketId, ticketFilter, ticketContent}=filteredTickets[i];
            let ticketDiv=document.createElement("div");
            //set the html of ticket vala div
            ticketDiv.classList.add("ticket");
            ticketDiv.innerHTML=`<div class="ticket-filter ${ticketFilter}"></div>
            <div class="ticket-info">
                <div class="ticket-id">#${ticketId}</div>
                <div class="ticket-delete">
                    <i id=${ticketId} class="fas fa-trash-alt"></i>
                </div>
            </div>
            <div class="ticket-content">${ticketContent}</div> `;

            ticketDiv.querySelector(".ticket-filter")
                .addEventListener("click",toggleTicketFilter);   

            ticketDiv.querySelector(".ticket-delete i")
                .addEventListener("click",handleDeleteButton);


            //append ticket on UI!
            ticketContainer.append(ticketDiv);
        }
   
    }
}

function loadTickets(){
    
    // if something is already present in the local storage (so as to load it)
    if(localStorage.getItem("allTickets")){
        ticketContainer.innerHTML="";
        let allTickets=JSON.parse(localStorage.getItem("allTickets"));

        for(let i=0;i<allTickets.length;i++)
        {
            // object destructuring
            let{ticketId, ticketFilter, ticketContent}=allTickets[i];
            let ticketDiv=document.createElement("div");
            //set the html of ticket vala div
            ticketDiv.classList.add("ticket");
            ticketDiv.innerHTML=`<div class="ticket-filter ${ticketFilter}"></div>
            <div class="ticket-info">
                <div class="ticket-id">#${ticketId}</div>
                <div class="ticket-delete">
                    <i id=${ticketId} class="fas fa-trash-alt"></i>
                </div>
            </div>
            <div class="ticket-content">${ticketContent}</div> `;
            
            ticketDiv.querySelector(".ticket-filter")
                .addEventListener("click",toggleTicketFilter);

            ticketDiv.querySelector(".ticket-delete i")
                .addEventListener("click",handleDeleteButton);
           

                //append ticket on UI!
            ticketContainer.append(ticketDiv);
        }
    }
}
