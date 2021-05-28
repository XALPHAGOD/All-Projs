import React from 'react'

export default function CartItem({item, val}) {
    const { id, title, img, price, total, count } = item;
    const { increment, decrement, removeItem } = val;
    return (
        <div className="row my-5 text-capitalize text-center">

            <div className="col-10 mx-auto col-lg-2 d-flex justify-content-center align-items-center">
                <img src={img} style={{ width: "5rem", heigth: "5rem" }} className="img-fluid" alt="" />
            </div>

            <div className="col-10 mx-auto col-lg-2 d-flex justify-content-center align-items-center">
                <span className="d-lg-none">product :</span> {title}
            </div>

            <div className="col-10 mx-auto col-lg-2 d-flex justify-content-center align-items-center">
                <strong><span className="d-lg-none">price :</span> ${price}</strong>
            </div>

            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0 d-flex justify-content-center align-items-center">
                <div className="d-flex justify-content-center">
                    <div>
                        <span className="btn btn-black mx-1 px-2" onClick={()=>decrement(id)}><i className="fas fa-minus"></i></span>
                        <span className="btn btn-black mx-1"><strong>{count}</strong></span>
                        <span className="btn btn-black mx-1 px-2" onClick={()=>increment(id)}><i className="fas fa-plus"></i></span>
                    </div>
                </div>
            </div>

            <div className="col-10 mx-auto col-lg-2 d-flex justify-content-center align-items-center">
                <div className=" cart-icon" onClick={()=>removeItem(id)}>
                    <i className="fas fa-trash" />
                </div>
            </div>

            <div className="col-10 mx-auto col-lg-2 d-flex justify-content-center align-items-center">
                <strong>item total : ${total} </strong>
            </div>
        </div>
    );
}
