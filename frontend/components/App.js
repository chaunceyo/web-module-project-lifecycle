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
      todoName: '',
      error: '',
      isShowingCompleted: true
    }
  }
  onTodoInputChange = evt => {
    const {value} = evt.target
    this.setState({...this.state, todoName : value})
  }
  setAxiosResponseError = err => this.setState({ ...this.state, error: err.response.data.message})

  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
    .then(res => {
     this.setState({...this.state, todos : this.state.todos.map(td => {
      if(td.id !== id) return td
      return res.data.data
     })})

    })
    .catch(this.setAxiosResponseError)
  }
  
  postNewTodo = () => {
    axios.post(URL, {name : this.state.todoName})
    .then(res => {
      this.setState({...this.state, todos : this.state.todos.concat(res.data.data)})
      this.setState({...this.state, todoName: ''})
    })
    .catch(this.setAxiosResponseError)
  }

  showCompleted = () => {
    this.setState({...this.state, isShowingCompleted: !this.state.isShowingCompleted})
  }

  onFormSubmit = evt => {
    evt.preventDefault();
    this.postNewTodo();
  }

  fetchAllTodos = () => {
    axios.get(URL)
    .then(res =>{ this.setState({ ...this.state, todos : res.data.data})})
    .catch(this.setAxiosResponseError)
  }

  componentDidMount() {
    this.fetchAllTodos() 
    }
   

  render() {
    return (
      <div>
        {this.state.error && <div id='error'>Error : {this.state.error}</div>}
        <TodoList
          todos={this.state.todos} 
          toggleCompleted={this.toggleCompleted} 
          isShowingCompleted={this.state.isShowingCompleted} 
          showCompleted={this.showCompleted}
        />
        <Form 
          error={this.state.error} 
          onTodoInputChange={this.onTodoInputChange} 
          todoName={this.state.todoName}
          onFormSubmit={this.onFormSubmit} 
          showCompleted={this.showCompleted} 
          isShowingCompleted={this.state.isShowingCompleted}
        />
      </div>
    )
  }
}
