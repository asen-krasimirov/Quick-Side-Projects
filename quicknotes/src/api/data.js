import { createAPIDialog } from './api.js';

const api = createAPIDialog();

const host = 'https://parseapi.back4app.com/';

const endpoints = {
    register: host + 'users',
    login: host + 'login',
    logout: host + 'logout',
    notesCollection: host + 'classes/Note',
}

function addPointer(className, objectId) {
    /*
    \"pointerExample\": {
        \"__type\": \"Pointer\",
        \"className\": \"<YOUR_CLASS_NAME>\",
        \"objectId\": \"<THE_REFERENCED_OBJECT_ID>\" 
    }
    */
    return {
        "__type": "Pointer",
        "className": className,
        "objectId": objectId
    }
}


/* authentication requests */
export async function registerUser(body, headers={ 'X-Parse-Revocable-Session': '1' }) {
    return await api.postData(endpoints.register, body, headers);
}

export async function loginUser(body, headers={ 'X-Parse-Revocable-Session': '1' }) {
    return await api.postData(endpoints.login, body, headers);
}

export async function logOutUser() {
    return await api.postData(endpoints.logout);
}


/* Data Gathering */
export async function getNotesByUser(userId) {
    let url = endpoints.notesCollection + `?where={"owner":${JSON.stringify(addPointer("_User", userId))}}`
    const result = (await api.getData(url))["results"];
    return result;
}


/* CRUD Operations */
export async function deleteNote(noteId) {
    return await api.deleteRequest(endpoints.notesCollection + "/" + noteId);
}

export async function updateNote(noteId, body) {
    return await api.updateRequest(endpoints.notesCollection + "/" + noteId, body);
}

export async function createNote(body) {
    body["owner"] = addPointer("_User", sessionStorage.userId);
    const result = await api.postData(endpoints.notesCollection, body);
    return result;
}