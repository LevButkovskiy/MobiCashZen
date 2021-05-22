import { Response, CreateError } from "./ResponseUtil";

export const request = (url, method, callback) => {
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        Response(callback, data);
    })
    .catch(function (error) {
        Response(callback, CreateError("ERROR_TRY_AGAIN_LATER", error))
    });
}

export const requestWithBody = (url, method, body, callback) => {
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    })
    .then(response => response.json())
    .then(data => {
        Response(callback, data);
    })
    .catch(function (error) {
        Response(callback, CreateError("ERROR_TRY_AGAIN_LATER", error))
    });
}