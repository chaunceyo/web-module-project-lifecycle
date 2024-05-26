import React from 'react'
import TodoList from './TodoList'
import Form from './Form'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      todos: [],
      todoName: ''
    }
  }
  onTodoInputChange = evt => {
    const {value} = evt.target
    this.setState({...this.state, todoName : value})
  }

  fetchAllTodos = () => {
    axios.get(URL)
    .then(res =>{ this.setState({ ...this.state, todos : res.data.data})})
    .catch(err => { this.setState({ ...this.state, error: err.response.data.message})})
  }

  componentDidMount() {
    this.fetchAllTodos() 
    }
   

  render() {
    return (
      <div>
        <TodoList todos={this.state.todos}/>
        <Form onTodoInputChange={this.onTodoInputChange} />
      </div>
    )
  }
}
