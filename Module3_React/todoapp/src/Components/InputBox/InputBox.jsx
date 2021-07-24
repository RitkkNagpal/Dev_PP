import React, { Component } from 'react';

class InputBox extends Component {
    state = {
        todoValue:""
    }

    handleOnchange = (e)=>{
        let updatedTodoValue = e.target.value;
        this.setState({
            todoValue : updatedTodoValue,
        });
    }

    handleAddTodo = (e)=>{
        let todo=this.state.todoValue;
        if(todo) //todo has some value
        {
            this.props.addTodo(todo);
            this.setState({
                todoValue : ""
            });
        }
    };

    handleAddTodoKey =(e)=>{
        if(e.key == "Enter")
        {
            this.handleAddTodo();
        }
    }

    render() {
        let todoValue = this.state.todoValue;
        let handleAddTodo = this.handleAddTodo;
        let handleOnchange=this.handleOnchange;
        return<div className="input-box container input-group m-4">
            <input 
                className="form-control" 
                onChange={handleOnchange} 
                onKeyPress={this.handleAddTodoKey}
                value = {todoValue}>
            </input>
            <button className="btn btn-success" onClick={handleAddTodo}>Add Todo</button>
        </div>
    }
}
 
export default InputBox;
