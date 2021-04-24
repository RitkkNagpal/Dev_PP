const fs=require("fs");


function myPromisifiedFunction(filePath)
{
    return new Promise(function (resolve,reject){
        fs.readFile(filePath,function(error,data){
            if(error)
            {
                //if it is 
                reject(error);
            }
            else
            {
                resolve(data);
            }
        });
    })
}

let pendingPromise=myPromisifiedFunction("./f1.txt");

pendingPromise.then(function (data) {
    console.log(data+"");

});
pendingPromise.catch(function (error){
    console.log(error);
});