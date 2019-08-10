import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom' 


const TrickListing = (props) => {
  console.log(props.tricks, "trick state")
    return (
  
      <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Trick Listing</h1>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                </tr>
              </thead>
              <tbody>
                {props.tricks.map((x, i) => (
      
                  <tr key={i}>
                  <th scope="row">{i}</th>
                  <td><Link to={`/edit/${x.id}`}>{x.name}</Link></td>
                  <td>{x.id}</td>
                </tr>
      
                )
                )}
                <tr>
                <th scope="row"><Link to={'/add'}><button type="button" className="btn btn-primary">Add New Trick</button></Link></th>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
    );
  }


  export default connect((state => {
    return {
      tricks: state.tricks
    };
  }))(TrickListing);
