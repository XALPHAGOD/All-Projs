import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = (data) => {
  // console.log(data);
  // data.children are all the components only verifiedUsers can access

  const {user, isAuthenticated}= useAuth0();

  const verifiedUser= isAuthenticated && user;

  return <Route render={()=>{
    return verifiedUser ? data.children : <Redirect to="/login" />;
  }}></Route>;    //renders children elements conditionally
};
export default PrivateRoute;
