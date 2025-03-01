import { baseurl } from "../../components/BaseUrl";

export const FETCH_BOOKS_REQUEST = 'FETCH_BOOKS_REQUEST';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';
export const ADD_BOOK_TO_USER_LIST = 'ADD_BOOK_TO_USER_LIST';
export const ADD_BOOK_FAILURE = 'ADD_BOOK_FAILURE';
export const FETCH_MY_BOOKS = 'FETCH_MY_BOOKS';
export const UPDATE_BOOK_STATUS = 'UPDATE_BOOK_STATUS';
export const UPDATE_BOOK_RATING = 'UPDATE_BOOK_RATING';

export const fetchBooks = () => async (dispatch) => {
    dispatch({ type: FETCH_BOOKS_REQUEST });
    try {
        const response = await fetch(`${baseurl}/books.json`);
        const data = await response.json();

        if (data) {
            const booksArray = Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
            }));
            dispatch({ type: FETCH_BOOKS_SUCCESS, payload: booksArray });
        }

        else{
            dispatch({type: FETCH_BOOKS_FAILURE, payload: "No books found"});
        }

    }
    catch (error) {
        dispatch({type : FETCH_BOOKS_FAILURE, payload: error.message});
        console.log("Errr in Fetching books", error);

    }
}

export const addBookToMyBooks = (book, userId) => async(dispatch) => {
    if(!userId) {
       console.log("add to my books")
        window.location('/login');
    }

    try {
        const response = await fetch(`${baseurl}/users/${userId}/myBooks.json`, {
            method : 'POST',
            headers: {
                'content-type' : 'application/json',
            },
            body: JSON.stringify({
                ...book,
                status : "Want to Read",
                rating : 0,
            }),
        })
        if(!response.ok) {
            throw new Error("Failed to add books to my books");
        }
        const data = await response.json();
        dispatch({
            type: ADD_BOOK_TO_USER_LIST,
            payload: {id : data.name, ...book, status: 'want to read', rating: 0},
        });

    } catch(error) {
        dispatch({
            type: ADD_BOOK_FAILURE, payload: error.message
        })
        console.log("Error in Adding books", error);
    }
}