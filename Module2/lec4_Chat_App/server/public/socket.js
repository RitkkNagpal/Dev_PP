let participantsList=document.querySelector(".participants-list");
socket.emit("userConnected",username);

socket.on("join",function(dataObj){
    let joinDiv=document.createElement("div");
    joinDiv.classList.add("chat");
    joinDiv.classList.add("join");
    joinDiv.textContent=`${dataObj.name} Joined!`;
    chatWindow.append(joinDiv);

    addInOnlineList(dataObj);
});

socket.on("leave",function(dataObj){
    let leaveDiv=document.createElement("div");
    leaveDiv.classList.add("chat");
    leaveDiv.classList.add("leave");
    leaveDiv.textContent=`${dataObj.name} Left!`;
    chatWindow.append(leaveDiv);

    deleteFromOnlineList(dataObj.id);
});

socket.on("chatleft",function(chatObject){
    let chatDiv=document.createElement("div");
    chatDiv.classList.add("chat");
    chatDiv.classList.add("left");
    chatDiv.innerHTML=chatObject.name + " : " + chatObject.chat;
    chatWindow.append(chatDiv);
})

socket.on("online-list",function(userList){
    for(let i=0;i<userList.length;i++){
        if(socket.id!=userList[i].id)
        {
            let userdiv=document.createElement("div");
            userdiv.classList.add("user");
            userdiv.setAttribute("id",userList[i].id);
            userdiv.innerHTML=`<div class="user-image">
                                    <img src="user.png" alt="" srcset="">
                                </div>
                                <div class="user-name">${userList[i].name}</div>`
            participantsList.append(userdiv);
        }
    }

    // <div class="user">
    //                 <div class="user-image">
    //                     <img src="user.png" alt="" srcset="">
    //                 </div>
    //                 <div class="user-name"></div>
    //             </div>
    //             <div class="user">
    //                 <div class="user-image">
    //                     <img src="user.png" alt="" srcset="">
    //                 </div>
    //                 <div class="user-name"></div>
    //             </div>
    //             <div class="user">
    //                 <div class="user-image">
    //                     <img src="user.png" alt="" srcset="">
    //                 </div>
    //                 <div class="user-name"></div>
    //             </div>      
    //         </div>
});
    function deleteFromOnlineList(id){
        document.querySelector(`#${id}`).remove();
    }

    function addInOnlineList(userObj)
    {
        let userdiv=document.createElement("div");
        userdiv.classList.add("user");
        userdiv.setAttribute("id",userObj.id)
        userdiv.innerHTML=`<div class="user-image">
                                <img src="user.png" alt="" srcset="">
                            </div>
                            <div class="user-name">${userObj.name}</div>`
        participantsList.append(userdiv);
    }
 