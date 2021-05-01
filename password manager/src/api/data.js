import { createApiDialog } from "./api.js";

const api = createApiDialog();
const host = "https://parseapi.back4app.com/";

const endpoints = {
    registerURL: host + "users",
    loginURL: host + "login",
    logoutURL: host + "logout",
    passwordCollectionURL: host + "classes/Password",
}

/* Authentication Requests */

export async function registerUser(body, headers={ "X-Parse-Revocable-Session": "1" }) {
    return await api.postRequest(endpoints.registerURL, body, headers);
}

export async function loginUser(body, headers={ "X-Parse-Revocable-Session": "1" }) {
    let url = endpoints.loginURL + `?username=` + encodeURIComponent(body.username) + `&password=` + encodeURIComponent(body.password);
    return await api.getRequest(url, headers);
}

export async function logoutUser() {
    return await api.postRequest(endpoints.logoutURL, {});
}


/* Data Gathering Requests */

export async function getAllPasswordsByUserId(userId) {
    let url = endpoints.passwordCollectionURL + `?where=` + JSON.stringify({"ownerId": userId});
    const result = (await api.getRequest(url))["results"];
    return result;
}

/* CRUD Requests */

export async function logNewPassword(body) {
    return await api.postRequest(endpoints.passwordCollectionURL, body);
}