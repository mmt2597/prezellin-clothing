import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
	// find if cartItems contains productToAdd
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);

	if (existingCartItem) {
		// If found, increment quantity
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	// return new array with modified cartItems/ new cart item
	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
	isCartOpen: false,
	isSetCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	cartCount: 0,
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, isSetCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
		setCartCount(cartItems.length);
	}, [cartItems]);

	const addItemToCart = (productToAdd) =>
		setCartItems(addCartItem(cartItems, productToAdd));

	const value = {
		isCartOpen,
		isSetCartOpen,
		cartItems,
		addItemToCart,
		cartCount,
	};

	return (
		<CartContext.Provider value={value}>{children}</CartContext.Provider>
	);
};
