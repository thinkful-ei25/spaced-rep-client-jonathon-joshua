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
    .then((head) => dispatch(fetchHeadSuccess(head)))
    .catch(err => {
        dispatch(fetchProtectedDataError(err));
    });
}

export const fetchProtectedData = (userId, category) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;

    return fetch(`${API_BASE_URL}/question/${userId}?category=${category}`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({questions}) => dispatch(fetchProtectedDataSuccess(questions)))
        .catch(err => {
            dispatch(fetchProtectedDataError(err));
        });
};
