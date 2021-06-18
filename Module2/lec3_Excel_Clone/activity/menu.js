let menu=document.querySelector(".menu");
let fileMenuOptions=document.querySelector(".file-menu-options");
let homeMenuOptions=document.querySelector(".home-menu-options");
let bold=document.querySelector(".bold");
let italic=document.querySelector(".italic");
let underline=document.querySelector(".underline");

menu.addEventListener("click",function(e){
    if(e.target.classList.contains("menu")){
        return;
    }
    
    let seletedMenu=e.target;
    
    if(seletedMenu.classList.contains("active-menu")){
        return;
    }

    document.querySelector(".active-menu").classList.remove("active-menu"); 
    seletedMenu.classList.add("active-menu");

    let menuName=seletedMenu.classList[0];
    if(menuName=="home")
    {
        homeMenuOptions.classList.remove("hide");
        fileMenuOptions.classList.add("hide");
    }
    else{
        fileMenuOptions.classList.remove("hide");
        homeMenuOptions.classList.add("hide");
    }
});

bold.addEventListener("click",function(e){

    if(lastSelectedCell)
    {
        let {rowId,colId}=getRowIdColIdOfElement(lastSelectedCell);
        let cellObject=db[rowId][colId];

        //if bold was already present(i.e true)
        if(cellObject.fontStyle.bold)
        {
            // changes in UI
            lastSelectedCell.style.fontWeight="normal";
            bold.classList.remove("active-font-style"); 
        }
        else{
            lastSelectedCell.style.fontWeight="bold";
            bold.classList.add("active-font-style"); 
        }

        //changes in db
        cellObject.fontStyle.bold=!cellObject.fontStyle.bold;
    }
    // if(bold.classList.contains("active-font-style"))
    // {
    //     //if bold was already selected then remove active filter class from it
    //     bold.classList.remove("active-font-style");
    // }
    // else{
    //     bold.classList.add("active-font-style");
    // }
});

italic.addEventListener("click",function(e){
    if(lastSelectedCell)
    {
        let {rowId,colId}=getRowIdColIdOfElement(lastSelectedCell);
        let cellObject=db[rowId][colId];

        //if italic was already present(i.e true)
        if(cellObject.fontStyle.italic)
        {
            // changes in UI
            lastSelectedCell.style.fontStyle="normal";
            italic.classList.remove("active-font-style"); 
        }
        else{
            lastSelectedCell.style.fontStyle="italic";
            italic.classList.add("active-font-style"); 
        }

        //changes in db
        cellObject.fontStyle.italic=!cellObject.fontStyle.italic;
    }
});

underline.addEventListener("click",function(e){
    if(lastSelectedCell)
    {
        let {rowId,colId}=getRowIdColIdOfElement(lastSelectedCell);
        let cellObject=db[rowId][colId];

        //if underline was already present(i.e true)
        if(cellObject.fontStyle.underline)
        {
            // changes in UI
            lastSelectedCell.style.textDecoration="none";
            underline.classList.remove("active-font-style"); 
        }
        else{
            lastSelectedCell.style.textDecoration="underline";
            underline.classList.add("active-font-style"); 
        }

        //changes in db
        cellObject.fontStyle.underline=!cellObject.fontStyle.underline;
    }
});

