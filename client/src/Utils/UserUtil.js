import { requestWithBody } from "./RequestUtil";
import { Response, CreateError } from "./ResponseUtil";

export const getLogin = () => {
    return sessionStorage.getItem('login') || null;
}

// return the token from the session storage
export const getToken = (callback) => {        
    let time = (new Date()).getTime();
    let expTime = Number(getExpTime());

    if(time < expTime) {
        let token = sessionStorage.getItem('token');
        if(token == null) {
            Response(callback, CreateError("NO_TOKEN", "No token in storage"))
        }
        Response(callback, {token: token})
    }
    else {
        let refreshToken = getRefreshToken();
        if (refreshToken) {    
            requestWithBody('/api/v1/auth/refreshToken', 'POST', JSON.stringify({refreshToken: refreshToken}), function (success, data) {
                if(success) {
                    let password = getPassword();                    
                    if(password != null) {
                        setUserSession(data.authToken, data.refreshToken, data.expTime, data.user, password);
                        Response(callback, {token: data.authToken})

                    }
                    else {
                        removeUserSession()
                        window.location.href = '/login';
                        Response(callback, CreateError("NO_PASSWORD", "No password in storage"))
                    }
                }
                else {
                    //Refresh token expired
                    removeUserSession()
                    window.location.href = '/login';
                }
            })
        }
        else {
            removeUserSession()
            window.location.href = '/login';
        }
    }
}

// return the password from the session storage
export const getPassword = () => {
    return sessionStorage.getItem('password') || null;
}

export const getExpTime = () => {
    return sessionStorage.getItem('expTime') || null;
}

export const getRefreshToken = () => {
    return sessionStorage.getItem('refreshToken') || null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('expTime');
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('password');
}

// set the token and user from the session storage
export const setUserSession = (authToken, refreshToken, expTime, user, password) => {
    sessionStorage.setItem('token', authToken);
    sessionStorage.setItem('refreshToken', refreshToken);
    sessionStorage.setItem('expTime', String(expTime));
    sessionStorage.setItem('login', user);
    sessionStorage.setItem('password', password);
}
