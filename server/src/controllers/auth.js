const appUtil = require('../appUtil');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.userLogin = function (req, res) {
    console.log('User login', req.body);

    let login = req.body.login;
    let password = req.body.password;

    if (login == null || password == null || login == "" || password == "") {
        console.log('No data');
        return sendJSONresponse(res, 404, {
            error: {
                key: "ERROR_WRONG_REQUEST",
                message: "No data in request"
            }
        });
    }

    let token = appUtil.getToken(login);
    res.set('api-token', token);
    return sendJSONresponse(res, 200, {
        authToken: token.authToken,
        expTime: token.expTime,
        refreshToken: token.refreshToken,
        user: login
    });
}

module.exports.checkRefreshToken = function (req, res) {
    console.log('Check refresh token', req.body);

    let token = req.body.refreshToken;

    appUtil.checkRefreshToken(token, function (success, data) {
        if (!success) {
            return sendJSONresponse(res, 401, data)
        }
        else {
            return sendJSONresponse(res, 200, {
                authToken: data.authToken,
                expTime: data.expTime,
                refreshToken: data.refreshToken,
                user: data.user
            });
        }
    });
};
