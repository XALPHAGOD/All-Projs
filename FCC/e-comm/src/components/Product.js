import React, { Component } from 'react'
import styled from "styled-components";
import {Link} from "react-router-dom";
import {ProductConsumer} from "../context";
// import PropTypes from "prop-types";

export default class Product extends Component {
    render() {
        const {id, title, img, price, inCart}= this.props;
        return (
            <ProdWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
                <div className="card">
                    <ProductConsumer>
                        {val=>{
                            return (
                                <div className="img-container p-5" onClick={()=>val.handleDetail(id)}>
                                    <Link to="/details">
                                        <img src={img} alt="img" className="card-img-top" />
                                    </Link>
                                    <button className="cart-btn" disabled={inCart} onClick={()=>{val.addToCart(id); val.openModal(id);}}>
                                        {inCart?<p className="text-capitalize mb-0" disabled>in cart</p>:<p className="mb-0"><i className="fas fa-cart-plus"></i></p>}
                                    </button>
                                </div>
                            );
                        }}                        
                    </ProductConsumer>
                    <div className="card-footer d-flex justify-content-between">
                        <p className="align-self-center mb-0">{title}</p>
                        <h5 className="text-blue mb-0">
                            <span className="me-1">${price}</span>
                        </h5>
                    </div>
                </div>
            </ProdWrapper>
        )
    }
}

const ProdWrapper= styled.div`
.card{
    border-color: transparent;
    transition: all 1s linear;
}
.card-footer{
    background: rgba(247, 247, 247);
    border-top: transparent;
    transition: all 0.05s linear;
}
:hover{
    .card{
        border: 0.04rem solid rgba(0, 0, 0, 0.2);
        box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }
    .card-footer{
        background: rgba(227, 227, 227);
    }
}
.img-container{
    position: relative;
    overflow: hidden;
}
.card-img-top{
    transition: all 0.5s ease-in-out;
}
.img-container:hover .card-img-top{
    transform: scale(1.2);
}
.cart-btn{
    background: #36b3fd;
    color: var(--mainWhite);
    padding: 0.1rem 0.4rem;
    border: none;
    border-radius: 0.5rem 0px 0px 0px;
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translateX(200%);
    transition: all 0.5s ease-in-out;
}
.img-container:hover .cart-btn{
    transform: translateX(0);
}
.cart-btn:hover{
    color: var(--mainBlue);
}
`;