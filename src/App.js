import React, {Component} from 'react';
import {css} from 'glamor'
import {Link, BrowserRouter as Router,Route, Redirect} from 'react-router-dom'
import Registration from './Component/Registration'
import Login from './Component/Login'
import {token$, updateToken} from './Component/Store'
import Todos from './Component/Todos'
import axios from 'axios'
import whitepapertexture from './whitepapertexture.jpg'
import jwt from 'jsonwebtoken';

const header = css({
  width:'100%',
  height:'70px',
  backgroundColor:'blue',
  display:'flex',
  justifyContent: 'space-between',
  alignItems: 'space-around'
})
const loggedIn = css({
  margin:'20px',
})
const link = css({
  margin: '20px',
  color: 'white',
  ':hover': {
    color:'red'
  }
})
class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      token: null,
    }

    }
  componentDidMount(){
    this.subscribe = token$.subscribe(value =>{
      this.setState({token:value})
      console.log(value)

    })
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.token !== this.state.token){
      const{token} =this.state
      axios.get(`http://3.120.96.16:3002/todos`,{
        headers:{
          Authorization: `Bearer ` + token
        }
      })
      .then(response=>{
        console.log(response)
      })
    }
  }
  componentWillUnmount(){
    this.subscribe.unsubscribe()
  }
  logOut = () =>{
    updateToken(null)
  }

  render(){
    const decoded = jwt.decode(token$.value);
    const{token} = this.state
    console.log(token)



  return (
    <Router>

    <div className={header}>
    {token !== null? <div style={{width:'200px', color:'white'}} {...loggedIn}>You're logged in as {decoded.email} </div> : null}
    {token === null? <Link {...link} to="/login">login page</Link> : null}
    <Link {...link} to="/registration">skapa nytt konto</Link>
    {token !== null? <div {...loggedIn}><button onClick={this.logOut}>Sign Out</button></div> : null}


    </div>


    <Route path="/login" component={Login} />

    <div>
    </div>
    <Route path="/registration" component={Registration}/>
    <Route path="/todos" component={Todos}/>

    </Router>


  )}
}

export default App;
