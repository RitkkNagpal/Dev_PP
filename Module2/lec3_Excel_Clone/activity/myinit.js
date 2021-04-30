let cellsContentDiv=document.querySelector(".cells-content");

function initCells(){

    /** IMPLEMENTING THIS FORMAT **/
    // <div class="row">
        // <div class="cell"></div>
        // <div class="cell"></div>
        // <div class="cell"></div>
        // <div class="cell"></div>
        // <div class="cell"></div>
        // <div class="cell"></div>
    // </div>

    let cellsContent="<div class='top-left-cell'></div>";
    cellsContent+="<div class='top-row'>"
    
    //for putting alphabets in one row
    for(let i=0;i<26;i++){
        cellsContent+=`<div class='top-row-cell'>${String.fromCharCode(65+i)}</div>`;
    }
    cellsContent+="</div>"

    cellsContent+="<div class='left-col'>"
    for(let i=0;i<100;i++)
    {
        cellsContent+=`<div class="left-col-cell">${i+1}</div>`;
    }

    cellsContent+="</div>";
    
    cellsContent+="<div class='cells'>";
    
    for(let i=0;i<100;i++){
        cellsContent+="<div class='row'>";
        for(let j=0;j<26;j++){ 
            cellsContent+="<div class='cell' contentEditable='true'></div>";
        }
        cellsContent+="</div>";
    }
    cellsContent+="</div>"

    cellsContentDiv.innerHTML=cellsContent;
}

initCells();

let db;
function initDB(){
    db=[];
    for(let i=0;i<100;i++)
    {
        let row=[];
        for(let j=0;j<26;j++){
            let name=String.fromCharCode(65+j)+(i+1)+"";
            let cellOject={
                name:name,
                value:""
            }
            row.push(cellOject);
        }
        db.push(row);
    }
}
initDB();