import React from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

class NoteForm extends React.Component {
  constructor(props){
    super(props)
    const DEFAULT_STATE = {
      id: '',
      trickId: '',
      header: '', 
      body: '',
      date: '',
    }

    this.state = DEFAULT_STATE
  }

  render(){
    return(
      <div className="col-md-12">

      <div className="card">
        <div className="card-header">
          Performance Notes
        </div>
        <div className="card-body">
  
            {this.props.notes.map(x => (

              (x.trickId === this.props.trickId) && 
              (
                <div className="card" key={x.id} >
                <div className="card-body">
                <h5 className="card-title">{x.header}</h5>
                <h6 className="card-subtitle mb-2 text-muted">12-12-12</h6>
                <p className="card-text">{x.body} {this.props.trickId}</p>
                <p><i className="fas fa-trash-alt" style={{cursor: 'pointer'}} onClick={() => this.props.startDeleteNote(x.id, this.props.user.uid)}></i></p>
                </div>
                </div>
              )




            ))}


  
  
  
            <div className="form-group" >
  
            <br/><br/><br/>
              <label htmlFor="header">Header</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="noteHeader" 
                  value={this.state.header}
                  onChange={(e) => this.setState({header: e.target.value})}
                  placeholder="Note Header" />
              <p></p>
              <label htmlFor="body">Body</label>
                  <textarea 
                  type="text" 
                  value={this.state.body}
                  onChange={(e) => this.setState({body: e.target.value})}
                  className="form-control" 
                  id="noteBody" 
                  placeholder="Note Body" ></textarea>
            </div>
            <div>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={async () => {
                      if(this.state.header){
                        await this.setState({id: uuid(), trickId: this.props.trickId})
                        await this.props.startAddNote(this.state, this.props.user.uid)
                        await this.setState({id: '', body:'', header:''})
                      }

                  }}
                  >Add Note</button>
            </div>

        </div>
      </div>
      </div>
    )
  }

}



const mapDispatchToProps = (dispatch, props) => ({
  startAddNote: (note, uid) => dispatch({
    type: 'ADD_NOTE',
    note: note,
    uid: uid
  }),
  startDeleteNote: (noteId, uid) => dispatch({
    type: 'DELETE_NOTE',
    noteId: noteId,
    uid: uid
  })
});

// This should be class level
const mapStateToProps = state => {
    return { 
      user: state.user, 
      tricks: state.tricks,
      notes: state.notes
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);

