import {Fragment, useContext} from 'react'
import {Outlet, Link} from "react-router-dom";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
import {UserContext} from "../../contexts/user.context";
import {signOutUser} from "../../utils/firebase.utils";
import './navigation.styles.scss'
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
import {CartContext} from "../../contexts/cart.context";

const Navigation = () => {
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const {isCartOpen} = useContext(CartContext)
    async function signOutHandler() {
        await signOutUser()
        // setCurrentUser(null)
    }
    return (
        <Fragment>
            <div className='navigation'>
                <Link to='/' className='logo-container'>
                    <CrownLogo className='logo' />
                </Link>
                <div className='nav-links-container'>
                   <Link className='nav-link' to='/shop'>
                       SHOP
                   </Link>
                    {
                        currentUser ? (
                            <span className='nav-link' onClick={signOutUser}>

                                SIGN OUT
                            </span>
                        ) : (
                            <Link className='nav-link' to='/auth'>
                                SIGN IN
                            </Link>
                        )
                    }
                    <CartIcon />
                </div>
                {isCartOpen && <CartDropDown/>}
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation