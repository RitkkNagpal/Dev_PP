const puppeteer=require("puppeteer");
const id="bomope9847@irahada.com";
const pwd="123456789";
let challenges=require("./challenges");

(async function(){
    let browser=await puppeteer.launch({
        headless: false,
        defaultViewport: null, 
        args: ["--start-maximized"],
    });
    let allPages=await browser.pages();
    let tab=allPages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1",id);
    await tab.type("#input-2",pwd);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"); //login button
    await tab.waitForTimeout(8000);
    await tab.waitForSelector(".ui-icon-user.default-user-icon",{visible:true}); //dropdown menu
    await tab.click(".ui-icon-user.default-user-icon");
    await tab.waitForSelector('[data-analytics="NavBarProfileDropDownAdministration"]',{visible:true});//admin selector
    await tab.click('[data-analytics="NavBarProfileDropDownAdministration"]');//clck on admin selector
    await tab.waitForTimeout(5000);
    await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav a',{visible:true});
    let bothATags=await tab.$$('.nav-tabs.nav.admin-tabbed-nav a')//get both the a tags on the navigated page(create challenge and manage challenge)
    let manageChallangeATag=bothATags[1]; //this is an elemnent
    await manageChallangeATag.click();
    await tab.waitForSelector(".btn-green.backbone.pull-right");

    let createChallengeButton= await tab.$(".btn-green.backbone.pull-right");
    let createChallengeLink=await tab.evaluate(function(elem){ return elem.getAttribute("href");},createChallengeButton);
    createChallengeLink="https://www.hackerrank.com"+createChallengeLink;


    //simultaneouosly open tabs for all the challenges to be added
    
    // for(let i=0;i<challenges.length;i++)
    // {
    //     addChallenge(challenges[i],browser,createChallengeLink)
    // }


    // add challenges one by one'

    for(let i=0;i<challenges.length;i++)
    {
        await addChallenge(challenges[i],browser,createChallengeLink)
        await tab.waitForTimeout(3000);
    } 

//


})();

async function addChallenge(challenge,browser,link){

    // "Challenge Name": "Pep_Java_1GettingStarted_1IsPrime",
    // "Description": "Question 1",
    // "Problem Statement": "Take as input a number n. Determine whether it is prime or not. If it is prime, print 'Prime' otherwise print 'Not Prime.",
    // "Input Format": "Integer",
    // "Constraints": "n <= 10 ^ 9",
    // "Output Format": "String",
    // "Tags": "Basics",
    let challengeName=challenge['Challenge Name']
    let challengeDescription=challenge['Description'];
    let problemStatement=challenge['Problem Statement'];
    let inputFormat=challenge['Input Format'];
    let constraints=challenge['Constraints'];
    let outputFormat=challenge['Output Format'];
    let tags=challenge['Tags'];
    
    let newTab=await browser.newPage();
    await newTab.goto(link);
    await newTab.waitForSelector("#name",{visible:true}); 
    await newTab.type("#name",challengeName)   
    await newTab.type("#preview",challengeDescription);
    await newTab.waitForTimeout(2000);
    await newTab.type("#problem_statement-container .CodeMirror textarea",problemStatement);
    await newTab.type("#input_format-container .CodeMirror textarea",inputFormat);
    await newTab.type("#constraints-container .CodeMirror textarea",constraints);
    await newTab.type("#output_format-container .CodeMirror textarea",outputFormat);
    await newTab.type("#tags_tag",tags);
    await newTab.keyboard.press("Enter");
    await newTab.click(".save-challenge.btn.btn-green");
    await newTab.close();
}