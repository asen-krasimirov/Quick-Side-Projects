import { page } from '../lib.js';
import { registerUser, loginUser } from './data.js';


export async function authenticate(body, isRegistering=true) {
    let responseFunc = (isRegistering) ? registerUser : loginUser;
    let errorMessage = (isRegistering) ? "You have already registered!" : "Check you username and password again!";

    try {

        let response = await responseFunc(body);
        sessionStorage.authToken = response.sessionToken;
        sessionStorage.userId = response.objectId;
    
    } catch(error) {
        throw new Error(errorMessage);
    }

    page.redirect("/loggedIn");
}
