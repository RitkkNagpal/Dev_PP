const cheerio=require("cheerio");
const fs=require("fs");
const request=require("request");

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary",cb);

function cb(error,response,body)
{
    parseData(body);
}

function parseData(html)
{
    let ch=cheerio.load(html);

    let lastBallCommentarySelector=ch('div[itemprop="articleBody"] p');

    let lastBallCommentary=ch(lastBallCommentarySelector['0']).text();
    console.log(lastBallCommentary);
}