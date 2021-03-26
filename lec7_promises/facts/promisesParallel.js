const fs=require("fs");

let f1PendingPromise=fs.promises.readFile("f1.txt");
let f2PendingPromise=fs.promises.readFile("f2.txt");
let f3PendingPromise=fs.promises.readFile("f3.txt");

f1PendingPromise.then(function(data){
    console.log("F1 Data : " + data+"");
});

f2PendingPromise.then(function(data){
    console.log("F2 Data : " + data+"");
});

f3PendingPromise.then(function(data){
    console.log("F3 Data : " + data+"");
});