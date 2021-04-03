import { Response, CreateError } from "./ResponseUtil";

export const requestWithBody = (url, method, body, callback) => {
    fetch('http://localhost:3080' + url, {
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