const fs=require("fs");
const path=require("path");
let extensions=require("./util");
let folderPath="./Downloads";
let extFolderPath;

// to check if the extension folder already exists or not
function checkFolder(extension){
    // checks if extension is matching with any folder name
    //.jpg
    //"./Downloads"

    for(let key in extensions)
    {
        // images -> audio ->....
        if(extensions[key].includes(extension))
        {
            // string interpolation or appending string
            extFolderPath=`${folderPath}/${key}`;
            break;
        }
    }
    //".Downloads/Images"
    return fs.existsSync(extFolderPath);
}

function moveFile(fileName)
{
    //copy
    let sourceFilePath=`${folderPath}/${fileName}`;
    let destinationFilePath=`${extFolderPath}/${fileName}`;
    fs.copyFileSync(sourceFilePath,destinationFilePath);

    //delete the file
    fs.unlinkSync(sourceFilePath);
}

function createFolder()
{
    fs.mkdirSync(extFolderPath);
}

function sortFolder(folderPath)
{
    let content=fs.readdirSync(folderPath);

    for(let i=0;i<content.length;i++)
    {
        // get extensions of each file
        let extensionName=path.extname(content[i]);
        console.log(extensionName);
        let extensionFolderExist=checkFolder(extensionName);//returns boolean value
        if(extensionFolderExist)
        {
            moveFile(content[i]);
        }
        else{
            createFolder();
            moveFile(content[i]);
        }
    }
}

sortFolder(folderPath);