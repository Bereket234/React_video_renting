import React from 'react';
import Joi from 'joi-browser';
import { Redirect } from 'react-router-dom';
import Form from './common/form';
import { auth, getCurrentUser } from './../services/authService';

class LoginForm extends Form {
    state = { 
        data: {username: '', password: ''},
        error: {}
     } 

     schema = {
         username: Joi.string().required().label('Usernaem'),
         password: Joi.string().required().label('Password')
     }

     doSubmit = async ()=>{
         try {
            const {username, password}= this.state.data 
            await auth(username, password)
            const {state}= this.props.location
            window.location= state? state.from.pathname: '/'
         } catch (ex) {
             if(ex.response && ex.response.status===400){
                 let error= this.state.error
                 error.username= ex.response.data
                 this.setState({error})
             }
         }
     }


     
    render() { 
        if(getCurrentUser()) return <Redirect to='/'/>
        return (
            <form className='mt-5'>
                {this.renderInput('username','Username')}
                {this.renderInput('password', 'Password', 'password')}
                {this.renderButton('Submit')}
            </form>
        );
    }
}
 
export default LoginForm;