import {
    FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR,
    FETCH_HEAD_SUCCESS,
    UPDATE_DATABASE_SUCCESS,
} from '../actions/protected-data';

const initialState = {
    filterTerm: '',
    data: null,
    head: null,
    error: null
};

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {
        return Object.assign({}, state, {
            data: action.data,
            error: null
        });
    } else if (action.type === FETCH_HEAD_SUCCESS){
        return Object.assign({}, state, {
            head: action.head,
            error: null
        })

    } else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    } else if (action.type === UPDATE_DATABASE_SUCCESS){
        return Object.assign({}, state, {
            error: null
        });
    } 
    
    return state;
}
