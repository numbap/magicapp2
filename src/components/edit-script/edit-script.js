import React from 'react';
import {connect} from 'react-redux'
import TrickForm from '../trick-form/trick-form'

const EditTrick = (props) => {
  const trick = props.tricks.filter(x => x.id === props.match.params.id)[0]
  return (

    <div className="App">
      <h1>Edit Trick</h1>
      <h2>{props.match.params.id}</h2>
      <h3>{trick.name}</h3>
      <TrickForm trick={trick} />



    </div>
  );
}

export default EditTrick