import React, { Component } from 'react'
import styled from "styled-components";
import {ProductConsumer} from "../context";
import ButtonContainer from "./Button";
import { Link } from "react-router-dom";

export default class Modal extends Component {
    render() {
        return (
            <ProductConsumer>
                {val=>{
                    if(!val.modalOpen){
                        return null; 
                    }
                    else{
                        return (
                            <ModalConatiner>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-8 mx-auto col-md-6 col-lg-4 p-5 text-center text-capitalize" id="modal">
                                            <h5>item added to cart</h5>
                                            <img src={val.modalProduct.img} className="img-fluid" alt="" />
                                            <h5>{val.modalProduct.title}</h5>
                                            <h5 className="text-muted">price : ${val.modalProduct.price}</h5>
                                            <ButtonContainer className="me-3" onClick={()=>val.closeModal()}>Continue Shopping</ButtonContainer>
                                            <Link to="/cart">
                                                <ButtonContainer addProp onClick={()=>val.closeModal()} >Go To Cart</ButtonContainer>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </ModalConatiner>
                        );
                    }
                }}
            </ProductConsumer>
        )
    }
}

const ModalConatiner= styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: rgba(0, 0, 0, 0.3);
display: flex;
align-items: center;
justify-content: center;
#modal {
background: var(--mainWhite);
}
`;