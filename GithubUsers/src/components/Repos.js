import React, { useContext } from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const {repos}= useContext(GithubContext);

  if(repos.length===0)
    return <></>

  // const data = [
  //   {
  //     label: "HTML",
  //     value: "50"
  //   },
  //   {
  //     label: "CSS",
  //     value: "40"
  //   },
  //   {
  //     label: "JS",
  //     value: "40"
  //   },
  //   {
  //     label: "C",
  //     value: "40"
  //   },
  //   {
  //     label: "C++",
  //     value: "65"
  //   },
  //   {
  //     label: "Java",
  //     value: "55"
  //   },
  //   {
  //     label: "Python",
  //     value: "35"
  //   }
  // ];


  const languages= repos.reduce((prevState, curItem)=>{

    const {language, stargazers_count}= curItem;

    if(!language)
      return prevState;
    // console.log(language);

    if(prevState[language]){
      prevState[language].value++;
      prevState[language].stars+= stargazers_count;
    }
    else{
      prevState[language]={label: language, value: 1, stars: stargazers_count};
    }
    return prevState;
  }, {});

  const mostUsedLang= Object.values(languages).sort((a, b)=>b.value-a.value).slice(0, 5);   //Top 5 most popular
  const mostStarredLang= Object.values(languages).sort((a, b)=>b.stars-a.stars).map(item=>{
    return {...item, value: item.stars};
  }).slice(0, 5);

  let {stars, forks}= repos.reduce((prev, cur)=>{
    const {name, forks, stargazers_count}= cur;

    prev.stars[name]= {label: name, value: stargazers_count};
    prev.forks[name]= {label: name, value: forks};
    return prev;
  }, {stars: {}, forks: {}});

  stars= Object.values(stars).sort((a, b)=>b.value-a.value).slice(0, 5);
  forks= Object.values(forks).sort((a, b)=>b.value-a.value).slice(0, 5);

  return <section className="section">
    <Wrapper className="section-center">
      {/* <ExampleChart chartData={data} /> */}
      <Pie3D data={mostUsedLang} />
      <Column3D data={stars} />
      <Doughnut2D data={mostStarredLang} />
      <Bar3D data={forks} />
    </Wrapper>
  </section>;
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }
  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
  .fc__tooltip{
    width: fit-content !important;
    border: 1px solid black !important;
  }
`;

export default Repos;
