import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import TrickListing from './components/trick-listing/trick-listing'
import NotFound from './components/notfound/notfound'
import EditTrick from './components/edit-trick/edit-trick'
import Header from './components/header/header'
import AddTrick from './components/add-trick/add-trick'
import EditProps from './components/edit-props/edit-props'

class App extends React.Component {
  constructor(props){
    super(props)
    console.log('dddddd')
  }

  render(){
    return (

      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route path="/" component={TrickListing} exact={true} />
            <Route path="/edit/:id" component={EditTrick} />
            <Route path="/add/" component={AddTrick} />
            <Route path="/props/" component={EditProps} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
   );
  }
}

export default connect((state => {
  return {
    tricks: state.tricks
  };
}))(App);
