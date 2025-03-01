import {applyMiddleware, combineReducers, legacy_createStore  as createStore} from 'redux';
import { authReducer } from './reducers/authReducer';
import { bookReducer } from './reducers/bookReducer';
import {thunk} from 'redux-thunk'

const rootReducer = combineReducers({
    auth : authReducer,
    books : bookReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;