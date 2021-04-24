const fs=require("fs");


let pendingPromise=fs.promises.readFile("./f2.txt");

console.log(pendingPromise);

//for success ,also known as scb(success callback)
pendingPromise.then(function(data){
    console.log("You are inside success calback of the 'then' function");

    console.log("data : "+ data);
    console.log(pendingPromise);

});



//for failure of the promise , also known as failure call back function
pendingPromise.catch(function(error){
    console.log("you are inside the failure callback of the catch function ");

    console.log("Error : "+ error);
    console.log(pendingPromise);

});



