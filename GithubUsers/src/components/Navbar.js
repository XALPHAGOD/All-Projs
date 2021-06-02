import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  const {user, logout}= useAuth0();
  // console.log({isAuthenticated, user, isLoading});

  return <Wrapper>
    <img src={user.picture} alt={user.name} />
    <h4>Welcome, <strong>{user.name}</strong></h4>
    <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
  </Wrapper>;
};

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: flex;
  /* grid-template-columns: auto auto 100px; */
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
    text-transform: initial !important;
  }
  img {
    width: 40px !important;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
`;

export default Navbar;
