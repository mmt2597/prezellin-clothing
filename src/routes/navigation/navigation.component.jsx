import { useContext } from "react";
import { Outlet } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";
import {
	LogoContainer,
	NavLinks,
	NavLink,
	NavigationContainer,
} from "./navigation.styles";

const Navigation = () => {
	const { currentUser } = useContext(UserContext);
	const { isCartOpen } = useContext(CartContext);

	return (
		<>
			<NavigationContainer>
				<LogoContainer to="/">
					<div>
						<CrwnLogo className="logo" />
					</div>
				</LogoContainer>
				<NavLinks>
					<NavLink to="/shop">SHOP</NavLink>
					{currentUser ? (
						<span className="nav-link" onClick={signOutUser}>
							SIGN OUT
						</span>
					) : (
						<NavLink to="/auth">SIGN IN</NavLink>
					)}
					<div>
						<CartIcon />
					</div>
					{isCartOpen && <CartDropDown />}
				</NavLinks>
			</NavigationContainer>
			<Outlet />
		</>
	);
};

export default Navigation;
