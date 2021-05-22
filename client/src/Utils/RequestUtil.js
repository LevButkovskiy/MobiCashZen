import { Response, CreateError } from "./ResponseUtil";
import { getToken, getLogin } from "./UserUtil";

export const request = (url, method, callback) => {
    getToken(function(success, data) {
        if(success) {
            fetch(url, {
                method: method,
                headers: {
                    'api-token': data.token,
                    'Content-Type': 'application/json',
                    'user-link': getLogin()
                }
            })
            .then(response => response.json())
            .then(data => {
                Response(callback, data)
            })
            .catch(function (error) {
                Response(callback, CreateError("ERROR_TRY_AGAIN_LATER", error))
            });
        }
        else {
            Response(callback, CreateError(data.error.key, data.error.message))
        }
    })
}

export const requestWithBody = (url, method, body, callback) => {
    if (url != '/api/v1/auth/login' && url != '/api/v1/auth/refreshToken') {
        getToken(function(success, data) {
            if(success) {
                fetch(url, {
                    method: method,
                    headers: {
                        'api-token': data.token,
                        'Content-Type': 'application/json',
                        'user-link': getLogin()
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
            else {
                Response(callback, CreateError(data.error.key, data.error.message))
            }
        })
    }
    else {
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
}