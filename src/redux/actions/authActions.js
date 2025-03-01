import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_USER = 'SET_USER';

export const registerRequest = (user) => ({
    type: REGISTER_USER,
    payload: user
});

export const loginuser = (user) => ({
    type: LOGIN_USER,
    payload: user
})

export const logoutuser = () => ({
    type: LOGOUT_USER
})

export const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

export const registeruser = (email, password) => async (dispatch) => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        console.log('userss', userCredentials);
        dispatch(setUser(userCredentials.user));
        localStorage.setItem("user", JSON.stringify(userCredentials.user));

    } catch (error) {
        console.log("Error in regiser", error);
    }
}

export const loginUser = (email, password) => async(dispatch) => {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        dispatch(setUser(userCredentials.user));
        localStorage.setItem("user", JSON.stringify(userCredentials.user));
    } catch(error){
        console.log("Error in Login", error);
    }
}

export const logout = () => async(dispatch) => {
    try {
        await signOut(auth);
        dispatch(logoutuser());
        localStorage.removeItem("user");
    } catch(error) {
        console.log("error in logout", error);
    }
}