import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import database, {auth, firebase, googleAuthProvider } from '../../firebase/firebase';

const Header = (props) => {
    return (
  
      <div className="App">

        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
        <h5 className="my-0 mr-md-auto font-weight-normal"><Link to={'/'}>Magic App</Link></h5>
        <nav className="my-2 my-md-0 mr-md-3">
          <NavLink to={'/'} className="p-2 text-dark" activeClassName="font-weight-bold" exact>Home</NavLink> - 
          <NavLink to={'/add' } className="p-2 text-dark" activeClassName="font-weight-bold" exact>Add</NavLink> - 
          <NavLink to={'/props' } className="p-2 text-dark" activeClassName="font-weight-bold" exact>Edit Props</NavLink> - 
          <NavLink to={'/404Page' } className="p-2 text-dark" activeClassName="font-weight-bold" exact>404 Error</NavLink>
        </nav>
        <button className="btn btn-outline-primary" onClick={ () => auth.signOut() }><i className="fas fa-sign-out-alt" ></i> SIGN OUT</button>
      </div>

      </div>
    );
  }

  export default Header