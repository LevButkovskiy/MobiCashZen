import React, { Suspense } from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';
import './App.css';

import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';

import Login from './pages/Login';
import Articles from './pages/Articles';
import ArticleModify from './pages/ArticleModify';

function App() {
  return (
    <Suspense fallback="loading">
        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path="/" component={Articles}/>
            <PrivateRoute path="/article/new" component={ArticleModify}/>
            <PublicRoute path="/login" component={Login}/>
          </Switch>
        </BrowserRouter>
    </Suspense>
  );
}

export default App;
