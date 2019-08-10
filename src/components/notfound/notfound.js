import React from 'react';
import { connect } from 'react-redux'

const NotFound = (props) => {
    console.log(props)
    return (

      <div className="container">
      <div className="row">
        <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">404 Page Not Found</h1>
        </div>
      </div>
      <div className="row">          

      </div>
  </div>
    );
  }

  export default NotFound