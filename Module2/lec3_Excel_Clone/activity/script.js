let topRow=document.querySelector(".top-row");
let leftCol=document.querySelector(".left-col");
let topLeftCell=document.querySelector(".top-left-cell")
let allCells=document.querySelectorAll(".cell");
let addressInput=document.querySelector("#address");
let lastSelectedCell;
let formulaInput=document.querySelector("#formula");

cellsContentDiv.addEventListener("scroll",function(e){
    let top=e.target.scrollTop;
    let left=e.target.scrollLeft;
     
    topRow.style.top=top + "px";
    leftCol.style.left=left + "px";
    topLeftCell.style.top=top + "px";
    topLeftCell.style.left=left + "px";
});

for(let i=0;i<allCells.length;i++)
{
    allCells[i].addEventListener("click",function(e){
        let rowId=Number(e.target.getAttribute("rowId"));
        let colId=Number(e.target.getAttribute("colId"));
        let cellObject=db[rowId][colId];
        let address = String.fromCharCode(65+colId)+(rowId+1)+"";
        addressInput.value=address;
        formulaInput.value=cellObject.formula;

        if(cellObject.fontStyle.bold){
            // agar font already bold hai
            document.querySelector(".bold").classList.add("active-font-style");
        }
        else{
            //agar nai bold to active filter hata lo( incase vo active hota to )
            document.querySelector(".bold").classList.remove("active-font-style");
        }

        cellObject.fontStyle.italic 
            ? document.querySelector(".italic").classList.add("active-font-style")
            : document.querySelector(".italic").classList.remove("active-font-style");

        cellObject.fontStyle.underline
            ? document.querySelector(".underline").classList.add("active-font-style")
            : document.querySelector(".underline").classList.remove("active-font-style");

    });

    allCells[i].addEventListener("blur",function(e){
        lastSelectedCell=e.target;
        let cellValue=e.target.textContent;
        let rowId=Number(e.target.getAttribute("rowId"));
        let colId=Number(e.target.getAttribute("colId"));
        let cellObject=db[rowId][colId];
        if(cellObject.value==cellValue && !cellObject.formula) // this step removes redundancy 
        {
            return;
        }

        if(cellObject.formula){
            removeFormula(cellObject);
            formulaInput.value="";
        }
        //update cell in db
        cellObject.value=cellValue;

        //update children
        updateChildren(cellObject);

        if(cellObject.visited)
        {
            return;
        }
        cellObject.visited=true;
        visitedCells.push({rowId:rowId,colId:colId});   
    });

    allCells[i].addEventListener("keydown",function(e){
        if(e.key=="Backspace"){
            let cell=e.target;
            let{rowId,colId}=getRowIdColIdOfElement(cell);
            let cellObject=db[rowId][colId];
            if(cellObject.formula){
                cellObject.formula=""; 
                formulaInput.value="";
                removeFormula(cellObject);
                cell.textContent="";

            }
        }
    });
}

formulaInput.addEventListener("blur",function(e){
    let formula=e.target.value;
    if(formula){
        let{rowId,colId}=getRowIdColIdOfElement(lastSelectedCell);
        let cellObject=db[rowId][colId];

        // if cell object already has a formula
        if(cellObject.formula)
        {
            removeFormula(cellObject);
        }
        let computedValue=solveFormula(formula,cellObject);
        cellObject.value=computedValue;
        cellObject.formula=formula;

        //ui update
        lastSelectedCell.textContent=computedValue;
        // console.log(db);

        //update children
        updateChildren(cellObject);
        
        
        if(cellObject.visited)
        {
            return;
        }
        cellObject.visited=true;
        visitedCells.push({rowId:rowId,colId:colId});   
        console.log(sheetsDB);
    }
})