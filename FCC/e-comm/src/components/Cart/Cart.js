import React, { Component } from 'react';
import Title from "../Title";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import { ProductConsumer } from "../../context";
import CartList from "./CartList";
import CartTotal from "./CartTotal";

class Cart extends Component {
    render() {
        return (
            <section>
                <ProductConsumer>
                    {val=>{
                        if(val.cart.length>0){
                            return (
                                <>
                                    <Title name="your" title="cart" />
                                    <CartColumns />
                                    <CartList {...val} />
                                    <CartTotal val={val} hist={this.props.history}/>
                                </>
                            );
                        }
                        else{
                            return (
                                <EmptyCart />
                            );
                        }
                    }}
                </ProductConsumer>
            </section>
        );
    }
}

export default Cart;