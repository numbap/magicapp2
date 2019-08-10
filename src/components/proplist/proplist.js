import React from 'react';
import { connect } from 'react-redux'
import TrickForm from '../trick-form/trick-form'
import uuid from 'uuid'

class PropList extends React.Component{
  constructor(props){
    super(props)

    this.state = {
        id: uuid(),
        propId: '',
        description: '',
        quantity: 0
    }

  }

  render(){
    console.log(this.props.trick, "current trick")
    return (
      <div className="col-md-4">



      <div class="card">
        <div class="card-header">
          Prop List
        </div>
        <div class="card-body">
          
            <table className="table">
            <thead>
                <tr>
                <th scope="col">Description</th>
                <th scope="col">Quantity</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {this.props.trick.props.map((x, i) => (
                    <tr key={x.id}>
                    <td>{x.description}</td>
                    <td>{x.quantity}</td>
                    <td><i className="fas fa-trash-alt" style={{cursor: 'pointer'}} onClick={async () => {
                      await this.props.handleDelete(x.id, this.props.trick.id, this.props.user.uid)
                      this.setState({id: '', propId: '', description: '', quantity: 0 })
                    }}></i></td>
                    </tr>
                ))}
    
    
    
                <tr>
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
                onClick={() => {
                  this.props.handleSave({...this.state, id:uuid()}, this.props.trick.id, this.props.user.uid)
                  this.setState({id: '', propId: '', description: '', quantity: 0 })
                }}
                >Add</button></td>
                
                </tr>
    
    
    
            </tbody>
            </table>          
          
          
        </div>
      </div>





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



