let chatInput=document.querySelector(".chat-input");
let chatWindow=document.querySelector(".chat-window");

let username=prompt("Enter your Name");
chatInput.addEventListener("keypress",function(e){
    if(e.key=="Enter" && chatInput.value)
    {
        let chatDiv=document.createElement("div");
        chatDiv.classList.add("chat");
        chatDiv.classList.add("right");
        chatDiv.textContent=username + " : " + chatInput.value;
        chatWindow.append(chatDiv);
        chatInput.value="";
    }
})