var Articles = require('../models/articlesSchema');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

var sendNoId = (res) => {
    console.log('No article specified');
    sendJSONresponse(res, 404, {
        error: {
            key: "ERROR_ARTICLE_NOTFOUND",
            message: "Article not found"
        }
    });
}

var sendNoArticle = (res) => {
    console.log("Article not found");
    sendJSONresponse(res, 404, {
        error: {
            key: "ERROR_ARTICLE_NOTFOUND",
            message: "Article not found"
        }
    });
}

var sendErr = (res, err) => {
    console.log(err);
    sendJSONresponse(res, 405, err);
}

var sendOk = (res, status, content) => {
    console.log(content);
    sendJSONresponse(res, status, content);
}

module.exports.getArticles = function (req, res) {
    console.log("getArticles");

    let filter = {};

    // if (req.query.eventId != null) {
    //     filter.eventId = req.query.eventId;
    // }

    let options = {
        page: req.query.page ? req.query.page : 1,
        limit: req.query.limit ? req.query.limit : 99999,
        sort: req.query.sort ? req.query.sort : "title",
    }

    Articles.paginate(filter, options, function (err, articles) {
        if (err) {
            return sendErr(res, err);
        }

        return sendOk(res, 200, articles);

    });
}

// module.exports.articleReadOne = function (req, res) {
//     let id = req.params.id;

//     if (!id) {
//         return sendNoId(res);
//     }

//     Article
//         .findById(id)
//         .exec(function (err, article) {
//             if (!article) {
//                 return sendNoArticle(res);
//             }
//             if (err) {
//                 return sendErr(res, err);
//             }
//             return sendOk(res, 200, article);
//         });
// }

// module.exports.articleUpdateOne = function (req, res) {
//     let id = req.params.id;

//     if (!id) {
//         return sendNoId(res);
//     }

//     Article
//         .findById(id)
//         .exec(function (err, article) {
//             if (!article) {
//                 return sendNoArticle(res);
//             } else if (err) {
//                 return sendErr(res, err);
//             }

//             article.title = {
//                 ru: req.body.title.ru ? req.body.title.ru : article.title.ru,
//                 en: req.body.title.en ? req.body.title.en : article.title.en
//             }
//             article.description = {
//                 ru: req.body.description.ru ? req.body.description.ru : article.description.ru,
//                 en: req.body.description.en ? req.body.description.en : article.description.en
//             }
//             article.URL = {
//                 ru: req.body.URL.ru ? req.body.URL.ru : article.URL.ru,
//                 en: req.body.URL.en ? req.body.URL.en : article.URL.en
//             }
//             article.rteData = {
//                 ru: req.body.rteData.ru ? req.body.rteData.ru : article.rteData.ru,
//                 en: req.body.rteData.en ? req.body.rteData.en : article.rteData.en
//             }
//             article.eventId = req.body.eventId ? req.body.eventId : article.eventId;
//             article.props = req.body.props ? req.body.props : article.props;

//             article.save(function (err, article) {
//                 if (err) {
//                     return sendErr(res, err);
//                 }
//                 return sendOk(res, 202, article);
//             });
//         });
// }

module.exports.articleCreate = function (req, res) {
    let docs = {
        title: {
            ru: req.body.titleRu,
            en: req.body.titleEn
        },
        rteData: {
            ru: req.body.rteDataRu,
            en: req.body.rteDataEn
        },
        tags: req.body.tags,
        props:  req.body.props
    };

    Articles.create(docs, function (err, article) {
        if (err) {
            return sendErr(res, err);
        }
        return sendOk(res, 201, article);
    });
}

module.exports.articleDeleteOne = function (req, res) {
    let id = req.params.id;

    if (!id) {
        return sendNoId(res);
    }

    Articles
        .findByIdAndRemove(id)
        .exec(function (err, article) {
            if (err) {
                return sendErr(res, err);
            }
            return sendOk(res, 200, article);
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