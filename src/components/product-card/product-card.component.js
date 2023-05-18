import './product-card.styles.scss'
import Button from '../button/button.component'

const ProductCard = ({product}) => {
    const {name, price, imageUrl, id} = product
    return (
        <div className='product-card-container' key={id}>
            <img src={imageUrl} alt={`an image of a/an ${name}`}/>
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType='inverted'>Add to card</Button>
        </div>
    )
}

export default ProductCard