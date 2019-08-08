import React from 'react';
import { connect } from 'react-redux'
import TrickForm from '../trick-form/trick-form'
import PropList from '../proplist/proplist'

class EditTrick extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      name: '',
      script: '',
      id: '',
      props: []
    }

  }

  componentDidMount(){
    this.setState(this.props.tricks.filter(x => x.id === this.props.match.params.id)[0])
  }

  scriptChangeHandler = (e) => {
    this.setState({script:e})
  }

  nameChangeHandler = (e) => {
    this.setState({ name:e.target.value})
  }

  handleSave = async () => {
    await this.props.startAddTrick(this.state, this.props.user.uid)
    this.props.history.push("/")
  }

  handleDelete = async () => {
    await this.props.startRemoveTrick(this.state.id, this.props.user.uid)
    this.props.history.push("/")
  }

  render(){
    return (


      <div className="container">
          <div className="row">
            <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
              <h1 className="display-4">Edit Trick</h1>
            </div>
          </div>
          <div className="row">          
            <TrickForm 
              trick={this.props.tricks.filter(x => x.id === this.props.match.params.id)[0]}
              handleScriptChange={this.scriptChangeHandler}
              handleNameChange={this.nameChangeHandler} 
            />
          </div>
          <div className="row">
            <div className="d-flex ">
            <button type="button" className="btn btn-primary" onClick={this.handleSave}>Save</button>
            <button type="button" className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
            </div>
          </div>
          <div className="row">
            <PropList trick={this.props.tricks.filter(x => x.id === this.props.match.params.id)[0]} />
          </div>          
      </div>

    );
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
    trickId: trickId,
    uid: uid
  }),
  startSetTrick: (uid) => dispatch({
    type: 'SET_TRICKS',
    uid: uid
  }),
  startSetCurrentTrick: (trickId, uid) => dispatch({
    type: 'SET_CURRENT_TRICK', 
    trickId: trickId,
    uid: uid
  }),
  clearCurrentTrick: (trickId, uid) => dispatch({
    type: 'CLEAR_CURRENT_TRICK'
  })
});

// This should be class level
const mapStateToProps = state => {
    return { 
      tricks: state.tricks,
      user: state.user
    }
}


  export default connect(mapStateToProps, mapDispatchToProps)(EditTrick);



