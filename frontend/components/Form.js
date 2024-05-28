import React from 'react'


export default class Form extends React.Component {
  render() {
    return(
    <div>
      <form onSubmit={this.props.onFormSubmit}>
          <input 
            type='text' 
            onChange={this.props.onTodoInputChange} 
            value={this.props.todoName}>
          </input>
          <input type='submit'></input>
      </form>
      <button onClick={this.props.showCompleted}>
        {this.props.isShowingCompleted ? 'Hide' : 'Show'} Completed
      </button>
    </div>
    )
  }
}
