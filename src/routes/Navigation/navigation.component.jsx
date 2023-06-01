import {Fragment, useContext} from 'react'
import {Outlet, Link} from "react-router-dom";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
import {UserContext} from "../../contexts/user.context";
import {signOutUser} from "../../utils/firebase.utils";
import {
    NavigationContainer,
    LogoContainer,
    NavLinks,
    NavLink
} from './navigation.styles'
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
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrownLogo className='logo' />
                </LogoContainer>
                <NavLinks>
                   <NavLink to='/shop'>
                       SHOP
                   </NavLink>
                    {
                        currentUser ? (
                            <NavLink as='span' onClick={signOutUser}>
                                SIGN OUT
                            </NavLink>
                        ) : (
                            <NavLink to='/auth'>
                                SIGN IN
                            </NavLink>
                        )
                    }
                    <CartIcon/>
                </NavLinks>
                {isCartOpen && <CartDropDown/>}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}

export default Navigation