import { useContext } from "react";

import {CartContext} from "../../contexts/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {useNavigate} from "react-router-dom";

import './cart-dropdown.styles'
import {CartDropDownComponent, CartItems, EmptyMessage} from "./cart-dropdown.styles";


const CartDropDown = () => {
    const {cartItems} = useContext(CartContext)
    const navigate = useNavigate()

    const goToCheckoutHandler = () => navigate('/checkout')
    return (
        <CartDropDownComponent>
            <CartItems>
                {
                    cartItems ?
                        (cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)) :
                        (<EmptyMessage>Yor cart is empty</EmptyMessage>)
                }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
        </CartDropDownComponent>
    )
}

export default CartDropDown