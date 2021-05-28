#!/usr/bin/env node
//shebang syntax

const x= process.argv.slice(2);
// console.log(x);    // returns shallow copy of arr into new arr object selected from start to end (end not included)
const fs= require("fs");
const path= require("path");
// console.log(__dirname);

const ext= require("./extensions");
// console.log(ext);

switch(x[0]){
    case "tree": tree(x[1]);
        break;
    case "organize": organize(x.slice(1));
        break;
    case "help": help();
        break;
    default: console.log("Please enter correct commands");
}


var explored;
function tree(filePath){
    explored=0;
    if(fs.existsSync(filePath)){
        treeUtil(filePath, "");
    }
    else{
        treeUtil(process.cwd(), "");
    }
    console.log(explored+" explored");
}

function treeUtil(root, indent){
    explored++;
    try {
        fs.lstatSync(root);
    } catch (error) {
        return;
    }
    if(fs.lstatSync(root).isFile()){
        console.log(indent+"├──"+path.basename(root));
    }
    else{
        console.log(indent+"└──"+path.basename(root));

        try {

            const allFiles= fs.readdirSync(root);
            for(file in allFiles){
                treeUtil(path.join(root, allFiles[file]), indent+"   ");
        }    
        } catch (error) {
            return;
        }
        
    }
}



function organize(args){
    if(args.length>0){

        if(fs.existsSync(args[0]) && fs.existsSync(args[1])){     //both src and dest paths exist

            if(args[2]){        //dir name exists
                const dir= path.join(args[1], args[2]);     //destpath & dirname
                if(fs.existsSync(dir)){     //same named dir exists
                    console.log(`"${args[1]}" dir already exists`);
                    return;
                }
                else{
                    fs.mkdirSync(dir);
                    console.log("dir created");
                    console.log("Path= "+dir);
                    organizeUtil(args[0], dir);
                }
            }
            else{
                console.log("Please provide a dirname also");
                return;
            }
        }
        else if(fs.existsSync(args[0])){     //only src path exists

            if(args[1]){
                const dir= path.join(args[0], args[1]);     //srcpath & dirname
                if(fs.existsSync(dir)){     //same named dir exists
                    console.log(`"${args[1]}" dir already exists`);
                    return;
                }
                else{
                    fs.mkdirSync(dir);
                    console.log("dir created");
                    console.log("Path= "+dir);
                    organizeUtil(args[0], dir);
                }
            }
            else{
                console.log("Please provide a dirname also");
                return;
            }
        }
        else{
            console.log("Please provide valid path(s) and a valid dirname");
            return;
        }
    }
    else{
        console.log("Please provide srcpath, destpath and dirname");
        return;
    }
}

function organizeUtil(src, dest){
    console.log("Src= "+src+"\n");
    let allFiles= fs.readdirSync(src);
    for(let i=0;i<allFiles.length;i++){
        if(fs.lstatSync(path.join(src, allFiles[i])).isFile()){

            let categ= category(allFiles[i]);
            orgFile(allFiles[i], src, dest, categ);
        }
    }
}

function category(fileName){
    let fileExt= (path.extname(fileName)).slice(1);
    // console.log(fileExt);

    for(ftype in ext){
        let extArr= ext[ftype];
        for(fxt in extArr){
            if(extArr[fxt] === fileExt){
                // console.log(fileExt+" "+ftype);
                return ftype;                
            }
        }
    }
}

function orgFile(file, src, dest, categ){
    if(!categ)
        return;
    const categPath= path.join(dest, categ);
    if(fs.existsSync(categPath)){
    }
    else{
        fs.mkdirSync(categPath);
    }

    const fileSrc= path.join(src, file);
    const fileDest= path.join(categPath, file);

    fs.copyFileSync(fileSrc, fileDest);
    console.log(file);
}



function help(){
    console.log(`All Commands:
node index.js tree "\path"
node index.js organize "\srcpath" "\destpath" "dirname"
node index.js help`);
}
