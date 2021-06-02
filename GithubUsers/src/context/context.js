import React, { useState, useEffect, createContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = createContext();

const GithubProviderComp = ({ children }) => {
  // console.log(children);

  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  const [remReq, setRemReq]= useState(0);
  const [loading, setLoading]= useState(false);
  const [error, setError]= useState({show: false, msg: ""});

  const searchUser= async (user)=>{
    setLoading(true);
    try {
      const foundUser= await axios.get(`${rootUrl}/users/${user}`);
      const userRepos= await axios.get(`${foundUser.data.repos_url}?per_page=100`);
      const userFollowers= await axios.get(foundUser.data.followers_url);
      
      toggleError();
      setGithubUser(foundUser.data);
      setRepos(userRepos.data);
      setFollowers(userFollowers.data);
    } catch (err) {
      toggleError(true, "there is no user with that username");
    }
    setLoading(false);
    checkRequests();
  }

  function checkRequests(){
    axios.get(`${rootUrl}/rate_limit`)
    .then(success=>{
      let rem= success.data.rate.remaining;
      // rem=0;
      setRemReq(rem);
      if(rem===0)
        toggleError(true, "hourly search limit exceeded");
    }).catch(err=>console.log(err));
  }

  function toggleError(show= false, msg= ""){
    setError({show, msg});
  }

  useEffect(checkRequests, []);

  return (
    <GithubContext.Provider value={{githubUser, repos, followers, remReq, error, searchUser, loading}}>{children}</GithubContext.Provider>    //takes in all the children elements
  );
};

export { GithubContext, GithubProviderComp };