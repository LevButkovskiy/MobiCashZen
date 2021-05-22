import { request, requestWithBody } from "./RequestUtil";
import { Response, CreateError } from "./ResponseUtil";

export const getLogin = () => {
    return localStorage.getItem('login') || null;
}

// return the token from the session storage
export const getToken = (callback) => {        
    let time = (new Date()).getTime();
    let expTime = Number(getExpTime());

    if(time < expTime) {
        let token = localStorage.getItem('token');
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
                        Response(callback, CreateError("NO_PASSWORD", "No password in storage"))
                    }
                }
                else {
                    //Refresh token expired
                    removeUserSession()
                }
            })
        }
        else {
            removeUserSession()
        }
    }
}

// return the password from the session storage
export const getPassword = () => {
    return localStorage.getItem('password') || null;
}

export const getExpTime = () => {
    return localStorage.getItem('expTime') || null;
}

export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken') || null;
}

export const getRole = () => {
    return localStorage.getItem('role') || null;
}

export const isSuperAdmin = () => {
    return localStorage.getItem('role') == "Manager";
}

export const getGroupId = () => {
    return localStorage.getItem('groupId') || 0;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expTime');
    localStorage.removeItem('login');
    localStorage.removeItem('password');
    localStorage.removeItem('role');
    localStorage.removeItem('groupId');

    window.location.href = "/login";
}

// set the token and user from the session storage
export const setUserSession = (authToken, refreshToken, expTime, user, password, role, groupId) => {
    localStorage.setItem('token', authToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('expTime', String(expTime));
    localStorage.setItem('login', user);
    localStorage.setItem('password', password);
    localStorage.setItem('role', role);
    localStorage.setItem('groupId', groupId)
}


export const getUsersGroups = (callback) => {
    let url = '/api/v1/auth/groups';
    let storedGroups = sessionStorage.getItem('groups')
    if (storedGroups != null) {
        Response(callback, JSON.parse(storedGroups))
    }
    request(url, 'GET', function(success, data) {
        sessionStorage.setItem('groups', JSON.stringify(data))
        Response(callback, data)
    })
}