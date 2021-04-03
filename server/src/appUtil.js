var jwt = require('jsonwebtoken');
var config = require('../src/config');

const salt = config.jwt.SALT;

const jwtsecret = config.jwt.auth.secret; // ключ для подписи JWT
const jwtsecretRefresh = config.jwt.refresh.secret; // ключ для подписи refreshKey JWT

const authTokenTime = config.jwt.auth.tokenTime; //30 минут
const refreshTokenTime = config.jwt.refresh.tokenTime; //1 месяц

const createCallback = (callback, success, errorKey = '', errorMessage = '', data = {}) => {
    if(success) {
        return callback(success, data);
    }
    else {
        console.log(errorMessage);
        return callback(success, errorKey, errorMessage);
    }
}
class appUtil {
    getToken(login) {
        let time = this.getTokenTime();
        let authToken = jwt.sign({ login: login, time: time }, jwtsecret);
        let refreshToken = jwt.sign({ login: login, time: time }, jwtsecretRefresh);
        return {
            authToken: authToken,
            refreshToken: refreshToken,
            expTime: time + authTokenTime
        };
    }

    getTokenTime() {
        return (new Date()).getTime()
    }

    getLogin(token) {
        if(this.checkToken(token)){
            var decoded = jwt.verify(token, jwtsecret);
            return decoded.login
        }
        else {
            return undefined;
        }
    }

    checkToken(token, callback) {
        if(token == null) {
            createCallback(callback, false, "ERROR_TOKEN_WRONG", "empty token")
        }

        try {
            var decoded = jwt.verify(token, jwtsecret);
            let time = this.getTokenTime();
            let tokenTime = decoded.time;

            if(tokenTime == null){
                createCallback(callback, false, "ERROR_TOKEN_WRONG", 'wrong token ' + token)
            }

            if (time - tokenTime > (authTokenTime)) {
                createCallback(callback, false, "ERROR_TOKEN_EXPIRED", 'token ' + token + 'has expired')
            }

            if (decoded.login != null) {
                return createCallback(callback, true);
            }
            createCallback(callback, false, "ERROR_TOKEN_WRONG", 'wrong token')
        } catch(err) {
            createCallback(callback, false, "ERROR_TOKEN_WRONG", err.message)
        }
    }

    checkRefreshToken(token, callback) {
        if(token == null) {
            createCallback(callback, false, "ERROR_TOKEN_WRONG", "empty refresh token")
        }

        try {
            var decoded = jwt.verify(token, jwtsecretRefresh);
            let time = this.getTokenTime();
            let tokenTime = decoded.time;

            if(tokenTime == null){
                createCallback(callback, false, "ERROR_TOKEN_WRONG", 'wrong refresh token ' + token)
            }

            if (time - tokenTime > (refreshTokenTime)) {
                createCallback(callback, false, "ERROR_TOKEN_EXPIRED", 'refresh token ' + token + 'has expired')
            }
            else if (decoded.login == null) {
                createCallback(callback, false, "ERROR_TOKEN_WRONG", 'wrong refresh token ' + token)
            }
            else {
                let newToken = this.getToken(decoded.login);
                let tokenData = {
                    authToken: newToken.authToken,
                    expTime: newToken.expTime,
                    refreshToken: token,
                    user: decoded.login
                };
                createCallback(callback, true, null, null, tokenData)
            }
        } catch(err) {
            createCallback(callback, false, "ERROR_TOKEN_WRONG", err.message)
        }
  }
}

module.exports = new appUtil();
