var User = require('../models/userSchema');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

var sendNoId = (res) => {
    console.log('No user specified');
    sendJSONresponse(res, 404, {
        error: {
            key: "ERROR_USER_NOTFOUND",
            message: "User not found"
        }
    });
}

var sendNoUser = (res) => {
    console.log("User not found");
    sendJSONresponse(res, 404, {
        error: {
            key: "ERROR_USER_NOTFOUND",
            message: "User not found"
        }
    });
}

var sendErr = (res, err) => {
    console.log(err);
    sendJSONresponse(res, 405, {error: {key: "ERROR_SOMETHING_WENT_WRORNG", message: err}});
}

var sendOk = (res, status, content) => {
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
            return sendErr(res, err);
        }

        return sendOk(res, 200, users);

    });
}

module.exports.userReadOne = function (req, res) {
    let linkTx = req.query.linkTx;

    if (!linkTx) {
        return sendNoId(res);
    }

    let filter = {}
    filter.linkTx = linkTx;

    User
        .find({linkTx: linkTx})
        .populate("historyOfView.articleId", "title author description imagePath publishDate tags")
        .exec(function (err, user) {
            console.log(user[0].historyOfView);
            if (!user) {
                return sendNoUser(res);
            }
            if (err) {
                return sendErr(res, err);
            }
            return sendOk(res, 200, user[0]);
        });
}

module.exports.userUpdateOne = function (req, res) {
    let id = req.params.id;

    if (!id) {
        return sendNoId(res);
    }

    User
        .findById(id)
        .exec(function (err, user) {
            if (!user) {
                return sendNoUser(res);
            } else if (err) {
                return sendErr(res, err);
            }

            user.linkTx = req.body.linkTx ? req.body.linkTx : user.linkTx;
            user.groupId = req.body.groupId ? req.body.groupId : user.groupId;
            user.role = req.body.role ? req.body.role : user.role;

            user.save(function (err, user) {
                if (err) {
                    return sendErr(res, err);
                }
                return sendOk(res, 202, user);
            });
        });
}

module.exports.userUpdateHistoryOfView = function (req, res) {
    let linkTx = req.body.linkTx;

    if (!linkTx) {
        return sendNoId(res);
    }

    User
        .find({linkTx: linkTx})
        .exec(function (err, user) {
            if (!user) {
                return sendNoUser(res);
            } else if (err) {
                return sendErr(res, err);
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
                    return sendErr(res, err.msg);
                }
                return sendOk(res, 202, savedUser);
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
            return sendErr(res, err);
        }
        return sendOk(res, 201, user);
    });
}

module.exports.userDeleteOne = function (req, res) {
    let id = req.params.id;

    if (!id) {
        return sendNoId(res);
    }

    User
        .findByIdAndRemove(id)
        .exec(function (err, user) {
            if (err) {
                return sendErr(res, err);
            }
            return sendOk(res, 200, user);
        });
}
