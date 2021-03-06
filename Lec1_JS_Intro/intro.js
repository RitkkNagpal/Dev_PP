// to print anything
console.log("Hello World!");

//top to down 
//left to right

// traditional DataTypes => int,char,float,double,boolean,long
// Javascript DataTypes =>number(int ,double,float,long),string("abshcb",'a'),boolean(true,false)
// arrays undefined

let data={
    name:"Ritik Nagpal",
    place:"Delhi",
    values:[10,false,{
        name:"Steve",
        place:"Queens"
    },
    "This is a string",
    [1,2,3,4,5,6]
            ],
    movies:{
        name:"American Psycho",
        rating:"8.0"
    }    
};
console.log(data.movies.name);
console.log(data.values);
console.log(data.values[4][5]);