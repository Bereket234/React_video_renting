import React, {Component} from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Movies from './components/Movies.jsx';
import Navbar from './components/navbar';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import MovieForm from './components/MovieForm';
import LoginForm from './components/login';
import Register from './components/register';
import Logout from './components/logout';
import { getCurrentUser } from './services/authService.js';
import ProtectedRoute from './components/common/protectedRoute';
import 'react-toastify/dist/ReactToastify.css'
import './App.css';


class App extends Component {
  state = {}
  
  componentDidMount() {
    const user=getCurrentUser()
    this.setState({user})
  }
  render() { 
    const {user}= this.state
    return (
      <React.Fragment>
        <Navbar user= {user} />
        <main className='container'>
          <Switch>
            <ProtectedRoute path='/movies/:id' component={MovieForm}/>
            <Route path='/logout' component={Logout}/>
            <Route path='/register' component={Register}/>
            <Route path='/login' component={LoginForm}/>
            <Route path='/movies' exact render={props=> <Movies {...props} user={user}/>}/>
            <Route path='/customers' exact component= {Customers}/>
            <Route path='/rentals' exact component= {Rentals}/>
            <Route path='/not-found' exact component={NotFound}/>
            <Redirect from='/' exact to='/movies'/>
            <Redirect to='/not-found' />
          </Switch>
        </main>
        <ToastContainer/>
      </React.Fragment>
    )
  }
}
 
export default App;
