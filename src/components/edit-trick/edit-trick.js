import React from 'react';
import { connect } from 'react-redux'
import TrickForm from '../trick-form/trick-form'
import PropList from '../proplist/proplist'
import uuid from 'uuid'


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
    await this.props.history.push("/")
  }

  handleDelete = async () => {
    await this.props.startRemoveTrick(this.state.id, this.props.user.uid)
    await this.props.history.push("/")
  }

  handlePropSave = async (prop, trickId, uid) => {
    console.log(prop, "This is the prop")
    if(prop.description && parseInt(prop.quantity)){
      await this.props.startAddPropToTrick(prop, trickId, uid)
      await console.log(this.props.prop)
    }
  }

  handlePropDelete = async (propId, trickId, uid) => {
    if(propId){
      await this.props.startRemovePropFromTrick(propId, trickId, uid)
      await this.setState({id: '', propId: '', description: '', quantity: 0 })
    }
  }

  render(){
    return (


      <div className="container">
      {this.props.tricks.map( x => 
        {
          if(x.id === this.props.match.params.id){

            return (
            <div>
            
                <div className="row">
                <div className="col-md-12">
                  <h1 className="display-4">Edit Trick</h1>
                </div>
              </div>

              <div key={x.id} className="row" >
                <div className="col-md-8">


                    <TrickForm 
                    trick={this.state}
                    handleScriptChange={this.scriptChangeHandler}
                    handleNameChange={this.nameChangeHandler} 
                    />
                  <p></p>
                  <button type="button" className="btn btn-primary float-left" onClick={this.handleSave}>Save</button>
                  <button type="button" className="btn btn-danger float-right" onClick={this.handleDelete}>Delete</button>
                </div>

                <PropList handleSave={this.handlePropSave} handleDelete={this.handlePropDelete} trick={x} />

            </div>            
            
            
            </div>



            );
          }

        })}
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
  }),
  startAddPropToTrick: (prop, trickId, uid) => dispatch({
    type: 'ADD_PROP_TO_TRICK',
    prop: prop, 
    trickId: trickId,
    uid: uid
  }),
  startRemovePropFromTrick: (propId, trickId, uid) => dispatch({
    type: 'DELETE_PROP_FROM_TRICK', 
    propId: propId, 
    trickId: trickId,
    uid: uid
  })
});

// This should be class level
const mapStateToProps = state => {
    return { 
      user: state.user, 
      tricks: state.tricks
    }
}


  export default connect(mapStateToProps, mapDispatchToProps)(EditTrick);



