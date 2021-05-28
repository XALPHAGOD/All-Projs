import styled from "styled-components";

const ButtonContainer= styled.button`
background: transparent;
color: var(--lightBlue);
color: ${xyz=> (xyz.addProp)?"var(--mainYellow)":"var(--lightBlue)"} ;
padding: 0.2rem 0.5rem;
border: 0.05rem solid var(--lightBlue);
border-color: ${xyz=> (xyz.addProp)?"var(--mainYellow)":"var(--lightBlue)"} ;
border-radius: 0.5rem;
text-transform: capitalize;
transition: all 0.3s ease-in-out;
&:hover{
    background: var(--lightBlue);
    background: ${xyz=> (xyz.addProp)?"var(--mainYellow)":"var(--lightBlue)"} ;
    color: var(--mainBlue);
}
`;

export default ButtonContainer;