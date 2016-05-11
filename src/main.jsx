import * as React from 'react';
import * as ReactDOM from 'react-dom';

require ('./styles/main.scss');

// Components

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state={
      todoList: []
    };
  }

  _toggleComplete(theTodoToModify){

    let todoList = this.state.todoList.map((todo)=>{
      if(theTodoToModify === todo) {
        todo.completed = !todo.completed;
      }
        return todo;
    });

    this.setState({ todoList });
  }

  _removeTodo(theTodoToModify){
    let todoList = this.state.todoList.filter((todo)=>{
      if(theTodoToModify === todo) {
        return false;
      }
        return todo;
    });

    this.setState({ todoList });
  }

  _clearCompleted(){
    let todoList = this.state.todoList.filter((todo, index)=>{
      //remove any with completed: true
      if(todo.completed){
        return false;
      }
        return true;
    });

    this.setState({ todoList });
  }

  _hasCompleted() {
    let completed = this.state.todoList.filter((todo, index)=>{
      if(todo.completed){
        return true;
      }
        return false;
    });

    return completed.length
  }

  _renderTodos(todo, index){
    return(
      <Todo key={index}
            todo={todo}
            removeTodo={this._removeTodo.bind(this)}
            toggleComplete={this._toggleComplete.bind(this)}
            />
    )
  }

  _addTodo(e) {
    e.preventDefault();
    if(this.refs.todoTitle.value){
      this.state.todoList.push({ title: this.refs.todoTitle.value, completed: false });
      this.setState({ todos: this.state.todoList })
      this.refs.todoTitle.value = '';
    }
  }

  render() {
    return (
      <div className="todo-app">

        <h1 className="top-box">Todo List!</h1>

        <div className="top-middle-box">
          <form
            name="addTodo" onSubmit={this._addTodo.bind(this)}>
            <input type="text" ref="todoTitle"/>
          </form>

          <p>(hit enter to add)</p>
        </div>
        <ul>
            {this.state.todoList.map(this._renderTodos.bind(this))}
        </ul>

        <div className="bottom-box">
          {this.state.todoList.length}&nbsp;             {this.state.todoList.length === 1 ? 'todo' : 'todos'}
          {this._hasCompleted() ? <button
            onClick={this._clearCompleted.bind(this)}>
            Clear completed</button> : ''}
        </div>

      </div>
    )
  }
}

class Todo extends React.Component {

  _toggleComplete(){
    this.props.toggleComplete(this.props.todo);
  }

  _removeTodo(){
    this.props.removeTodo(this.props.todo);
  }

  render() {
    return(
      <li  className="list-box">{ this.props.todo.title }
          <div>
            <input
              type="checkbox"
              id={this.props.id}

              defaultChecked={this.props.todo.completed}
              onClick={this._toggleComplete.bind(this)}/>
            <button onClick={this._removeTodo.bind(this)}>
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
          </div>
      </li>
    )
  }
}


ReactDOM.render(<App/>, document.getElementById('to-do-app'));
