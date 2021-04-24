const fs=require("fs");

let f1PendingPromise=fs.promises.readFile("f1.txt");

f1PendingPromise.then(function(data){
    console.log("F1 Data : " + data+"");
    let f2PendingPromise=fs.promises.readFile("f2.txt");

    f2PendingPromise.then(function(f2Data){
        console.log("F2 Data : "+ f2Data+"");
        let f3PendingPromise= fs.promises.readFile("f3.txt");

        f3PendingPromise.then(function(f3Data){
            console.log("F3 Data : "+ f3Data+"");
        });
    });
});
