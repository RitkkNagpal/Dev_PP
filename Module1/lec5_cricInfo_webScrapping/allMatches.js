const cheerio=require("cheerio");
const request=require("request");
let getMatch=require("./match");
function getAllMatches(link)
{
    request(link,cb);
}

function cb(error,response,data)
{
    parseData(data);
}

function parseData(html)
{
    let ch=cheerio.load(html);
    let allATags=ch('a[data-hover="Scorecard"]');

    for(let i=0;i<allATags.length;i++)
    {
        let aTag=allATags[i+""];
        let link="https://www.espncricinfo.com"+ch(aTag).attr("href");
        getMatch(link);
    }
}

module.exports=getAllMatches;