import Form from './common/form';
import Joi from 'joi-browser'
import { register  } from './../services/userServices';
import { loginWithJwt } from '../services/authService';

class Register extends Form {
    state = { 
        data: {username:'', password: '', name: ''},
        error:{}
     } 

     schema= {
         username: Joi.string().email().required().label('Username'),
         password: Joi.string().min(5).required().label('Password'),
         name: Joi.string().required().label('Name')
     }

     doSubmit= async ()=> {
         try{  
            const {headers}=await register (this.state.data)
            loginWithJwt(headers['x-auth-token'])
            window.location= '/'
         }catch(ex){
             if(ex.response && ex.response.status=== 400){
                 let error= {...this.state.error}
                 error.username= ex.response.data
                 this.setState({error})
             }
         }
     }

    render() { 
        return (
            <form>
                {this.renderInput('username', 'Username', 'email')}
                {this.renderInput('password', 'Password', 'password')}
                {this.renderInput('name', 'Name')}
                {this.renderButton('Register')}
            </form>
        );
    }
}
 
export default Register;