const request=require("request");
const cheerio=require("cheerio");
const fs=require("fs");

let highestWicketTaker={}; //created an empty object

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/kolkata-knight-riders-vs-rajasthan-royals-54th-match-1216530/full-scorecard",cb);

function cb(error,response,data)
{
    parseData(data);
}

function parseData(html)
{
    let highestWicketsSoFar=0;
    let nameofHighestWicketTaker;
    let economy;

    let ch=cheerio.load(html);
    let bothBowlingTables=ch('.Collapsible .table.bowler');
    for(let i=0;i<bothBowlingTables.length;i++)
    {
        let bowlingTable=bothBowlingTables[i];
        let allTrs=ch(bowlingTable).find("tbody tr");
        //{0:tr, 1:tr, 2:tr.....}

        for(let j=0;j<allTrs.length;j++)
        {
            let allTds=ch(allTrs).find("td");
            let wicketsTaken=ch(allTds[4]).text();
            if(wicketsTaken>highestWicketsSoFar)
            {
                highestWicketsSoFar=wicketsTaken;
                nameofHighestWicketTaker=ch(allTds[0]).text();
                economy=ch(allTds[5]).text();
            }

            // 0=>name //4=>wickets //5=>eco
        }
    }

    highestWicketTaker.name=nameofHighestWicketTaker;
    highestWicketTaker.wickets=highestWicketsSoFar;
    highestWicketTaker.economy=economy;

    console.log(highestWicketTaker);
}