const puppeteer=require("puppeteer");
const id="bomope9847@irahada.com";
const pwd="123456789";

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
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");

})();