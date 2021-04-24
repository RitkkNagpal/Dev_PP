//works on a single match
const cheerio=require("cheerio");
const request=require("request");
const fs=require("fs");

function getMatch(link)
{
    request(link,cb);
}
function cb(error,response,data)
{
    parseData(data);
}

function parseData(html)
{
    //html of sinle match
    let ch=cheerio.load(html);
    let bothInnings=ch(".match-scorecard-page .Collapsible"); //has two occurances in the match
    for(let i=0;i<bothInnings.length;i++)
    {
        let inning=ch(bothInnings[i+""]);
        let teamName=inning.find("h5").text().split("INNINGS")[0].trim();
        let batsmanTable=inning.find(".table.batsman");

        let allTrs=batsmanTable.find("tbody tr");

        for(let j=0;j<allTrs.length-1;j++)
        {
            let allTds=ch(allTrs[j]).find("td");
            if(allTds.length>1)
            {
                //valid table division
                let batsmanName=ch(allTds['0']).text().trim();
                let runs=ch(allTds['2']).text().trim();
                let balls=ch(allTds['3']).text().trim();
                let fours=ch(allTds['5']).text().trim();
                let sixes=ch(allTds['6']).text().trim();
                let strikeRate=ch(allTds['7']).text().trim();

                // processBatsman(teamName,batsmanName,runs,balls,fours,sixes,strikeRate);

                processLeaderBoard(teamName,batsmanName,runs,balls,fours,sixes);
            }
            
        }
    }
}

function processLeaderBoard(teamName,batsmanName,runs,balls,fours,sixes)
{
    let leaderBoard=JSON.parse(fs.readFileSync("./leaderBoard.json"));
    runs=Number(runs);
    sixes=Number(sixes);
    fours=Number(fours);
    balls=Number(balls);


    if(leaderBoard.length)
    {
        for(let i=0;i<leaderBoard.length;i++)
        {
            let entry=leaderBoard[i];
            if(entry.Team==teamName&&entry.Batsman==batsmanName)
            {
                entry.Runs+=runs;
                entry.Balls+=balls;
                entry.Sixes+=sixes;
                entry.Fours+=fours;
                fs.writeFileSync("./leaderBoard.json",JSON.stringify(leaderBoard));
                return;    
            }

        }
    }
        let entry={
            Team:teamName,
            Batsman: batsmanName,
            Runs:runs,
            Balls:balls,
            Fours:fours,
            Sixes:sixes
        }

        leaderBoard.push(entry);
        fs.writeFileSync("./leaderBoard.json",JSON.stringify(leaderBoard));
}


// function checkTeamFolder(teamName)
// {
//     let teamPath=`./IPL/${teamName}`;
//     return fs.existsSync(teamPath);
// }


// function checkBatsmanFile(teamName,batsmanName)
// {
//     let batsmanFilePath=`./IPL/${teamName}/${batsmanName}.json`;
//     return fs.existsSync(batsmanFilePath);
// }

// function createTeamFolder(teamName)
// {
//     let teamPath=`./IPL/${teamName}`;
//     fs.mkdirSync(teamPath);
// }


// function createBatsmanFile(teamName,batsmanName,runs,balls,fours,sixes,strikeRate)
// {
//     let batsmanFilePath=`./IPL/${teamName}/${batsmanName}.json`;
//     let batsmanFile=[];
//     let innings={
//         Runs:runs,
//         Balls:balls,
//         Fours:fours,
//         Sixes:sixes,
//         StrikeRate:strikeRate
//     };
//     batsmanFile.push(innings);
//     let stringiFiedData=JSON.stringify(batsmanFile);
//     fs.writeFileSync(batsmanFilePath,stringiFiedData);
// }


// function updateBatsmanFile(teamName,batsmanName,runs,balls,fours,sixes,strikeRate)
// {
//     let batsmanFilePath=`./IPL/${teamName}/${batsmanName}.json`;
//     let stringiFiedData=fs.readFileSync(batsmanFilePath);
//     let batsmanFile=JSON.parse(stringiFiedData);
//     let innings={
//         Runs:runs,
//         Balls:balls,
//         Fours:fours,
//         Sixes:sixes,
//         StrikeRate:strikeRate
//     }
//     batsmanFile.push(innings);
//     fs.writeFileSync(batsmanFilePath,JSON.stringify(batsmanFile));
// }


// function processBatsman(teamName,batsmanName,runs,balls,fours,sixes,strikeRate)
// {
//     let isTeamPresent=checkTeamFolder(teamName);
//     if(isTeamPresent)
//     {
//         let isBatsmanPresent=checkBatsmanFile(teamName,batsmanName);

//         if(isBatsmanPresent)
//         {
//             updateBatsmanFile(teamName,batsmanName,runs,balls,fours,sixes,strikeRate)
//         }
//         else
//         {
//             createBatsmanFile(teamName,batsmanName,runs,balls,fours,sixes,strikeRate);
//         }
//     }
//     else
//     {
//         createTeamFolder(teamName);
//         createBatsmanFile(teamName,batsmanName,runs,balls,fours,sixes,strikeRate);
//     }
// }

module.exports=getMatch;
