import React, {Component} from 'react';
import {css} from 'glamor'
import {Link, BrowserRouter as Router,Route, Redirect} from 'react-router-dom'
import Registration from './Registration'
import axios from 'axios'
import whitepapertexture from './whitepapertexture.jpg'
import {token$, updateToken} from './Store.js'
const header = css({
  width:'100%',
  height:'70px',
  display:'flex',
  justifyContent: 'center',
  alignItems: 'space-around',
  marginTop:'50px'

})
const textLogin = css({
  fontSize: '12px',
  color:'black',

})

const login = css({
  margin:'2px'
})
const link =css({
  color:'black',
  ':hover': {
    color:'red'
  }
})
const sucess = css({
  position: 'absolute',
  top: '50px',
  width: '300px',
  height: '200px',
  backgroundImage: `url(${whitepapertexture})`,
  borderRadius: '25px',
  display:'flex',
  flexDirection:'column',
  alignItems:'center'
})
const sucessText = css({
  textAlign: 'center',
  margin: '50px'
})
const wrongLogin = css({
  width: '100%',
  display:'flex',
  justifyContent:'center',
  position: 'relative',
  top:'-30px'

})
class Login extends Component{
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      loginSucess: false,
      wrongLogin: false,
    }
  }

  onChange=(e)=>{
    this.setState({[e.target.name]:e.target.value})
  }

  onLogin = () =>{
    const{email, password} = this.state
    axios.post(`http://3.120.96.16:3002/auth`,
      {
        email: email,
        password: password,
      }
    )
    .then(response=>{
      updateToken(response.data.token)
      this.setState({loginSucess: true})
    })
    .catch(response =>{
      this.setState({wrongLogin: true})
    })
  }
  onNext =()=>{
    this.setState({wrongLogin:false})
  }


  render(){
    if(this.state.loginSucess){
      return <Redirect to="/todos" />
    }
    console.log(token$.value)


  return (
    <div className={header}>
    <div>
    <div {...textLogin}>E-Post</div>
    <input type="text" name="email" {...login} onChange={this.onChange} placeholder="email"/>
    </div>
    <div>
    <div {...textLogin}>Lösenord</div>
    <input type="text" {...login} name="password" onChange={this.onChange}  placeholder="password"/>
    <div {...textLogin}><Link {...link} to="/registration">Skapa nytt konto</Link></div>
    </div>
    <input type="submit" value="logga in" onClick={this.onLogin}/>
    {this.state.wrongLogin === true ? <div {...sucess}>
    <p{...sucessText}>Your password or your username is wrong</p>
    <div><input type="submit" onClick={this.onNext} value="Nästa"/></div>
    </div> : null}
    </div>


  )}
}

export default Login;
