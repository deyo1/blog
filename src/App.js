import 'bootstrap/dist/css/bootstrap.min.css';

import { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import AuthContext from './store/AuthContext';

import HomePage from './pages/Home';
import PostPage from './pages/Post';
import LoginPage from './pages/Login';
import UserPostsPage from './pages/UserPosts';
import AddPostPage from './pages/AddPost';
import EditPostPage from './pages/EditPost';
import SettingsPage from './pages/Settings';
import PageNotFound from './pages/PageNotFound';
import SerachResultsPage from './pages/SearchResults';
import Header from './components/Header';







function App() {

  const authCtx = useContext(AuthContext);

  return (
    <div>
      <Header />
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/posts/:postId' component={PostPage} />
        <Route path='/page-not-found' component={PageNotFound} />
        <Route path='/search-results/:query' component={SerachResultsPage} />
        {!authCtx.isLogedIn && (
          <Route path='/login' component={LoginPage} />
        )}
        
        <PrivateRoute path='/your-posts'
          auth={authCtx.isLogedIn}
          component={UserPostsPage} />

        <PrivateRoute path='/add-post'
          auth={authCtx.isLogedIn}
          component={AddPostPage} />

        <PrivateRoute path='/edit/:postId'
          auth={authCtx.isLogedIn}
          component={EditPostPage} />

        <PrivateRoute path='/settings'
          auth={authCtx.isLogedIn}
          component={SettingsPage} />

        <Route path='*'>
          <Redirect to='/page-not-found' />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
