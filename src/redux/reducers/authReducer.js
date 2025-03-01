import { IoIosArrowUp } from "react-icons/io";
import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, SET_USER } from "../actions/authActions"

const initalState = {
    user: null,
    isAuthenticated : false,
}

export const authReducer = (state = initalState, action) => {
    switch (action.type) {
        case REGISTER_USER:
            return { ...state, user: action.payload,isAuthenticated: true };
        case LOGIN_USER:
            return { ...state, user: action.payload, isAuthenticated: true };
        case SET_USER:
            return { ...state, user: action.payload, isAuthenticated: true };
        case LOGOUT_USER:
            return { ...state, user: null, isAuthenticated: false };
        default: 
            return state;
    }

}