let cellsContentDiv=document.querySelector(".cells-content");
let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");
let topLeftCell = document.querySelector(".top-left-cell");


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

cellsContentDiv.addEventListener("scroll",function(e){
    let top=e.target.scrollTop;
    let left=e.target.scrollLeft;
    
    topRow.style.top = top + "px";
    topLeftCell.style.top = top + "px";
    topLeftCell.style.left = left + "px";
    leftCol.style.left = left + "px";  
})


