import React from 'react'
import { Link } from "react-router-dom";

export default function CartTotal({val, hist}) {
    const {cartSubTotal, cartTax, cartTotal, clearCart}= val;
    return (
        <>
            <div className="container p-0 d-flex">
                <div className="my-3 mx-auto mx-lg-0 ms-lg-auto text-capitalize text-right">
                    <Link to="/">
                        <button className="btn btn-outline-danger text-uppercase mb-3 px-5" type="button" onClick={()=>clearCart()} >
                            clear cart
                        </button>
                    </Link>
                    <h5>
                        <span className="text-title"> subtotal :</span>{" "}
                        <strong>$ {cartSubTotal} </strong>
                    </h5>
                    <h5>
                        <span className="text-title"> tax :</span>{" "}
                        <strong>$ {cartTax} </strong>
                    </h5>
                    <h5>
                        <span className="text-title"> total :</span>{" "}
                        <strong>$ {cartTotal} </strong>
                    </h5>
                    {/* <PayPalButton totalAmount={cartTotal} clearCart={clearCart} history={hist} /> */}
                </div>
            </div>
        </>
    )
}
