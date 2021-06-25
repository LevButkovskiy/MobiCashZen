var Articles = require('../models/articlesSchema');
const mobiLogger = require('../mobiLogger');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

var sendNoId = (req, res) => {
    mobiLogger.error(req, 404, [404, "ERROR_WRONG_REQUEST", "Not found, id is required"])
    sendJSONresponse(res, 404, {
        error: {
            key: "ERROR_WRONG_REQUEST",
            message: "Not found, id is required"
        }
    });
}

var sendNoArticle = (req, res) => {
    mobiLogger.error(req, 404, [404, "ERROR_ARTICLE_NOTFOUND", "Article not found"])
    sendJSONresponse(res, 404, {
        error: {
            key: "ERROR_ARTICLE_NOTFOUND",
            message: "Article not found"
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

module.exports.getArticles = function (req, res) {
    let filter = {};

    if (req.query.tag != null) {
        filter["tags.title"] = req.query.tag
    }

    if (req.query.internal != null) {
        filter.internal = "true"
    }

    if (req.query.search != null && req.query.search != "") {
        let searchArr = [
            {"title.en": {"$regex": req.query.search}},
            {"title.ru": {"$regex": req.query.search}},
            {"tags.title": {"$regex": req.query.search}},
            {"description.en": {"$regex": req.query.search}},
            {"description.ru": {"$regex": req.query.search}}
        ];

        if (req.query.allowedGroup != null) {
            filter["$and"] = [
                {"$or": [{"allowedGroups": 0}, {"allowedGroups": req.query.allowedGroup}]},
                {"$or": searchArr}
            ]
        }
        else {
            filter["$or"] = searchArr;
        }
    }
    else {
        if (req.query.allowedGroup != null) {
            filter["$or"] = [{"allowedGroups": 0}, {"allowedGroups": req.query.allowedGroup}]
        }
    }

    let options = {
        page: req.query.page ? req.query.page : 1,
        limit: req.query.limit ? req.query.limit : 99999,
        sort: req.query.sort ? req.query.sort : "title"
    }
    options.select = "+key";

    
    Articles.paginate(filter, options, function (err, articles) {
        if (err) {
            return sendErr(req, res, err);
        }

        return sendOk(req, res, articles);
    });
}

module.exports.articleReadOne = function (req, res) {
    let id = req.params.id;

    if (!id) {
        return sendNoId(req, res);
    }

    Articles
        .findById(id)
        .exec(function (err, article) {
            if (!article) {
                return sendNoArticle(req, res);
            }
            if (err) {
                return sendErr(req, res, err.msg);
            }
            return sendOk(req, res, article);
        });
}

module.exports.articleUpdateOne = function (req, res) {
    let id = req.params.id;

    if (!id) {
        return sendNoId(req, res);
    }

    Articles
        .findById(id)
        .exec(function (err, article) {
            if (!article) {
                return sendNoArticle(req, res);
            } else if (err) {
                return sendErr(req, res, err.msg);
            }

            article.author = {
                ru: req.body.author.ru ? req.body.author.ru : article.author.ru,
                en: req.body.author.en ? req.body.author.en : article.author.en
            }
            article.title = {
                ru: req.body.title.ru ? req.body.title.ru : article.title.ru,
                en: req.body.title.en ? req.body.title.en : article.title.en
            }
            article.rteData = {
                ru: req.body.rteData.ru ? req.body.rteData.ru : article.rteData.ru,
                en: req.body.rteData.en ? req.body.rteData.en : article.rteData.en
            }
            article.description = {
                ru: req.body.description.ru ? req.body.description.ru : article.description.ru,
                en: req.body.description.en ? req.body.description.en : article.description.en
            }
            article.tags = req.body.tags;
            article.internal = req.body.internal;
            article.imagePath = req.body.imagePath ? req.body.imagePath : article.imagePath;
            article.allowedGroups = req.body.allowedGroups ? req.body.allowedGroups : article.allowedGroups;
            article.publishDate = req.body.publishDate ? req.body.publishDate : article.publishDate;

            article.save(function (err, article) {
                if (err) {
                    return sendErr(req, res, err.msg);
                }
                return sendOk(req, res, article, 202);
            });
        });
}

module.exports.articleCreate = function (req, res) {
    let docs = {
        author: {
            ru: req.body.author.ru,
            en: req.body.author.en
        },
        title: {
            ru: req.body.title.ru,
            en: req.body.title.en
        },
        rteData: {
            ru: req.body.rteData.ru,
            en: req.body.rteData.en
        },
        description: {
            ru: req.body.description.ru,
            en: req.body.description.en
        },
        tags: req.body.tags,
        internal: req.body.internal,
        imagePath: req.body.imagePath,
        allowedGroups:  req.body.allowedGroups,
        publishDate: req.body.publishDate
    };

    Articles.create(docs, function (err, article) {
        if (err) {
            return sendErr(req, res, err.msg);
        }
        return sendOk(req, res, article, 201);
    });
}

module.exports.articleDeleteOne = function (req, res) {
    let id = req.params.id;

    if (!id) {
        return sendNoId(req, res);
    }

    Articles
        .findByIdAndRemove(id)
        .exec(function (err, article) {
            if (err) {
                return sendErr(req, res, err.msg);
            }
            return sendOk(req, res, article);
        });
}


module.exports.export = function (req, res) {
    Articles
        .find({internal: false})
        .select("author title rteData description tags imagePath publishDate")
        .exec(function (err, articles) {
            if (!articles || !articles[0]) {
                return sendNoArticle(req, res);
            }
            if (err) {
                return sendErr(req, res, {error: {
                    key: "ERROR_TRY_AGAIN_LATER",
                    message: err
                }})
            }
            // if (articles[0].eventId.key !== req.header("key")){
            //     return sendErr(req, res, {error: {
            //         key: "ERROR_TRY_AGAIN_LATER",
            //         message: "Invalid key"
            //     }})
            // }
            articles_export = []
            articles.map((item, key) => {
                dd = String(item.publishDate.getDate()).padStart(2, '0');
                mm = String(item.publishDate.getMonth() + 1).padStart(2, '0'); //January is 0!
                yyyy = item.publishDate.getFullYear();

                today = yyyy + '-' + mm + '-' + dd;
                article = {
                    _id: item._id,
                    publishDate : item.publishDate,
                    author : req.header("language") === "ru" ? item.author.ru : item.author.en,
                    title : req.header("language") === "ru" ? item.title.ru : item.title.en,
                    subtitle: req.header("language") === "ru" ? item.description.ru : item.description.en,
                    data: req.header("language") === "ru" ? item.rteData.ru : item.rteData.en,
                    imagePath : item.imagePath
                }

                articles_export.push(article);
            })
            content = {
                TimeFormat: "h:mma",
                LB_TIMEZONE: "The articles time is shown as GMT+2",
                ARTICLES: articles_export,
            }

            sendOk(req, res, content);
        });
}

module.exports.exportOne = function (req, res) {
    let id = req.params.id;

    if (!id) {
        return sendNoId(req, res)
    }
    Articles
        .find({_id: id, internal: false})
        .exec(function (err, articles) {
            if (!articles || !articles[0]) {
                return sendNoArticle(req, res);
            }
            if (err) {
                return sendErr(req, res, {error: {
                    key: "ERROR_TRY_AGAIN_LATER",
                    message: err
                }})
            }
            console.log(articles[0]);
            if (articles[0].key !== req.header("key")){
                return sendErr(req, res, {error: {
                    key: "ERROR_TRY_AGAIN_LATER",
                    message: "Invalid key"
                }})
            }
            articles_export = []
            articles.map((item, key) => {
                dd = String(item.publishDate.getDate()).padStart(2, '0');
                mm = String(item.publishDate.getMonth() + 1).padStart(2, '0'); //January is 0!
                yyyy = item.publishDate.getFullYear();

                today = yyyy + '-' + mm + '-' + dd;
                article = {
                    _id: item._id,
                    publishDate : item.publishDate,
                    author : req.header("language") === "ru" ? item.author.ru : item.author.en,
                    title : req.header("language") === "ru" ? item.title.ru : item.title.en,
                    subtitle: req.header("language") === "ru" ? item.description.ru : item.description.en,
                    data: req.header("language") === "ru" ? item.rteData.ru : item.rteData.en,
                    imagePath : item.imagePath
                }

                articles_export.push(article);
            })
            content = {
                TimeFormat: "h:mma",
                LB_TIMEZONE: "The articles time is shown as GMT+2",
                ARTICLES: articles_export,
            }

            sendOk(req, res, content);
        });
}

// //Internal function. Delete all article associated with the event. Used with deleting event
// module.exports.deleteAllArticlesByEvent = function (eventId, callback) {
//      console.log("delete Article by Event");

//     let filter = {};

//     if (eventId != null) {
//         filter.eventId = eventId;
//     }

//     let options = {pagination: false}

//     Article.paginate(filter, options, function (err, article) {
//         if (err) {
//             return callback(false, err)
//         }
//         if(article.docs.length == 0) {
//              console.log("Article is empty");
//             return callback(true);
//         }
//         else {
//             article.docs.map((articleItem, index) => {
//                 Article
//                     .findByIdAndRemove(articleItem._id)
//                     .exec(
//                         function (err, deletedArticle) {
//                             if (err) {
//                                 return callback(false, err)
//                             }

//                             console.log("article", deletedArticle._id, "deleted");

//                             if (index == article.docs.length - 1) {return callback(true)}
//                         }
//                   );
//             })
//         }
//     });
// }

// module.exports.publicGetArticle = function (req, res) {
//     let id = req.params.id;

//     if (!id) {
//         sendNoId(res)
//         return;
//     }

//     Article
//         .find({eventId: id})
//         .select("title -_id eventId title URL description rteData")
//         .populate("eventId", "name _id +key")
//         .exec(function (err, article) {
//             if (err) {
//                 sendErr(res, err);
//                 return;
//             }
//             if (article[0].eventId.key !== req.header("key")){
//                 sendOk(res, 200,"Invalid key");
//                 return;
//             }

//             event_article = []
//             article.map((item, key) => {
//                 element = {
//                     title: req.header("language") === "ru" ? item.title.ru : item.title.en,
//                     description: req.header("language") === "ru" ? item.description.ru : item.description.en,
//                     URL: req.header("language") === "ru" ? item.URL.ru : item.URL.en,
//                     rteData: req.header("language") === "ru" ? item.rteData.ru : item.rteData.en,
//                 }
//                 event_article.push(element)
//             })

//             content = {
//                 EVENT_DESC: req.header("language") === "ru" ? article[0].eventId.name.ru : article[0].eventId.name.en,
//                 TimeFormat: "h:mma",
//                 LB_TIMEZONE: "The event time is shown as GMT+2",
//                 EVENT_ARTICLE: event_article,
//             }

//             sendOk(res, 200, content);
//         });
// }
