import React, { Component } from 'react';
class TodoList extends Component {
    state = {  }
    render() { 
        let todos=this.props.todos;
        let deleteTodo=this.props.deleteTodo;
        return (<div className="todos container">
            {
                todos.map(function(obj){
                    return <div className="todo d-flex input-group container m-4" key={obj.id}>
                        <div className="form-control">{obj.todo}</div>
                        <button className="btn btn-danger" onClick={(e)=>{deleteTodo(obj.id)}}>Delete</button>
                    </div>
                })
            }
        </div>);
    }
}
 
export default TodoList;