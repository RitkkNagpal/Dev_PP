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

    await addModerator(browser,tab);
})();

async function addModerator(browser,tab)
{
    //algo
    //1 get all links of challenges
    //2 loop on all links and call addModeratorToAQuestion 
    // addModeratorToAQuestion(quesLink,browser)
    //3 if nextpage button is not disabled then click on it
    //4 call addModerator(broswer,tab)


    await tab.waitForSelector(".table-body.mlB.text-center a");
    let allATags=await tab.$$(".table-body.mlB.text-center a");
    let allLinks=[];
    for(let i=0;i<allATags.length;i++)
    {
        let singleLink=await tab.evaluate(function (elem){ return elem.getAttribute("href");},allATags[i]);
        allLinks.push("https://www.hackerrank.com"+singleLink);
    }

    let addAllModeratorPromise=[];
    for(let i=0;i<allLinks.length;i++)
    {
        let moderatorAddPromise=addModeratorToAQuestion(allLinks[0],browser);
        addAllModeratorPromise.push(moderatorAddPromise);
    }
    await Promise.all(addAllModeratorPromise);

    let allLis=await tab.$$(".pagination li");
    let nextBtnLi=allLis[allLis.length-2];

    let isDisabled = await tab.evaluate(function (elem){return elem.classList.contains("disabled");},nextBtnLi);
    if(isDisabled)
    {
        return;
    }
    else{
        await nextBtnLi.click();
        addModerator(browser,tab);
    }
}

async function addModeratorToAQuestion(quesLink,broswer)
{
    let newTab=await broswer.newPage();
    newTab.goto(quesLink);

    await newTab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav.row li[data-tab="moderators"]',{visible:true});
    await newTab.click('.nav-tabs.nav.admin-tabbed-nav.row li[data-tab="moderators"]');
    
    await newTab.waitForTimeout(1000);
    await newTab.waitForSelector("#moderator",{visible:true});
    await newTab.type('#moderator',"Ritik");
    await newTab.click(".btn.moderator-save");
    await newTab.click('.save-challenge.btn.btn-green');
    await newTab.close();
}