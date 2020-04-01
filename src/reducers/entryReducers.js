import {POST_ENTRY_START,
    POST_ENTRY_SUCCESS,
    POST_ENTRY_FAIL,
    FETCH_ENTRY_START,
    FETCH_ENTRY_SUCCESS,
    FETCH_ENTRY_FAIL,
    PUT_ENTRY_START,
    PUT_ENTRY_SUCCESS,
    PUT_ENTRY_FAIL,
    DELETE_ENTRY_START,
    DELETE_ENTRY_SUCCESS,
    DELETE_ENTRY_FAIL
} from "../actions/entryActions"

const initialState = {
    entryData: [],
    // "child_id": null,
    // "date": Date.now(),
    // "dairy": 0,
    // "fruits": 0,
    // "grains": 0,
    // "proteins": 0,
    // "vegetables": 0,
    // "treats": 0,
    // isPosting: false,
    isFetching: false,
    // isPutting: false,
    // isDeleting: false,
    error: null
}

const  reducer= (state = initialState, action) => {
    switch (action.type) {
        case POST_ENTRY_START:
        case FETCH_ENTRY_START:
        case PUT_ENTRY_START:
        case DELETE_ENTRY_START:
            return {
            ...state,
            isFetching: true
            }
        case POST_ENTRY_SUCCESS:
        case FETCH_ENTRY_SUCCESS:
        case PUT_ENTRY_SUCCESS:
        case DELETE_ENTRY_SUCCESS:
            return {
            ...state,
            entryData: action.payload,
            isFetching: false,
            error: ""
            }
        case POST_ENTRY_FAIL:
        case FETCH_ENTRY_FAIL:
        case PUT_ENTRY_FAIL:
        case DELETE_ENTRY_FAIL:
            return {
            ...state,
            isFetching: false,
            error: action.payload
            }
        default:
            return state
  }
}

export default reducer