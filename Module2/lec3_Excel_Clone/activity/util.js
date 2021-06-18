function solveFormula(formula,selfCellObject) //selfcellobject is the last selected cell
{
    //( A1 + A2 )
    // formula is always space separated
    
    //this loop will replace value of A1 and A2 by their respective cell values
    let formulaComponents=formula.split(" "); //split on the basis of spaces
    
    // will give something like this  {'(' ,'A1', '+', 'A2', ')'}
    
    for(let i=0;i<formulaComponents.length;i++)
    {
        let singleComponent=formulaComponents[i];
        if(singleComponent[0] >= "A" && singleComponent[0] <= "Z"){ //if first letter of each component falls in the range
            // valid component A1->Z100
            
            let{rowId,colId}=getRowIdColIdFromAddress(singleComponent);
            let cellObject=db[rowId][colId];
            let value=cellObject.value;
            if(selfCellObject){
                //push yourself in the children of formula components of cellobject
                cellObject.children.push(selfCellObject.name);
                cellObject.parents.push(cellObject.name);
            }
            
            formula=formula.replace(singleComponent,value);
        }
    }
    let computedValue=eval(formula);
    return computedValue;
}

function getRowIdColIdOfElement(element){
    let rowId=element.getAttribute("rowId");
    let colId=element.getAttribute("colId");
    return{
        rowId,colId
    };
}

function getRowIdColIdFromAddress(address)
{
    //B2 -> 1,1 (colid,rowid)
    let rowId=Number(address.substring(1))-1;
    let colId=address.charCodeAt(0)-65 //char code at will return ascii value eg :- for b it will give 66

    return{
        rowId,colId
    };
}

function updateChildren(cellObject){

    for(let i=0;i<cellObject.children.length ;i++){
        let childrenName=cellObject.children[i];

        let {rowId,colId}=getRowIdColIdFromAddress(childrenName);
        let childrenCellObject=db[rowId][colId];

        let newValue=solveFormula(childrenCellObject.formula);
        
        //ui update
        document.querySelector(`div[rowId="${rowId}"][colid="${colId}"]`).textContent=newValue;

        //db update
        childrenCellObject.value=newValue
        
        //if any cell is dependent on the children cell then update that too (cell which is not directly affected by change in value of parent cell)
        updateChildren(childrenCellObject); 
    }
}

function removeFormula(cellObject)
{
    cellObject.formula="";

    for(let i=0;i<cellObject.parents.length;i++)
    {
        let parentName=cellObject.parents[i];
        let {rowId,colId}=getRowIdColIdFromAddress(parentName);
        let parentCellObject=db[rowId][colId];
        let updatedChildren=parentCellObject.children.filter(function(children){
            return children!=cellObject.name;
        });

        parentCellObject.children=updatedChildren;
    }

    cellObject.parents=[];
}