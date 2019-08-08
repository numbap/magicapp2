import { createStore, combineReducers, applyMiddleware } from 'redux';
import tricksReducer from '../redux/tricks/tricks-reducer';
import propsReducer from '../redux/props/props-reducer';
import createSagaMiddleware from 'redux-saga'
import userReducer from '../redux/user/user-reducer';
import {watchAddTrick, watchAddPropToTrick, rootSaga } from '../sagas/saga'
import currentTrickReducer from '../redux/current-trick/current-trick-reducer';

const sagaMiddleware = createSagaMiddleware();
export default () => {
  const store = createStore(
    combineReducers({
      tricks: tricksReducer, 
      props: propsReducer,
      user: userReducer,
      currentTrick: currentTrickReducer
    }),
    applyMiddleware(sagaMiddleware)
  );

  sagaMiddleware.run(rootSaga)

  return store;
};