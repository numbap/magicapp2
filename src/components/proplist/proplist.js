import React from 'react';
import { connect } from 'react-redux'
import TrickForm from '../trick-form/trick-form'
import uuid from 'uuid'

class PropList extends React.Component{
  constructor(props){
    super(props)

    this.state = {
        id: '',
        propId: '',
        description: '',
        quantity: 0
    }

  }

  handleSave = async () => {
    await this.setState({id:uuid()})
    await this.props.startAddPropToTrick(this.state, this.props.trick.id, this.props.user.uid)
    await this.setState({id: '', propId: '', description: '', quantity: 0 })
    console.log(this.props.trick)
  }

  handleDelete = async (propId, trickId) => {
    await this.props.startRemovePropFromTrick(propId, trickId, this.props.user.uid)
    this.setState({id: '', propId: '', description: '', quantity: 0 })
  }

  render(){
    return (


      
      <div className="row">
        <table className="table">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Description</th>
            <th scope="col">Quantity</th>
            <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            {this.props.trick.props.map((x, i) => (
                <tr key={x.id}>
                <th scope="row">{i}</th>
                <td>{x.description}</td>
                <td>{x.quantity}</td>
                <td><i className="fas fa-trash-alt" style={{cursor: 'pointer'}} onClick={() => this.handleDelete(x.id, this.props.trick.id)}></i></td>
                </tr>
            ))}



            <tr>
            <th scope="row"></th>
            <td>      



              <select 
              className="custom-select mr-sm-2" id="inlineFormCustomSelect"
              onChange={e =>{
                  this.setState({ 
                      propId:e.target.value, 
                      description: this.props.props.filter(x => x.id === e.target.value)[0].description
                  })
              }} 
              value={this.state.propId}>
              <option value="" >Select Prop...</option>
              {this.props.props.map(x => (
                   <option key={x.id} value={x.id}>{x.description}</option>
              ))}
            
            </select>
            


            </td>
            <td>
                <input 
                    type="text" 
                    className="form-control" 
                    onChange={e => this.setState({quantity:e.target.value})} 
                    placeholder="Quantity"
                    value={this.state.quantity}/>
            </td>
            <td><button 
            type="button" 
            className="btn btn-primary"
            onClick={this.handleSave}
            >Add</button></td>
            
            </tr>



        </tbody>
        </table>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch, props) => ({
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
  }),
  startSetCurrentTrick: (trickId, uid) => dispatch({
    type: 'SET_CURRENT_TRICK', 
    trickId: trickId,
    uid: uid
  })

});

// This should be class level
const mapStateToProps = state => {
    return { 
        props: state.props, 
        user: state.user,
        tricks: state.tricks,

     }
}


  export default connect(mapStateToProps, mapDispatchToProps)(PropList);













//   <select 
//   className="custom-select mr-sm-2" id="inlineFormCustomSelect"
//   onChange={e =>{
//       this.setState({ 
//           propId:e.target.value, 
//           description: this.props.props.filter(x => x.id === e.target.value)[0].description
//       })
//   }} 
//   value={this.state.prop.propId}>
//   <option value="" >Select Prop...</option>
//   {this.props.props.map(x => (
//        <option key={x.id} value={x.id}>{x.description}</option>
//   ))}

// </select>



