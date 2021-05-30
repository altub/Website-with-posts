import './App.css';
import React, {useState} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
//Importing components
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import UserPage from './components/UserPage';
import MyPostsPage from './components/MyPostsPage';
import RegisterPage from './components/RegisterPage';
import PostsPage from './components/PostsPage';
import SingularPostPage from './components/SingularPostPage';
import UsersReplies from './components/MyRepliesPage';
import MyRepliesPage from './components/MyRepliesPage';

function App() {

  //States
  

  return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/profilePage' component={UserPage} />
          <Route exact path='/myPosts' component={MyPostsPage} />
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path='/posts' component={PostsPage} />
          <Route exact path='/posts/:postID' component={SingularPostPage}/>
          <Route exact path='/myReplies' component={MyRepliesPage} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
