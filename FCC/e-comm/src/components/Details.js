import React, { Component } from 'react';
import {ProductConsumer} from "../context";
import {Link} from "react-router-dom";
import ButtonContainer from "./Button";

class Details extends Component {
    render() {
        return (
            <ProductConsumer>
                {(val)=>{
                    const data= val.detailProduct;
                    return (
                        <div className="container py-3">
                            <div className="row">
                                <div className="col-10 mx-auto text-center text-blue mt-5 mb-3">
                                    <h1>{data.title}</h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6 p-3 d-flex justify-content-center align-items-center">
                                    <img src={data.img} alt="" />
                                </div>
                                <div className="col p-3">
                                    <h4 className="text-title text-center">by: {data.company}</h4>
                                    <p className="p-3 mt-5 text-muted">{data.info}</p>
                                    <h4 className="text-blue text-end text-capitalize px-5">price: ${data.price}</h4>
                                    <div className="p-3 mt-5">
                                        <Link to="/">
                                            <ButtonContainer className="me-3">back to products</ButtonContainer>
                                        </Link>
                                        <ButtonContainer addProp disabled={data.inCart} onClick={()=>{val.addToCart(data.id); val.openModal(data.id);}}>
                                            {(data.inCart)?"in cart":"add to cart"}
                                        </ButtonContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </ProductConsumer>
        );
    }
}

export default Details;