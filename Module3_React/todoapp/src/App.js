import React, { Component } from 'react';
import InputBox from"./Components/InputBox/InputBox.jsx"
import TodoList from './Components/TodoList/TodoList.jsx';

class App extends Component {
    state = {
      todos:[
      // {id:"1",todo:"Learn JS"},
      // {id:"2",todo:"Learn ES6"},
      // {id:"3",todo:"Learn HTML"},
      // {id:"4",todo:"Learn CSS"}
    ]
  }

  addTodo = (todo)=>{
    let updatedTodos=[
      ...this.state.todos,
      {id : this.state.todos.length + 1, todo : todo}];
    this.setState({
      todos : updatedTodos
    });
  }


  deleteTodo = (id)=>{
    let updatedTodos = this.state.todos.filter(function(obj){
        if(obj.id == id){
          return false;
        }
        return true;
    })

    this.setState({
      todos:updatedTodos
    })
    console.log(updatedTodos);
  }
  render() { 
    let todos=this.state.todos;
    let deleteTodo=this.deleteTodo;
    return (<div className="App">
      <InputBox addTodo={this.addTodo}></InputBox>
      <TodoList todos={todos} deleteTodo={deleteTodo}></TodoList>
    </div>);
  }
}
export default App;
