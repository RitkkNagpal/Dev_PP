const fs=require("fs");

let f1KaPromise=fs.promises.readFile("./f1.txt");

f1KaPromise.then(function(data){
    console.log(data+"");
    let f2KaPromise=fs.promises.readFile("./f2.txt");
    return f2KaPromise; //returns f2's data to the 'then' below it (i.e to line no. 5)
})
.then(function(data){
    console.log(data+"");
    let f3KaPromise=fs.promises.readFile("./f3.txt");
    return f3KaPromise;  //returns f3's data to the 'then' below it(i.e to line no. 10)
})
.then(function(data){
    console.log(data+"");
})

