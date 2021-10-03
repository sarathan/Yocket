import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import taskReducer from './reducers/taskReducer';
import auth from './reducers/auth';
import alert from './reducers/alert';

const initialState = {};

const middleware = [thunk];

const rootReducer = combineReducers({
  tasks: taskReducer,
  auth,
  alert
})

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);


export default store;
