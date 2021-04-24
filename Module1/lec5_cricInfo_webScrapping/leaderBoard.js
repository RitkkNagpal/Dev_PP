const fs=require("fs");

let leaderBoard=JSON.parse(fs.readFileSync("./leaderBoard.json"));
console.table(leaderBoard);