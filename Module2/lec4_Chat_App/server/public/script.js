let chatInput=document.querySelector(".chat-input");
let chatWindow=document.querySelector(".chat-window");
let myName=document.querySelector(".user-name");

let username=prompt("Enter your Name");
myName.textContent=username;
chatInput.addEventListener("keypress",function(e){
    if(e.key=="Enter" && chatInput.value)
    {
        let chatDiv=document.createElement("div");
        chatDiv.classList.add("chat");
        chatDiv.classList.add("right");
        chatDiv.innerHTML=username + " : " + chatInput.value;
        chatWindow.append(chatDiv);

        // emit username and chat value 
        socket.emit("chat",{"name": username,"chat":chatInput.value});
        chatInput.value="";

        chatWindow.scrollTop=chatWindow.scrollHeight;
    }
})