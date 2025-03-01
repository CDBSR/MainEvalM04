import { ADD_BOOK_TO_USER_LIST, FETCH_BOOKS_FAILURE, FETCH_BOOKS_REQUEST, FETCH_BOOKS_SUCCESS, FETCH_MY_BOOKS_ERROR, FETCH_MY_BOOKS_REQUEST, FETCH_MY_BOOKS_SUCCESS, UPDATE_BOOK_RATING, UPDATE_BOOK_STATUS } from "../actions/booksActions"

const initalState = {
    books: [],
    myBooks: [],
    loading: false,
    error: null,
}

export const bookReducer = (state = initalState, action) => {
    switch (action.type) {
        case FETCH_BOOKS_REQUEST:
            return { ...state, loading: true, error: null }
        case FETCH_BOOKS_SUCCESS:
            return { ...state, loading: false, books: action.payload }
        case FETCH_BOOKS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case ADD_BOOK_TO_USER_LIST:
            return { ...state, myBooks: [...state.myBooks, action.payload] }
        case FETCH_MY_BOOKS_REQUEST:
            return { ...state, loading: true, error: null }
        case FETCH_MY_BOOKS_ERROR:
            return { ...state, loading: false, error: action.payload }
        case FETCH_MY_BOOKS_SUCCESS:
            return { ...state, loading: false, myBooks: action.payload }
        case UPDATE_BOOK_RATING:
            return { ...state, myBooks: state.myBooks.map((b) => b.id === action.payload.bookId ? { ...b, status: action.payload.rating } : b) }
        case UPDATE_BOOK_STATUS:
            return { ...state, myBooks: state.myBooks.map((b) => b.id === action.payload.bookId ? { ...b, status: action.payload.status } : b) }
        default:
            return state;
    }
}