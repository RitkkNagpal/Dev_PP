const puppeteer=require("puppeteer");
const id="bomope9847@irahada.com";
const pwd="123456789";
let tab;
// all functions of puppeteer are promisified=> gives you a pending promise

//opens a browser

let browserOpenPromise=puppeteer.launch({
    headless: false,
    defaultViewport : null,
    args: ["--start-maximized"],
    slowMo : 100
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
        let id=tab.type
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
        console.log("Logged into hackerrank");
    })
    .catch(function (error) {
        console.log(error);
    });
