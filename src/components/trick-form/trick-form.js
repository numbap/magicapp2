import React from 'react';
import ReactQuill from 'react-quill'
import {connect} from 'react-redux'

const TrickForm = (props) => (
    <div>
      <div className="form-group" >
        <label htmlFor="exampleInputEmail1">Name</label>
        <input 
          type="text" 
          value={props.trick.name} 
          onChange={props.handleNameChange}
          className="form-control" 
          id="trickName" 
          placeholder="Trick Name" />
      </div>

      <div>
        <ReactQuill value={props.trick.script}
        onChange={props.handleScriptChange} />
      </div>
    </div>
) 


export default TrickForm