import React, { Suspense } from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';
import './App.css';

import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';

import Login from './pages/Login';
import Articles from './pages/Articles';
import ArticleModify from './pages/ArticleModify';
import Article from './pages/Article';
import ArticlePreview from './pages/ArticlePreview';
import ArticleShow from './pages/ArticleShow';

function App() {
  return (
    <Suspense fallback="loading">
        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path="/" component={Articles}/>
            <PrivateRoute exact path="/personal" component={Articles}/>
            <PrivateRoute path="/article/new" component={ArticleModify}/>
            <PrivateRoute path="/article/:id/edit" component={ArticleModify}/>
            <PrivateRoute exact path="/article/:id" component={Article}/>
            {/* <PrivateRoute path="/article/:id/preview" component={ArticlePreview}/> */}
            <PrivateRoute path="/article/:id" component={ArticleShow}/>
            <PublicRoute path="/login" component={Login}/>
          </Switch>
        </BrowserRouter>
    </Suspense>
  );
}

export default App;
