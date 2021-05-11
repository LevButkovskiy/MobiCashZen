import { request, requestWithBody } from './RequestUtil';
import { Response } from './ResponseUtil'

//Get all articles request
const articlesRequest = (callback) => {
    let url = '/api/v1/articles/';
    request(url, 'GET', function(success, data) {
        Response(callback, data)
    })
}

//Get one article request
const articleRequest = (articleId, callback) => {
    let url = '/api/v1/articles/' + articleId;
    request(url, 'GET', function(success, data) {
        Response(callback, data)
    })
}

//Article create request
const createArticleRequest = (article, callback) => {
    let url = '/api/v1/articles/';
    requestWithBody(url, 'POST', JSON.stringify(article), function(success, data) {
        Response(callback, data)
    })
}

//Article delete request
const deleteArticleRequest = (articleId, callback) => {
    let url = '/api/v1/articles/' + articleId;
    request(url, 'DELETE', function(success, data) {
        Response(callback, data)
    })
}

// Get Articles
// export const getArticles = (eventId, callback) => {
//   articlesRequest(eventId, function(success, data) {
//     if (success) {
//       return callback(true, data);
//     }
//     else {
//       return callback(false, {error: {
//         key: data.error.key,
//         message: data.error.message
//       }});
//     }
//   })
// }

//Get all Articles
export const getArticles = (callback) => {
    articlesRequest(function(success, data) {
        Response(callback, data);
    })
}

//Get one Article
export const getArticle = (articleId, callback) => {
  articleRequest(articleId, function(success, data) {
      Response(callback, data);
  })
}

//Create article
export const createArticle = (article, callback) => {
  createArticleRequest(article, function(success, data) {
      Response(callback, data);
  })
}

//Delete article
export const deleteArticle = (articleId, callback) => {
    deleteArticleRequest(articleId, function(success, data) {
        Response(callback, data);
    })
  }
