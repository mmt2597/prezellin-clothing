import { CartItemcontainer, ItemDetails } from "./cart-item.styles";

const CartItem = ({ cartItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;

	return (
		<CartItemcontainer>
			<img src={imageUrl} alt={name} />

			<ItemDetails>
				<span className="name">{name}</span>
				<span className="price">
					${price} x {quantity}
				</span>
			</ItemDetails>
		</CartItemcontainer>
	);
};

export default CartItem;
