import React, {Component} from 'react';
import {css} from 'glamor'
import {Link, BrowserRouter as Router,Route, Redirect} from 'react-router-dom'
import {token$, updateToken} from './Store'
import axios from 'axios'
import TodoItem from './TodoItem'
import debounce from 'lodash.debounce'

const todosList = css({
  display:'flex',
  marginTop:'20px',
  flexDirection: 'column',
  alignItems: 'center'
})
const items = css({
  padding: '10px',
  borderBottom:'1px solid black',
  display: 'flex',
  justifyContent: 'space-between'
})
class Todos extends Component{
  constructor(props){
    super(props)
    this.state = {
      todo: '',
      todos: [],
      id:null,
      token: token$.value,
    }
    }
    fetchData=()=>{
      this.source = axios.CancelToken.source()
      axios.get(`http://3.120.96.16:3002/todos`,{
        cancelToken: this.source.token,
        headers: {
          Authorization: 'Bearer ' + token$.value,
        },
      })
        .then(response=>{
          this.setState({todos:response.data.todos})
        })
        .catch(response =>{
          console.log(response)
        })
    }
  componentDidUpdate(prevProps,prevState){
      if(prevState.id !== this.state.id){
        this.fetchData()
      }
  }
    componentDidMount(){
      this.subscribe = token$.subscribe(value => {
        this.setState({token: value})
      })
      this.fetchData()
    }


    componentWillUnmount(){
      this.subscribe.unsubscribe()
      this.source.cancel()
    }


    value=(e)=>{
      this.setState({todo: e.target.value})
    }

    onSend=(e)=>{
      e.preventDefault()
      axios.post(`http://3.120.96.16:3002/todos`, {
        content: this.state.todo,
      },
      {
        headers:{
          Authorization: 'Bearer ' + token$.value
        }
      }
    )
    .then(response=>{
      this.setState({id: response.data.todo.id})
    })
    .catch(response =>{
      console.log(response)
    })
    }

    onDelete=(id)=>{
      axios.delete(`http://3.120.96.16:3002/todos/${id}`,{
        headers:{
          Authorization: `Bearer ` + token$.value
        }
      })
      .then(response=>{
        this.setState({id:id})
      })
    }




  render(){
    const{todos,token} = this.state
    if(token === null){
      return <Redirect to="/"/>
    }

  return (
    <div className={todosList}>
    <div >
    <input onChange={this.value} type="text" />
    <input onClick={this.onSend} type="submit" />
    {todos.map(todo =>(
      <TodoItem key={todo.id} onDelete={this.onDelete} todo={todo}/>
    ))}



    </div>
    </div>



  )}
}

export default Todos;
