import {takeEvery, put, all} from 'redux-saga/effects'
import database from '../firebase/firebase';

function* addTrickAsync(action){
    try{
        let firebaseTrick = {...action.trick}
        yield firebaseTrick.props = firebaseTrick.props.reduce( (a = {}, v) => {return { ...a, [v.id]:v }}, {} )
        yield database.ref('/magicapp/' + action.uid + '/tricks/' + action.trick.id).set(firebaseTrick)
        yield put({type: 'ADD_TRICK_ASYNC', trick: action.trick})
    } catch(error){
        yield console.log(error)
    }

}

function* deletePropFromTrickAsync(action){
    try{
        yield database.ref('/magicapp/' + action.uid + '/tricks/' + action.trickId + "/props/" + action.propId).set(null)
        yield put({ type: 'DELETE_PROP_FROM_TRICK_ASYNC', trickId: action.trickId, propId: action.propId })
    } catch(error){
        yield console.log(error)
    }

}

function* deleteTrickAsync(action){
    try{
        yield database.ref('/magicapp/' + action.uid + '/tricks/' + action.trickId).set(null)
        yield put({type: 'DELETE_TRICK_ASYNC', trickId: action.trickId})
    } catch(error){
        yield console.log(error)
    }
}

function* addPropToTrickAsync(action){
    try{
        yield database.ref('/magicapp/' + action.uid + '/tricks/' + action.trickId + "/props/" + action.prop.id).set(action.prop)
        yield put({type: 'ADD_PROP_TO_TRICK_ASYNC', trickId: action.trickId, prop: action.prop})
    } catch(error){
        yield console.log(error)
    }
}

function* setTricksAsync(action) {
    try{

        const trickList = yield database.ref('/magicapp/' + action.uid + '/tricks/')
        .once('value')
        .then((snapShot) => {
            var arraySnap = []
            snapShot.forEach(x => {
                arraySnap.push(x.val())
            })
            return arraySnap
        })
        .then(x => {
            return x.map(y => {
                var tmpProps = {...y.props}
                var arraySnap = []
                tmpProps.propertyIsEnumerable() ||
                Object.keys(tmpProps).map(key => {
                    arraySnap.push(tmpProps[key])
                })
                y.props = arraySnap
                return y
            })
       })
       yield put({type: 'SET_TRICKS_ASYNC', tricks: trickList})
    } catch(error) {
        yield console.log(error)
    }
}

function* addPropAsync(action){
    try{
        yield database.ref('/magicapp/' + action.uid + '/props/' + action.prop.id).set(action.prop)
        yield put({type: 'ADD_PROP_ASYNC', prop: action.prop})
    } catch(error){
        yield console.log(error)
    }
}

function* deletePropAsync(action){
    try{
        yield database.ref('/magicapp/' + action.uid + '/props/' + action.propId).set(null)
        yield put({type: 'DELETE_PROP_ASYNC', propId: action.propId})
    } catch(error){
        yield console.log(error)
    }
}

function* setPropsAsync(action) {
    try{

        const propList = yield database.ref('/magicapp/' + action.uid + '/props/')
        .once('value')
        .then((snapShot) => {
            var arraySnap = []
            snapShot.forEach(x => {
                arraySnap.push(x.val())
            })
            return arraySnap
        })
       yield put({type: 'SET_PROPS_ASYNC', props: propList})
    } catch(error) {
        yield console.log(error)
    }
}

export function* rootSaga() {
    yield all([
        takeEvery('ADD_PROP_TO_TRICK', addPropToTrickAsync),
        takeEvery('DELETE_PROP_FROM_TRICK', deletePropFromTrickAsync),
        takeEvery('ADD_TRICK', addTrickAsync),
        takeEvery('DELETE_TRICK', deleteTrickAsync),
        takeEvery('SET_TRICKS', setTricksAsync),
        takeEvery('ADD_PROP', addPropAsync),
        takeEvery('DELETE_PROP', deletePropAsync),
        takeEvery('SET_PROPS', setPropsAsync)
    ])
}