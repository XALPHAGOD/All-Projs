import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';
const Dashboard = () => {
  const {loading, error}= React.useContext(GithubContext);
  return (
    <main>
      <Navbar></Navbar>
      <Search />
      { loading  ? <img src={loadingImage} className="loading-img" alt="loading" /> : !error.show ? <> <Info /> <User /> <Repos /> </> : <></> }
    </main>
  );
};

export default Dashboard;
