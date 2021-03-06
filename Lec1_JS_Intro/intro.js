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
let key = "name";
data.key;
// console.log( key );

// bracket notation
// console.log(data[key]);

data.name = "I am a new Value";
// console.log(data);

// keys => unique
// values => duplicate

// Arrays

// int arr[] = [10,20,30,50];
// int arr[] = new int[10];

let values = [
  10,

  false,

  {
    name: "Steve Rogers",
    place: "Queens",
  },
  "Hey i am a value",
  [1, 2, 3, 4, 5, 6],
];

// console.log(values);
// console.log(values[2].place);


// in loop
for( let key in data ){
    console.log(key);