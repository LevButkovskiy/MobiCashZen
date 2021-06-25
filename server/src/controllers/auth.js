const appUtil = require('../appUtil');
var User = require('../models/userSchema');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

var sendErr = (res, err) => {
    console.log(err);
    sendJSONresponse(res, 405, {error: {key: "ERROR_SOMETHING_WENT_WRORNG", message: err}});
}

var sendOk = (res, status, content) => {
    sendJSONresponse(res, status, content);
}

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

    User
        .find({linkTx: login})
        .exec(function (err, user) {
            if (err) {
                return sendErr(res, err);
            }

            let userData = user[0];
            console.log(userData);
            if (!userData) {
                let docs = {
                    linkTx: login,
                    groupId: 13,
                    role: 'User',
                    historyOfView: []
                };
            
                User.create(docs, function (err, newUser) {
                    if (err) {
                        return sendErr(res, err);
                    }

                    return sendOk(res, 200, {
                        authToken: token.authToken,
                        expTime: token.expTime,
                        refreshToken: token.refreshToken,
                        user: newUser.linkTx,
                        role: newUser.role,
                        groupId: newUser.groupId
                    });
                });
            }
            else {    
                return sendOk(res, 200, {
                    authToken: token.authToken,
                    expTime: token.expTime,
                    refreshToken: token.refreshToken,
                    user: userData.linkTx,
                    role: userData.role,
                    groupId: userData.groupId
                });
            }
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

module.exports.getUsersGroups = function (req, res) {
    let groups = [
        {
            _id: 0,
            title: {
                ru: "Все департаменты",
                en: "All departments"
            }
        },
        {
            _id: 1,
            title: {
                ru: "Административный департамент",
                en: "Administrative department"
            }
        },
        {
            _id: 2,
            title: {
                ru: "Департамент автоматизации",
                en: "Automation Department"
            }
        },
        {
            _id: 3,
            title: {
                ru: "Департамент клиентов",
                en: "Customer Department"
            }
        },
        {
            _id: 4,
            title: {
                ru: "Департамент разработок",
                en: "Development Department"
            }
        },
        {
            _id: 5,
            title: {
                ru: "Коммерческий департамент",
                en: "Commercial department"
            }
        },
        {
            _id: 6,
            title: {
                ru: "Процессинговый департамент",
                en: "Processing department"
            }
        },
        {
            _id: 7,
            title: {
                ru: "Департамент поддержки бизнеса",
                en: "Business Support Department"
            }
        },
        {
            _id: 8,
            title: {
                ru: "Региональные дирекции",
                en: "Regional directorates"
            }
        },
        {
            _id: 9,
            title: {
                ru: "Управление кадровых ресурсов",
                en: "Human Resources Management"
            }
        },
        {
            _id: 10,
            title: {
                ru: "Управление розничного бизнеса",
                en: "Retail Business Department"
            }
        },
        {
            _id: 11,
            title: {
                ru: "Управление программных продуктов TranzWare",
                en: "TranzWare Software Management"
            }
        },
        {
            _id: 12,
            title: {
                ru: "Управление программных продуктов TranzAxis",
                en: "TranzAxis Software Management"
            }
        },
        {
            _id: 13,
            title: {
                ru: "Управление программных продуктов MobiCash",
                en: "MobiCash Software Management"
            }
        },
        {
            _id: 14,
            title: {
                ru: "Образовательная группа",
                en: "Educational group"
            }
        },
        {
            _id: -1,
            title: {
                ru: "Никому",
                en: "To nobody"
            }
        },
    ]

    return sendJSONresponse(res, 200, groups)
};
