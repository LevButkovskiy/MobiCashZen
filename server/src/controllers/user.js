var User = require('../models/userSchema');
const mobiLogger = require('../mobiLogger');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

var sendNoId = (req, res) => {
    mobiLogger.error(req, 405, ["ERROR_WRONG_REQUEST", "Not found, id is required"])
    sendJSONresponse(res, 405, {
        error: {
            key: "ERROR_WRONG_REQUEST",
            message: "Not found, id is required"
        }
    });
}

var sendNoUser = (req, res) => {
    mobiLogger.error(req, 404, ["ERROR_USER_NOTFOUND", "User not found"])
    sendJSONresponse(res, 404, {
        error: {
            key: "ERROR_USER_NOTFOUND",
            message: "User not found"
        }
    });
}

var sendErr = (req, res, err) => {
    mobiLogger.error(req, 405, [err.key, err.message])
    sendJSONresponse(res, 405, {error: {key: "ERROR_SOMETHING_WENT_WRORNG", message: err}});
}

var sendOk = (req, res, content, status = 200) => {
    mobiLogger.info(req, status)
    sendJSONresponse(res, status, content);
}

module.exports.getUsers = function (req, res) {
    let filter = {};

    let options = {
        page: req.query.page ? req.query.page : 1,
        limit: req.query.limit ? req.query.limit : 99999,
        sort: req.query.sort ? req.query.sort : "linkTx"
    }
    
    User.paginate(filter, options, function (err, users) {
        if (err) {
            return sendErr(req, res, err);
        }

        return sendOk(req, res, users);

    });
}

module.exports.userReadOne = function (req, res) {
    let linkTx = req.query.linkTx;

    if (!linkTx) {
        return sendNoId(req, res);
    }

    let filter = {}
    filter.linkTx = linkTx;

    User
        .find({linkTx: linkTx})
        .populate("historyOfView.articleId", "title author description imagePath publishDate tags")
        .exec(function (err, user) {
            if (!user) {
                return sendNoUser(req, res);
            }
            if (err) {
                return sendErr(req, res, err);
            }
            return sendOk(req, res, user[0]);
        });
}

module.exports.userUpdateOne = function (req, res) {
    let id = req.params.id;

    if (!id) {
        return sendNoId(req, res);
    }

    User
        .findById(id)
        .exec(function (err, user) {
            if (!user) {
                return sendNoUser(req, res);
            } else if (err) {
                return sendErr(req, res, err);
            }

            user.linkTx = req.body.linkTx ? req.body.linkTx : user.linkTx;
            user.groupId = req.body.groupId ? req.body.groupId : user.groupId;
            user.role = req.body.role ? req.body.role : user.role;

            user.save(function (err, user) {
                if (err) {
                    return sendErr(req, res, err);
                }
                return sendOk(req, res, user, 202);
            });
        });
}

module.exports.userUpdateHistoryOfView = function (req, res) {
    let linkTx = req.body.linkTx;

    if (!linkTx) {
        return sendNoId(req, res);
    }

    User
        .find({linkTx: linkTx})
        .exec(function (err, user) {
            if (!user) {
                return sendNoUser(req, res);
            } else if (err) {
                return sendErr(req, res, err);
            }
            
            let userData = user[0];
            let previousHistory = userData.historyOfView;
            if (!previousHistory.some(el => el.articleId == req.body.articleId)) {
                previousHistory.push({
                    articleId: req.body.articleId,
                    lastPos: req.body.lastPos,
                    percentage: req.body.percentage,
                    isLiked: req.body.isLiked
                })
            }
            else {
                itemIndex = previousHistory.findIndex((el => el.articleId == req.body.articleId));
                previousHistory[itemIndex].lastPos = req.body.lastPos;
                if (req.body.percentage > previousHistory[itemIndex].percentage) { previousHistory[itemIndex].percentage = req.body.percentage };
                previousHistory[itemIndex].isLiked = req.body.isLiked
            }

            userData.historyOfView = previousHistory;

            userData.save(function (err, savedUser) {
                if (err) {
                    return sendErr(req, res, err.msg);
                }
                return sendOk(req, res, savedUser, 202);
            });
        });
}

module.exports.userCreate = function (req, res) {
    let docs = {
        linkTx: req.body.linkTx,
        groupId: req.body.linkTx,
        role: req.body.role,
        historyOfView: []
    };

    User.create(docs, function (err, user) {
        if (err) {
            return sendErr(req, res, err);
        }
        return sendOk(req, res, user, 201);
    });
}

module.exports.userDeleteOne = function (req, res) {
    let id = req.params.id;

    if (!id) {
        return sendNoId(req, res);
    }

    User
        .findByIdAndRemove(id)
        .exec(function (err, user) {
            if (err) {
                return sendErr(req, res, err);
            }
            return sendOk(req, res, user);
        });
}
