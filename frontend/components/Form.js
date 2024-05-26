import React from 'react'


export default class Form extends React.Component {
  render() {
    return(
    <div>
      <form>
          <input onChange={this.props.onTodoInputChange}></input>
          <button>Submit</button>
      </form>
    </div>
    )
  }
}
