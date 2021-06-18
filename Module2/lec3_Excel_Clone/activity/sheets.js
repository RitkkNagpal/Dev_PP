
let addSheetBtn=document.querySelector(".add-sheet");
let sheetsList=document.querySelector(".sheets-list");
let sheetId=0;

addSheetBtn.addEventListener("click",function(e){
    sheetId++;
    // it will remove active-sheet class from the previous sheet
    document.querySelector(".active-sheet").classList.remove("active-sheet");
    let sheetDiv= document.createElement("div");
    sheetDiv.classList.add("sheet");
    //this will add active sheet class in the new sheet
    sheetDiv.classList.add("active-sheet");
    sheetDiv.setAttribute("sheetid",sheetId);
    sheetDiv.innerHTML=`Sheet ${sheetId+1}`;

    // <div class="sheet",sheetId="1">Sheet 2</div>
    sheetsList.append(sheetDiv);
    

    //updates UI
    initUI();

    //new sheet db initialization
    //sheetsDB.push(newSheetDB);
    //db=new sheet DB
    initDB();

});

sheetsList.addEventListener("click",function(e){
    let clickedSheet=e.target;
    //if already it was a active-sheet
    if(clickedSheet.classList.contains("active-sheet"))
    {
        return;
    }
    // if non active sheet

    // it will remove active-sheet class from the previous sheet
    document.querySelector(".active-sheet").classList.remove("active-sheet");
    //add active sheet class to the current sheet 
    clickedSheet.classList.add("active-sheet");
    
    initUI();// empties the ui according to the previous sheet

    //set active db according to the active sheet
    let sheetId=clickedSheet.getAttribute("sheetid");
    
    //sets db in visited cells
    db=sheetsDB[sheetId].db;
    
    visitedCells=sheetsDB[sheetId].visitedCells;

    //set UI according to DB
    setUI();
});

function initUI(){
    // for(let i=0;i<100;i++)
    // {
    //     for(let j=0;j<26;j++)
    //     {
    //         document.querySelector(`div[rowId="${i}"][colId="${j}"]`).innerHTML="";
    //     }
    // }
    
    for(let i=0;i<visitedCells.length;i++)
    {
        let{rowId,colId}=visitedCells[i];
        document.querySelector(`div[rowId="${rowId}"][colId="${colId}"]`).innerHTML="";
    }
}

function setUI()
{
    // for(let i=0;i<100;i++)
    // {
    //     for(let j=0;j<26;j++)
    //     {
    //         let cellObject=db[i][j];
    //         document.querySelector(`div[rowId="${i}"][colId="${j}"]`).textContent=cellObject.value;
    //     }
    // }
    for(let i=0;i<visitedCells.length;i++)
    {
        let {rowId,colId}=visitedCells[i];
        let cellObject=db[rowId][colId];
        document.querySelector(`div[rowId="${rowId}"][colId="${colId}"]`).textContent=cellObject.value;
    }
}