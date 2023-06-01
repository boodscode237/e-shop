import { CartItemContainer, ItemDetails } from './cart-item.styles';

const CartItem = ({ cartItem }) => {
    const {name, quantity, imageUrl, price} = cartItem
    return(
        <CartItemContainer>
            <img src={imageUrl} alt={`the picture of ${name}`}/>
            <ItemDetails>
                <span className="name">{name}</span>
                <span className='price'>{quantity} x ${price}</span>
            </ItemDetails>
        </CartItemContainer>
    )
}

export default CartItem