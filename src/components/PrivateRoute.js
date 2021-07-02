import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, auth }) => {
    return (
    <Route render={props => auth === true
        ? <Component auth={auth} {...props} />
        : <Redirect to='/login' />
    } />
    );
}




export default PrivateRoute;