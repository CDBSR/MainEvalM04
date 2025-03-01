import { baseurl } from "../../components/BaseUrl";

export const FETCH_BOOKS_REQUEST = 'FETCH_BOOKS_REQUEST';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';
export const ADD_BOOK_TO_USER_LIST = 'ADD_BOOK_TO_USER_LIST';
export const ADD_BOOK_FAILURE = 'ADD_BOOK_FAILURE';
export const FETCH_MY_BOOKS_REQUEST = 'FETCH_MY_BOOKS_REQUEST';
export const FETCH_MY_BOOKS_SUCCESS = 'FETCH_MY_BOOKS_SUCCESS';
export const FETCH_MY_BOOKS_ERROR = 'FETCH_MY_BOOKS_ERROR';
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
        if(response.ok) {
            alert("Book Added");
        }
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

export const fetchMyBooks  = (userId) => async (dispatch) => {
    if(!userId)
        return;
    dispatch({type: FETCH_MY_BOOKS_REQUEST});
    try {
        const response = await fetch(`${baseurl}/users/${userId}/myBooks.json`);
        const data = await response.json();
        if(data) {
            const myBooksArray = Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
            }));
            dispatch({type: FETCH_MY_BOOKS_SUCCESS, payload: myBooksArray});
        }
        else {
            dispatch({type: FETCH_MY_BOOKS_ERROR, payload: "No Books Found"});
        }
    } catch (error){
        dispatch({type: FETCH_MY_BOOKS_ERROR, payload: error.message});
        console.log("Error in Fetching my Books", error);
    }
}

export const updateBookStatus = (bookId, status, userId) => async(dispatch) => {
    if(!userId)
        return;
    try {
        await fetch(`${baseurl}/users/${userId}/myBooks/${bookId}.json`,{
            method: 'PATCH',
            headers: {
                'content-type' : 'application/json',
            },
            body: JSON.stringify({status})
        })
        dispatch({type: UPDATE_BOOK_STATUS, payload: {bookId, status}});
    } catch(erro){
        console.log("eer in uspdatei n staue", erro);
    }
}

export const updateBookRating = (bookId, rating, userId) => async(dispatch) => {
    if(!userId)
        return;
    try {
        await fetch(`${baseurl}/users/${userId}/myBooks/${bookId}.json`,{
            method: 'PATCH',
            headers: {
                'content-type' : 'application/json',
            },
            body: JSON.stringify({rating})
        })
        dispatch({type: UPDATE_BOOK_STATUS, payload: {bookId, rating}});
    } catch(erro){
        console.log("eer in uspdatei n staue", erro);
    }
}