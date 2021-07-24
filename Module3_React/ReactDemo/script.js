// //where to render where to render

// // this is component
// let names=["Thomas","Aurther","John","Ada","Polly","Michael"];
// function BigHello(){
//     return(<React.Fragment>
//         {
//             names.map(function (name) {
//                 return <Hello name={name}></Hello>   
//             })
//         }
//     </React.Fragment>
//     );
// }
// function Hello(props){
//     return <h1>Hello this is a component {props.name}</h1>
// }
// ReactDOM.render(<BigHello></BigHello>,
//     document.querySelector("#root")
// );
let counter=1;
let names=["Luca Changreta","Billy Kimber","Campbel","Oswald Mosely"];
function BigHello(){
    return<React.Fragment>
        {
            names.map(function(name){
                return <Hello key={name} name={name} counter={counter++}></Hello>
            })
        }
    </React.Fragment>
}
function Hello(props){
    return <h1>Hi Tommy, I am {props.name}</h1>
}
ReactDOM.render(<BigHello></BigHello>,document.querySelector("#root")
);