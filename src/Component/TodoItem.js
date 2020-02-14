import React, {Component} from 'react';
import {css} from 'glamor'
import {Link, BrowserRouter as Router,Route, Redirect} from 'react-router-dom'
import {token$, updateToken} from './Store'
import axios from 'axios'


const items = css({
  padding: '10px',
  borderBottom:'1px solid black',
  display: 'flex',
  justifyContent: 'space-between'
})
class TodoItem extends Component{
  constructor(props){
    super(props)

    }
  onClick=()=>{
    this.props.onDelete(this.props.todo.id)

  }

  render(){
    const{todo} = this.props

  return (
    <>
    <div  {...items}>
    {todo.content} <button onClick={this.onClick}>delete</button>
    </div>
    </>

  )
}
}

export default TodoItem;
