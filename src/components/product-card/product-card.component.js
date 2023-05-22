import {useContext} from "react";

import Button from '../button/button.component'
import {CartContext} from "../../contexts/cart.context";

import './product-card.styles.scss'

const ProductCard = ({product}) => {
    const {name, price, imageUrl, id} = product
    const { addItemToCart } = useContext(CartContext)
    const addProductToCart = () => addItemToCart(product)

    return (
        <div className='product-card-container' key={id}>
            <img src={imageUrl} alt={`an image of a/an ${name}`}/>
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType='inverted' onClick={addProductToCart}>Add to card</Button>
        </div>
    )
}

export default ProductCard