import React from 'react'
import { connect } from 'react-redux'
import uuid from 'uuid'

class EditProps extends React.Component{
    constructor(props){
        super(props)

        this.state={
            id: '',
            description:'',
            notes:''
        }
    }


    componentDidMount(){
        console.log(this.props.user.uid)
        console.log(this.props, "ddddddd")
    }

    handeAdd = async () => {
        await this.setState({id:uuid()})
        await console.log(this.state)
        await this.props.startAddTrick(this.state,this.props.user.uid)
        await this.setState({id:'', description:'', notes:''})
        console.log(this.props)
    }

    handleDelete = async (propId, uid) => {
        await this.props.startRemoveTrick(propId, uid)
        await this.setState({id:'', description:'', notes:''})
        console.log(this.props)
    }

    render(){
        return (
          <div className="container">
            <div className="row">
              <div className="text-center">
                <h1 className="display-4">Add Props</h1>
              </div>
            </div>
            <div className="row">          



            <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Description</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {this.props.props.map((x, i) => (
                    <tr key={x.id}>
                    <th scope="row">{i + 1}</th>
                    <td>{x.description}</td>
                    <td><i className="fas fa-trash-alt" style={{cursor: 'pointer'}} onClick={() => this.handleDelete(x.id, this.props.user.uid)}></i></td>
                    </tr>
                ))}
                <tr>
                <td scope="row"></td>
                <td>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Name"
                        onChange={(e) => this.setState({description:e.target.value})}
                        value={this.state.description}/>
                </td>
                <td><button 
                type="button" 
                className="btn btn-primary"
                onClick= {this.handeAdd}
                >Add</button></td>
                </tr>   
            </tbody>
            </table>

            </div>
        </div>
  
        
        )
    }
}



const mapDispatchToProps = (dispatch, props) => ({
    startAddTrick: (prop, uid) => dispatch({
      type: 'ADD_PROP',
      prop: prop,
      uid: uid
    }),
    startRemoveTrick: (propId, uid) => dispatch({
      type: 'DELETE_PROP', 
      propId: propId,
      uid: uid
    }),
    setProps: (uid) => dispatch({
      type: 'SET_PROPS', 
      uid: uid
    }),
    setCurrentTrick: (uid) => dispatch({
      type: 'SET_CURRENT_TRICK', 
      uid: uid
    })
  
  });

  // This should be class level
  const mapStateToProps = state => {
      return { 
        props: state.props,
        user: state.user,
        tricks: state.tricks }
  }

export default connect(mapStateToProps, mapDispatchToProps)(EditProps);

