let cellsContentDiv=document.querySelector(".cells-content");

function initCells(){
    let cellContent=`<div class="top-left-cell"></div>`;

    cellContent+=`<div class="top-row">`;
    //for putting alphabets in the front row
    for(let i=0;i<26;i++)
    {
        cellContent+=`<div class="top-row-cell">${String.fromCharCode(65+i)}</div>`;
    }
    cellContent+=`</div>`;
    
    
    cellContent+=`<div class="left-col">`;
    for(let i=0;i<100;i++)
    {
        cellContent+=`<div class="left-col-cell">${i+1}</div>`;
    }
    cellContent+=`</div>`;
    

    cellContent+=`<div class="cells">`;
    for(let i=0;i<100;i++)
    {
        cellContent+=`<div class="row">`;
        for(let j=0;j<26;j++)
        {
            cellContent+=`<div class="cell" rowId="${i}" colId="${j}" contentEditable="true"></div>`;
        }
        cellContent+=`</div>`;
    }
    cellContent+=`</div>`;

    cellsContentDiv.innerHTML=cellContent;
}

initCells();

let sheetsDB=[];
let db; //active sheet db
let visitedCells; //active sheets ke visited cells
function initDB(){
    let newSheetDB=[];
    for(let i=0;i<100;i++)
    {
        let row=[];
        for(let j=0;j<26;j++)
        {
            let name=String.fromCharCode(j+65)+(i+1)+"";
            let cellObject={
                name:name,
                value:"",
                formula:"", 
                children:[],
                parents:[],
                visited:false,
                fontStyle: {bold : false, italic : false, underline : false}
            }
            row.push(cellObject);
        }
        newSheetDB.push(row);
    }
    visitedCells=[];
    sheetsDB.push({db : newSheetDB, visitedCells : visitedCells});
    //here we are storing it in db as then we would have to change the name of db everywhere
    db=newSheetDB; //now all work would be done on the current sheet db
}

initDB();