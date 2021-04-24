const puppeteer=require("puppeteer");
const id="pihosip987@yncyjs.com";
const pwd="123456789";
let tab;
let idx;
let gCode="";

let browserOpenPromise=puppeteer.launch({
    headless: false,
    defaultViewport: null, 
    args: ["--start-maximized"],
  });   //opens up chromium browser and returns it

  browserOpenPromise.then(function (browser){
      console.log("Browser opened");
      let allPagesPromise=browser.pages();
      return allPagesPromise;
  })
  .then(function (pages){
      tab=pages[0];
    let pageOpenPromise=tab.goto("https://www.hackerrank.com/auth/login");
    return pageOpenPromise;
  })
  .then(function(){
      let idTypePromise=tab.type("#input-1",id);
      return idTypePromise;
  })
  .then(function (){
      let pwdTypePromise=tab.type("#input-2",pwd);
      return pwdTypePromise;
  })
  .then(function (){
      let clickLoginPromise=tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
      return clickLoginPromise;
  })
  .then(function (){
      console.log("Logged in Successfully");
      let waitAndClickPromise=waitAndClick("#base-card-1-link");
      return waitAndClickPromise;
  })
  .then(function (){
      console.log("reached ip kit page");
      let waitAndClickPromise=waitAndClick('a[data-attr1="warmup"]');
      return waitAndClickPromise;
  })
  .then(function () {
    let waitPromise = tab.waitForSelector(
      ".js-track-click.challenge-list-item",
      { visible: true }
    );
    return waitPromise;
  })
  .then(function (){
      console.log("reached warmup challenges Question page");
      let allQuesATagsPromise=tab.$$(".js-track-click.challenge-list-item");
      return allQuesATagsPromise;
  })
  .then(function(allQuesATags){
      let allATagsPromise=[];
      for(let i=0;i<allQuesATags.length;i++)
      {
          let singleAtagPromise=tab.evaluate(function(elem){return elem.getAttribute("href")},allQuesATags[i]);
          allATagsPromise.push(singleAtagPromise);
      }
      let combinedATagPromise=Promise.all(allATagsPromise); //it will give array of promises containing links
      return combinedATagPromise;
  })
  .then(function(allLinks){
      let completeLinks=allLinks.map(function (link){
          return "https://www.hackerrank.com"+link;
      });
      let oneQuestionSolvedPromise=solveQuestion(completeLinks[0]);

      for(let i=1;i<allLinks.length;i++)
      {
          oneQuestionSolvedPromise=oneQuestionSolvedPromise.then(function(){
              let nextQuesSolvedPromise=solveQuestion(completeLinks[i]);
              return nextQuesSolvedPromise;
          });
      }
      return oneQuestionSolvedPromise;
    })
    .then(function (){
        console.log("All Questions Solved Successfully");
    })
    .catch(function(error){
        console.log(error);
    });


  function waitAndClick(selector)
  {
      return new Promise(function(resolve,reject){
        let waitPromise=tab.waitForSelector(selector,{visible:true});

        waitPromise.then(function () {
            let clickPromise=tab.click(selector);
            return clickPromise;
        })
        .then(function (){
            resolve();
        })
        .catch(function(){
            reject();
        })
      });
  }

  function solveQuestion(link)
  {
      return new Promise(function(resolve,reject){
        let gotoPromise=tab.goto(link);
        gotoPromise.then(function(){
            let waitPromise=tab.waitForSelector('div[data-attr2="Editorial"]');
            return waitPromise;
        })
        .then(function () {
            let clickPromise=tab.click('div[data-attr2="Editorial"]');
            return clickPromise;
        })
        .then(function (){
            let handleLockBtnPromise=handleLockButton();
            return handleLockBtnPromise;
        })
        .then(function () {
            let codePromise=getCode();
            return codePromise;
        })
        .then(function(){
            let pasteCodePromise=pasteCode();
            return pasteCodePromise;
        })
        .then(function () {
            let clickSubmitPromise=tab.click(".pull-right.btn.btn-primary.hr-monaco-submit");
            return clickSubmitPromise;
        })
        .then(function(){
            resolve();
        })
        .catch(function(error){
            reject(error);
        });
    });
  }

  function handleLockButton(){
    return new Promise(function(resolve,reject){
      let waitPromise=tab.waitForSelector('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled',{visible:true,timeout:5000});
      waitPromise.then(function(){
        let lockButtonClickPromise=tab.click('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled');
        return lockButtonClickPromise;
      })
      .then(function(){
        //clicked on lock btn
        //lock button found
        console.log("Lock button Found");
        resolve();
      })
      .catch(function(error){
        console.log("Lockbutton not found!!");
        resolve();
      });

    });
  }

  function getCode()
  {
      return new Promise(function(resolve,reject){
        let codeNamesElementsPromise=tab.$$(".hackdown-content h3");
        codeNamesElementsPromise.then(function(allCodeNamesElements){
            allCodeNamePromiseArray=[];
            for(let i=0;i<allCodeNamesElements.length;i++)
            {
                let singleCodeNamesPromise=tab.evaluate(function(elem){return elem.textContent;},allCodeNamesElements[i]);
                allCodeNamePromiseArray.push(singleCodeNamesPromise);
            }
            let combinedNamePromise=Promise.all(allCodeNamePromiseArray);
            return combinedNamePromise;
        })
        .then(function (allCodeNames){
            for(let i=0;i<allCodeNames.length;i++)
            {
                if(allCodeNames[i]=="C++")
                {
                    idx=i;
                    break;
                }
            }
            let allCodeElementDiv=tab.$$(".hackdown-content .highlight");
            return allCodeElementDiv;
        })
        .then(function(allCodeElements){
            let code=tab.evaluate(function(elem){return elem.textContent},allCodeElements[idx]);
            return code;
        })
        .then(function(codeText){
            gCode=codeText;
            console.log("Code successfully saved in a variable");
            resolve();
        })
        .catch(function(){
            reject();
        });
      });
  }

  function pasteCode(){
      return new Promise(function (resolve,reject) {
        let waitAndClickPromise=waitAndClick('div[data-attr2="Problem"]'); //although not necessary to put wait here
        waitAndClickPromise
        .then(function(){
            let waitAndClickPromise=waitAndClick('.custom-input-checkbox');
            return waitAndClickPromise;
        })
        .then(function(){
            let waitForTextBoxPromise=tab.waitForSelector('.custominput');
            return waitForTextBoxPromise;
        })
        .then(function () {
            let codeTypePromise=tab.type(".custominput",gCode);
            return codeTypePromise;
        })
        .then(function(){
            let controlKeyDownPromise=tab.keyboard.down('Control');
            return controlKeyDownPromise;
        })
        .then(function(){
            let aKeyPressedPromise=tab.keyboard.press("A");
            return aKeyPressedPromise;
        })
        .then(function (){
            let xKeyPressedPromise=tab.keyboard.press("X");
            return xKeyPressedPromise;
        })
        .then(function(){
            let textEditorClickPromise=tab.click(".monaco-editor.no-user-select.vs");
            return textEditorClickPromise;
        })
        .then(function(){
            let aKeyPressedPromise=tab.keyboard.press("A");
            return aKeyPressedPromise;           
        })
        .then(function(){
            let vKeyPressedPromise=tab.keyboard.press("V");
            return vKeyPressedPromise;
        })
        .then(function (){
            let controlKeyUpPromise=tab.keyboard.up("Control");
            return controlKeyUpPromise;
        })
        .then(function () {
            resolve();
        })
        .catch(function (error) {
            reject(error);
        })
      });
  }