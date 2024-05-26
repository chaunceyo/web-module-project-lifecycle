import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {
  render() {
    return (
      <div>
      {this.props.todos.map(item => ( 
        <div key={item.id}>{item.name}</div>
      ))}
      </div>
    )
  }
}
