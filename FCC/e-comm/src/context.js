import React, { Component } from 'react'
import {storeProducts, detailProduct} from "./data";
const ProdContext= React.createContext();

class ProductProvider extends Component {

    state={
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
    };
    componentDidMount(){
        this.setProducts();
    }
    setProducts= ()=>{
        let temp= [];
        storeProducts.forEach(item=>temp= [...temp, {...item}]);
        this.setState(()=>{
            return {
                products: temp
            }
        });
    }


    getItem= (id)=>{
        return this.state.products.find(item=>item.id===id);
    };

    handleDetail= (id)=>{
        const item= this.getItem(id);
        // console.log(item);
        this.setState(()=>{
            return {
                detailProduct: item
            };
        });
    };
    addToCart= (id)=>{
        const temp= [...this.state.products];
        const index= temp.indexOf(this.getItem(id));
        const item= temp[index];
        item.inCart= true;
        item.count++;
        item.total+=item.price;
        this.setState(()=>{
            return {
                products: temp,
                cart: [...this.state.cart, item]
            }
        }, ()=>this.addTotals());
    };


    openModal = id => {
        const product = this.getItem(id);
        this.setState(() => {
          return { modalProduct: product, modalOpen: true };
        });
    };
    closeModal = () => {
        this.setState(() => {
          return { modalOpen: false };
        });
    };


    increment= id=>{
        let tempCart = [...this.state.cart];
        const index= tempCart.indexOf(tempCart.find(item=>item.id===id));
        const item= tempCart[index];
        item.count++;
        item.total+=item.price;
        this.setState(()=>{
            return {
                cart: [...tempCart]
            };
        }, ()=>this.addTotals());
    }   
    decrement= id=>{
        let tempCart = [...this.state.cart];
        const index= tempCart.indexOf(tempCart.find(item=>item.id===id));
        const item= tempCart[index];
        if(item.count===1)
            this.removeItem(id);
        else{
            item.count--;
            item.total-=item.price;
            this.setState(()=>{
                return {
                    cart: [...tempCart]
                };
            }, ()=>this.addTotals());
        }
    }

    removeItem= id=>{
        let tempCart = [...this.state.cart].filter(item=>item.id !== id);

        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(()=>{
            return {
                cart: [...tempCart],
                product: [...tempProducts]
            };
        }, ()=>this.addTotals());
    }

    addTotals= ()=>{
        let subTotal = 0;
        this.state.cart.map(item=>(subTotal += item.total));
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(()=>{
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            };
        });
    }
    clearCart= ()=>{
        this.setState(()=>{
            return {
                cart: []
            };
        }, ()=>{
            this.setProducts();
            this.addTotals();
        })
    }


    render() {
        return (
            <ProdContext.Provider 
            value={
                {
                    ...this.state,
                    handleDetail: this.handleDetail,
                    addToCart: this.addToCart,
                    openModal: this.openModal,
                    closeModal: this.closeModal,
                    increment: this.increment,
                    decrement: this.decrement,
                    removeItem: this.removeItem,
                    clearCart: this.clearCart
                }
            }>
            {this.props.children}
            </ProdContext.Provider>
        )
    }
}

const ProductConsumer= ProdContext.Consumer;

export {ProductProvider, ProductConsumer};