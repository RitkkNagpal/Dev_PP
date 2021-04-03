const cheerio=require("cheerio");
const request=require("request");
const getAllMatches = require("./allMatches");

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595",cb);

function cb(error,response,data)
{
    parseData(data);
}
function parseData(html)
{
    let ch=cheerio.load(html);

    let atag=ch('a[data-hover="View All Results"]');
    let link="https://www.espncricinfo.com"+atag['0']["attribs"]['href'];
    getAllMatches(link);
}   