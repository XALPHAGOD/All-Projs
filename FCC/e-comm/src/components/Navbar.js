import React, { Component } from 'react';
import {Link} from "react-router-dom";
import logo from "../logo.svg";
import styled from "styled-components";
import ButtonContainer from "./Button";


export default class Navbar extends Component {
    render() {
        return (
            <NavWrapper className="navbar navbar-expand-sm px-3 px-sm-4 px-md-5">
                {/* https://www.iconfinder.com/icons/1243689/call_phone_icon Creative Commons (Attribution 3.0 Unported); https://www.iconfinder.com/Makoto_msk */}
                <Link to="/"><img src={logo} alt="Home" className="navbar-brand" /></Link>
                <ul className="navbar-nav ms-0 ms-sm-3">
                    <li className="nav-item">
                        <Link to="/products" className="nav-link">products</Link>
                    </li>
                </ul>
                <Link to="/cart" className="nav-link ms-0 ms-sm-auto">
                    <ButtonContainer><i className="fas fa-cart-plus me-2"></i>my cart</ButtonContainer>
                </Link>
            </NavWrapper>
        );
    }
}

const NavWrapper= styled.nav`
background: var(--mainBlue);
.nav-link{
    color: var(--mainWhite) !important;
    font-size: 1.2rem;
    text-transform: capitalize;
    :hover{
        color: var(--lightBlue) !important;
    }
}
`;