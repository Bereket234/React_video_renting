import React from 'react';
import { Link } from "react-router-dom";

const Navbar = ({user}) => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand" to="/">Vidly</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to="/movies">Movies <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/customers">Customers</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/rentals">Rental</Link>
      </li>
      {!user?
        <React.Fragment>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
      </React.Fragment>:
      <React.Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/profile">{user.name}</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/logout">Logout</Link>
      </li>
    </React.Fragment>
      }
    </ul>
  </div>
</nav>
     );
}
 
export default Navbar;