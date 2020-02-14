import React, {PureComponent}from 'react';
import {css} from 'glamor'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import whitepapertexture from './whitepapertexture.jpg'
const registrationForm = css({
  display:'flex',
  justifyContent: 'center',
  alignItems:'center',
  flexDirection: 'column',
  marginTop: '50px',

})
const sucess = css({
  position: 'absolute',
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
class Registration extends PureComponent{
  constructor(props){
    super(props)
    this.state ={
      UserName: '',
      Password: '',
      sucess: false,
      next: false,

    }
  }
  onChange = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }
  onClick = (e) =>{
    e.preventDefault()
    axios.post(`http://3.120.96.16:3002/register`,
    {
      email: this.state.UserName,
      password: this.state.Password
    })
    .then(response =>{
      console.log(response)
      this.setState({sucess:true})
    })
    .catch(response =>{
      console.log(response)
    })
  }
  onSucessClick = (e) => {
    e.preventDefault()
    this.setState({next:true})

  }

  render(){
    if(this.state.next){
      return <Redirect to="/" />

    }
    return(
      <>
      <form {...registrationForm}>
      {this.state.sucess ? <div {...sucess}>
      <p{...sucessText}>Your account has succesfully been created!</p>
      <div><input type="submit" onClick={this.onSucessClick} value="Nästa"/></div>
      </div>: null}
      <div>
      <div>Användarnamn</div>
      <input onChange={this.onChange} name="UserName" type="text"/>
      </div>
      <div>
      <div>Lösenord</div>
      <input onChange={this.onChange} name="Password" type="text"/>
      </div>
      <div>
      <input onClick={this.onClick} type="submit" value="registrera"/>
      </div>
      </form>


      </>
    )
  }
}


export default Registration
