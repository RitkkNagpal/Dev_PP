const fs=require("fs");
const request=require("request");
const cheerio=require("cheerio");

request("https://github.com/topics",parseData);

function parseData(error,response,data)
{
    let ch=cheerio.load(data);
    let allATags=ch('ul[class="d-flex flex-wrap flex-justify-start flex-items-stretch list-style-none gutter my-4"] li a');
    for(let i=0;i<allATags.length;i++)
    {
        let singleTopicLink=ch(allATags[i]).attr("href");
        let completeLink="https://github.com"+singleTopicLink;
        getIssuesOfTopic(completeLink);
    }
}

function getIssuesOfTopic(topicLink)
{
    request(topicLink,parseTopic)
}

function parseTopic(error,response,data)
{
    let ch=cheerio.load(data);
    let topicName=ch(".h1-mktg").text().trim();
    
    // if folder doesn't exist please make it
    if(!fs.existsSync(`./${topicName}`))
    {
            fs.mkdirSync(`./${topicName}`);
    }

    let allProjectArticleTags=ch(".border.rounded.color-shadow-small.color-bg-secondary.my-4");

    for(let i=0;i<5;i++)
    {
        workOnSingleProject(allProjectArticleTags[i],topicName);
    }
}

//work on a single project
function workOnSingleProject(projectArticleTag,topicName){
    //project name
    //issue link
    let projectName=cheerio(projectArticleTag).find("a.text-bold").text().trim();
    let allNavLinks=cheerio(projectArticleTag).find(".tabnav-tabs a");
    let issueLink=cheerio(allNavLinks[1]).attr("href"); 
    let completeIssueLink="https://github.com"+issueLink;
    let projectPath=`./${topicName}/${projectName}`;
    console.log(projectName);    
    if(!fs.existsSync(projectPath))
    {
        fs.mkdirSync(projectPath);
    }
    request(completeIssueLink,parseIssue);
    
    function parseIssue(error,response,data)
    {
        //now we are on issue page of a single project
        let ch=cheerio.load(data);
        let allIssueTags=ch('.js-navigation-container.js-active-navigation-container .js-issue-row .flex-auto a.h4');
        for(let i=0;i<allIssueTags.length;i++)
        {
            let issueName=ch(allIssueTags[i]).text().trim();
            let issueLink=ch(allIssueTags[i]).attr("href");
            if(!fs.existsSync(`${projectPath}/issues.json`))
            {
                fs.writeFileSync(`${projectPath}/issues.json`,JSON.stringify([]));
            }
            else{
                let issues=JSON.parse(fs.readFileSync(`${projectPath}/issues.json`));
                let newIssue={
                    "Issue Name" : issueName,
                    "Issue Link" : issueLink
                };

                issues.push(newIssue);
                fs.writeFileSync(`${projectPath}/issues.json`,JSON.stringify(issues));
            }
        }
    }
}

