//express -> implements server in a easy way than node.js

//nodemon - dev dependency => onlyv used during the development not during the production(automatically restes the server if any change is made in the code);
//socket.io -> implements socket thorugh which clients communicate

const express=require("express");
const app=express(); //creates server

const http = require('http');
const { disconnect } = require("process");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);

app.use(express.static("public"));

let userList=[];
io.on("connection",function(socket){
    console.log(socket.id+"User connected");
    socket.on("userConnected",function(username){
        
        let userObject={
            "id":socket.id,
            "name":username
        };
        userList.push(userObject);
        console.log(userList);
        //for displaying list on the your screen
        socket.emit("online-list",userList);


        //broadcast this message to all except client
        socket.broadcast.emit("join",userObject);
    });

    socket.on("disconnect",function(){
        let leftUserObj;
        let remainingList   =userList.filter(function(userObject){
            if(userObject.id==socket.id){
                leftUserObj=userObject;
                return false;
            }
            return true;
        });

        userList=remainingList;
        socket.broadcast.emit("leave",leftUserObj);
    })

    socket.on("chat",function(chatObject){
        socket.broadcast.emit("chatleft",chatObject);
    })
})


server.listen("5500",function(){ 
    console.log("port 5500 opened");
});


/* THIS IS FOR DEPLOYMENT */

// let port = process.env.PORT || 3000;
// server.listen(port,function(){
//     console.log("port 5500 opened");
// });