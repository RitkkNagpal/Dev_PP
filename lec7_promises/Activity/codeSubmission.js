const puppeteer=require("puppeteer");
const id="bomope9847@irahada.com";
const pwd="123456789";
let tab;
let idx;
let gCode;
// all functions of puppeteer are promisified=> gives you a pending promise

//opens a browser

let browserOpenPromise=puppeteer.launch({
    headless: false,
    defaultViewport : null,
    args: ["--start-maximized"],
    // slowMo : 100
});


//promise<pending>

browserOpenPromise
    .then(function(browser){
        console.log("browser opened!!");

        let allPagesPromise=browser.pages();
        return allPagesPromise;
    })
    .then(function(pages){
        tab=pages[0];
        let pageOpenPromise=tab.goto("https://www.hackerrank.com/auth/login");
        return pageOpenPromise;
        //promise <pending>
    })
    .then(function () {
            let idTypedPromise=tab.type("#input-1",id);
            return idTypedPromise;
    })
    .then(function () {
        let pwdTypedPromise=tab.type("#input-2",pwd);
        return pwdTypedPromise;
    })
    .then(function () {
        let loginPromise=tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
        return loginPromise;
    })

    .then(function () {
        let waitAndClickPromise=waitAndClick("#base-card-1-link");
        return waitAndClickPromise;
    })
    .then(function(){
        let waitAndClickPromise=waitAndClick('a[data-attr1="warmup"]');
        return waitAndClickPromise;
    })
    .then(function(){
        console.log("reached warmup page");
        let waitPromise=tab.waitForSelector(".js-track-click.challenge-list-item");
        return waitPromise;
    })
    .then(function () {
        let allQuesATags=tab.$$(".js-track-click.challenge-list-item");
        return allQuesATags;   
    })
    .then(function (aTags){
        // console.log(aTags);
        let allATagsPromises=[];
        for(let i=0;i<aTags.length;i++)
        {
            let singleATag=aTags[i];
            let singleATagPromise=tab.evaluate(function (elem) {    //this function initially returns a pending promise
                return elem.getAttribute("href");
            },singleATag);
            allATagsPromises.push(singleATagPromise);
        }
        let sbkePromises=Promise.all(allATagsPromises); //this will return one single promise [promise<pending>,promise<pending>,promise<pending>,promise<pending>];
        return sbkePromises;
        
    })
    .then(function (allLinks){/*after pending promise comes to scb it will have all the links*/ 
        let completeLinks=allLinks.map(function(link){
            return "https://www.hackerrank.com"+link;
        });
        let oneQuesSolvedPromise=solveQuestion(completeLinks[0]);
        return oneQuesSolvedPromise;
    })
    .then(function (){
        console.log("One Question Solved Successfully");
    })
    .catch(function (error) {
        console.log(error);
    });


   function waitAndClick(selector)
   {
       return new Promise(function (resolve,reject){
           let waitPromise=tab.waitForSelector(selector,{visible : true });
           waitPromise.then(function () {
               let clickPromise=tab.click(selector);
               return clickPromise;
           })
           .then(function () {
               resolve();
           })
           .catch(function () {
               reject();
           });
       });
   }
   
   function solveQuestion(link)
   {
       return new Promise(function(resolve,reject) {
           let gotoPromise=tab.goto(link);
           
           gotoPromise.then(function (){
                let waitAndClickPromise=waitAndClick('div[data-attr2="Editorial"]');
                return waitAndClickPromise;
           })
           .then(function () {
               let codePromise=getCode();
               return codePromise;
           })
           .then(function () {
               let pasteCodePromise=pasteCode();
               return pasteCodePromise;
           })
           .then(function () {
               let clickSubmitPromise=tab.click(".pull-right.btn.btn-primary.hr-monaco-submit");
               return clickSubmitPromise;
           })
           .then(function (){
               resolve();
           })
           .catch(function () {
               reject();
           });
       });
   }

   function getCode()
   {
       return new Promise(function (resolve,reject){
            let waitPromise=tab.waitForSelector(".hackdown-content h3");
            
            waitPromise
            .then(function () {
                let allCodeNamePromise=tab.$$(".hackdown-content h3");
                return allCodeNamePromise;
            })
            .then(function (allCodeNames){
            // [ <h3>C++</h3> , <h3>Python</h3> , <h3>Java</h3>  ]
            let allCodeNamesPromise=[]; 
            for(let i=0;i<allCodeNames.length;i++)
                {
                    let codeNamePromise=tab.evaluate(function(elem){ return elem.textContent;},allCodeNames[i]);
                    allCodeNamesPromise.push(codeNamePromise);
                }
                let sbkaNamePromise=Promise.all(allCodeNamesPromise);
                return sbkaNamePromise;
            })
            .then(function (codeNames)
            {
            // [<h3> C++ </h3>, <h3> Python </h3>, <h3> Java </h3>]
            for(let i=0;i<codeNames.length;i++)
            {
                if(codeNames[i]=="C++")
                {
                    idx=i;
                    break;
                }
            }
            let allCodeDivPromise=tab.$$(".hackdown-content .highlight");
            return allCodeDivPromise;
            })
            .then(function (allCodeDivs){
                let codePromise=tab.evaluate(function(elem){    return elem.textContent;},allCodeDivs[idx]);
                return codePromise;
            })
            .then(function(code){
                gCode=code;
                resolve();
            })
            .catch(function()
            {
                reject();
            });
       });
   }

    function pasteCode()
    {
        return new Promise(function(resolve,reject){
            let problemTabClickPromise=tab.click('div[data-attr2="Problem"]'); //here wait is not required as wait had already loaded it from "problem" part to "editorial" part 
            problemTabClickPromise
            .then(function(){
                let waitAndClickPromise=waitAndClick(".custom-input-checkbox");//for clicking on test against cutsom input checkbox so that we paste the code over there first
                return waitAndClickPromise;
            })
            .then(function (){
                let codeTypePromise=tab.type(".custominput",gCode);
                return codeTypePromise;
            })
            .then(function () {
                let controlKeyDownPromise=tab.keyboard.down("Control");
                return controlKeyDownPromise;
            })
            .then(function (){
                let aKeyPressedPromise=tab.keyboard.press("A");
                return aKeyPressedPromise;
            })
            .then(function (){
                let xKeyPressPromise=tab.keyboard.press("X");
                return xKeyPressPromise;
            })
            .then(function (){
                let textEditorClickPromise=tab.click('.monaco-editor.no-user-select');
                return textEditorClickPromise;
            })
            .then(function (){
                let aKeyPressedPromise=tab.keyboard.press("A");
                return aKeyPressedPromise;
            })
            .then(function (){
                let vKeyPressPromise=tab.keyboard.press("V");
                return vKeyPressPromise;
            })
            .then(function (){
                console.log("Code pasted successfully");
                let controlKeyUpPromise=tab.keyboard.up("Control");
                return controlKeyUpPromise;
            })
            .then(function () {
                resolve();
            })
            .catch(function (){
                reject();
            });
        });
    }  
