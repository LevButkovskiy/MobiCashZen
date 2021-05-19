import { request, requestWithBody } from './RequestUtil';
import { Response } from './ResponseUtil'

//Get all articles request
const articlesRequest = (searchParams, callback) => {
    let params = {}
    if(searchParams != null) {
        params = searchParams
    }
    
    let url = '/api/v1/articles?' + new URLSearchParams(params)
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

//Article update request
const updateArticleRequest = (articleId, article, callback) => {
    let url = '/api/v1/articles/' + articleId;
    requestWithBody(url, 'PUT', JSON.stringify(article), function(success, data) {
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

//Get all Articles
export const getArticles = (searchParams, callback) => {
    articlesRequest(searchParams, function(success, data) {
        Response(callback, data);
    })
}

//Get one Article
export const getArticle = (articleId, callback) => {
    articleRequest(articleId, function(success, data) {
        Response(callback, data);
    })
}

//Update article
export const updateArticle = (articleId, article, callback) => {
    updateArticleRequest(articleId, article, function(success, data) {
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
