import React from 'react';
import { connect } from 'react-redux';
import TrickForm from '../trick-form/trick-form';
import uuid from 'uuid';
import { createHistory } from 'history/createBrowserHistory';

class AddTrick extends React.Component{
  constructor(props){
    super(props)


    this.state = {
      name: '',
      script: '',
      id: '',
      props:[]
    }
  }

  scriptChangeHandler = (e) => {
    this.setState({script:e})
  }

  nameChangeHandler = (e) => {
    this.setState({ name:e.target.value})
  }

  handleSave = async () => {
    await this.setState({id:uuid()})
    await this.props.startAddTrick(this.state, this.props.user.uid)
    await this.props.history.push("/")
    
  }

  render(){
    return(
      <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Add Trick</h1>
         
              <TrickForm 
              trick={this.state}
              handleScriptChange={this.scriptChangeHandler}
              handleNameChange={this.nameChangeHandler} 
            />

              <p></p>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={this.handleSave}>Add Trick</button>
            </div>
          </div>
      </div>


    )
    }
}

  const mapDispatchToProps = (dispatch, props) => ({
    startAddTrick: (trick, uid) => dispatch({
      type: 'ADD_TRICK',
      trick: trick,
      uid: uid
    }),
    startRemoveTrick: (trickId, uid) => dispatch({
      type: 'DELETE_TRICK', 
      trick: trickId,
      uid: uid
    })
  });

  // This should be class level
  const mapStateToProps = state => {
      return { 
        tricks: state.tricks,
        user: state.user }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(AddTrick);

