class Counter extends React.Component{
    constructor(){
        super();
        this.state={
            counter : 0,
        }
    }
    increment=()=>{
        this.setState({
            counter : this.state.counter+1,
        })
    }

    decrement=()=>{
        this.setState({
            counter : this.state.counter-1,
        })
    }

    reset=()=>{
        this.setState({
            counter : 0,
        })
    }
    render(){
        return (<React.Fragment>
            <p className="badge bg-secondary d-inline-block m-4">{" "}{this.state.counter}{" "}</p>
            <div>
                <button className="btn btn-outline-primary m-2" onClick={this.increment}>+</button>
                <button className="btn btn-outline-danger m-2" onClick={this.decrement}>-</button>
                <button className="btn btn-outline-warning m-2" onClick={this.reset}>Reset</button>
            </div>

        </React.Fragment>)
    }
}

ReactDOM.render(<React.Fragment><Counter></Counter><Counter></Counter><Counter></Counter></React.Fragment>,document.querySelector("#root"));