import { createContext, useState } from "react";

export const CartContext = createContext({
	isCartOpen: false,
	isSetCartOpen: () => {},
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, isSetCartOpen] = useState(false);
	const value = { isCartOpen, isSetCartOpen };

	return (
		<CartContext.Provider value={value}>{children}</CartContext.Provider>
	);
};
