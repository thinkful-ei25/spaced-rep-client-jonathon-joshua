import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_PROTECTED_DATA_SUCCESS = 'FETCH_PROTECTED_DATA_SUCCESS';
export const fetchProtectedDataSuccess = data => ({
    type: FETCH_PROTECTED_DATA_SUCCESS,
    data
});

export const FETCH_HEAD_SUCCESS = 'FETCH_HEAD_SUCCESS';
export const fetchHeadSuccess = head => ({
    type: FETCH_HEAD_SUCCESS,
    head
})

export const UPDATE_DATABASE_SUCCESS = 'UPDATE_DATABASE_SUCCESS';
export const updateDatabaseSuccess = head => ({
    type: UPDATE_DATABASE_SUCCESS,
    head
})


export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchProtectedDataError = error => ({
    type: FETCH_PROTECTED_DATA_ERROR,
    error
});


export const FETCH_HEAD = 'FETCH_HEAD';
export const fetchHead = (userId) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/question/head/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((head) => dispatch(fetchHeadSuccess(head.questions.head)))
    .catch(err => {
        dispatch(fetchProtectedDataError(err));
    });
}

export const updateDatabase = (userId, category, data, answer) => (dispatch, getState) => {
    console.log('updateDatabase');
    const authToken = getState().auth.authToken;
    const body = {
        id: data._id,
        answer: answer
    }
    console.log(body);
    console.log(userId);
    console.log(category);
    return fetch(`${API_BASE_URL}/question/${userId}?category=${category}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: data._id,
            answer: answer
        })
    }).then((response) => console.log(response))
    .catch(console.log('shit happened'))
}

export const fetchProtectedData = (userId, category) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    console.log('fetching data');
    return fetch(`${API_BASE_URL}/question/${userId}?category=${category}`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({question}) => dispatch(fetchProtectedDataSuccess(question)))
        .catch(err => {
            dispatch(fetchProtectedDataError(err));
        });
};
