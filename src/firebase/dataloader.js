import React from 'react'
import database from './firebase'
import {connect} from 'react-redux'

const DataLoader = (props) => {

    database.ref('locations')
    .once('value')
    .then((snapShot) => {
        console.log(snapShot.val())
        var arraySnap = []
        snapShot.forEach(x => {
            arraySnap.push(x.val())
        }) 
        props.setLocation(arraySnap)
    })
    .catch((e) => console.log(e))

    database.ref('spots')
    .once('value')
    .then((snapShot) => {
        console.log(snapShot.val())
        var arraySnap = []
        snapShot.forEach(x => {
            arraySnap.push(x.val())
        }) 
        props.setSpots(arraySnap)
    })
    .catch((e) => console.log(e))

    return (
        <div>
            Jelllo Mellow
        </div>
    )

}



const mapDispatchToProps = (dispatch) => {
    return {
       setLocation: (locations) => {
           dispatch({type: 'SET_LOCATIONS', locations: locations}) 
        },
        setSpots: (spots) => {
            dispatch({type: 'SET_SPOTS', spots: spots}) 
        }
    }
}

export default connect(null, mapDispatchToProps)(DataLoader)