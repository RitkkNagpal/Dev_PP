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

function loadTickets(){
    
    // if something is already present in the local storage (so as to load it)
    if(localStorage.getItem("allTickets")){
        let allTickets=JSON.parse(localStorage.getItem("allTickets"));

        for(let i=0;i<allTickets.length;i++)
        {
            // object destructuring
            let{ticketId, ticketFilter, ticketContent}=allTickets[i];
            let ticketDiv=document.createElement("div");
            //set the html of ticket vala div
            ticketDiv.classList.add("ticket");
            ticketDiv.innerHTML=`<div class="ticket-filter ${ticketFilter}"></div>
            <div class="ticket-id">${ticketId}</div>
            <div class="ticket-content">${ticketContent}</div> `;

            //append ticket on UI!
            ticketContainer.append(ticketDiv);
        }
    }
}

loadTickets();

openModalBtn.addEventListener("click",handleOpenModal);


// [ <div></div> ,<div></div> ,<div></div> ,<div></div>  ];
for (let i = 0; i < allFilters.length; i++) {
  allFilters[i].addEventListener("click", chooseFilter);
}

function chooseFilter(e) {
  let filter = e.target.classList[1];
  let filterCode = filterCodes[filter];
  ticketContainer.style.background = filterCode;
}

function handleOpenModal(e){
    let modal=document.querySelector(".modal");
    if(modal) //if already present then return
    {
        return;
    }

    
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

    modalDiv.querySelector(".modal-textbox").addEventListener("click",clearModalTextBox);
    
    modalDiv.querySelector(".modal-textbox").addEventListener("keypress",addTicket);
    
    let allModalFilters=modalDiv.querySelectorAll('.modal-filter');
    console.log(allModalFilters);
    for(let i=0;i<allModalFilters.length;i++)
    {
        allModalFilters[i].addEventListener("click",chooseModalFilter);
    }
    
    ticketContainer.append(modalDiv);
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
        <div class="ticket-id">${ticketId}</div>
        <div class="ticket-content">${modalText}</div> `;


        ticketContainer.append(ticketDiv);
        e.target.parentNode.remove();
    // ticket has been appended on the document !!!
        
        if(!localStorage.getItem("allTickets"))
        {
            //if no ticket is present create one
            let allTickets=[];
            
            let ticketObject={};
            ticketObject.ticketId=ticketId;
            ticketObject.ticketFilter=selectedFilter;
            ticketObject.ticketContent=modalText;

            allTickets.push(ticketObject);

            localStorage.setItem("allTickets",JSON.stringify(allTickets));
        }
        else{
            //tickets are already present so append new ticket after t hem
            let allTickets=JSON.parse(localStorage.getItem("allTickets"));
            let ticketObject={};
            ticketObject.ticketId=ticketId;
            ticketObject.ticketFilter=selectedFilter;
            ticketObject.ticketContent=modalText;

            allTickets.push(ticketObject);

            localStorage.setItem("allTickets",JSON.stringify(allTickets));

        }

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

    document.querySelector('.active-filter').classList.remove('active-filter');
    e.target.classList.add('active-filter');
}