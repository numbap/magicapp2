import React from 'react';
import ReactQuill from 'react-quill'

const TrickForm = (props) => (
    <div className="row">
      <div className="col-md-12 form-group" >
        <label htmlFor="exampleInputEmail1">Name</label>
        <input 
          type="text" 
          value={props.trick.name} 
          onChange={props.handleNameChange}
          className="form-control" 
          id="trickName" 
          placeholder="Trick Name" />
      </div>
      <p></p>
      <div className="col-md-12" >
      <label htmlFor="exampleInputEmail1">Script</label>
        <ReactQuill value={props.trick.script}
        onChange={props.handleScriptChange} />
      </div>
    </div>
) 

export default TrickForm