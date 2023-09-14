import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";

import {
    ProductCardContainer,
    Footer,
    Name,
    Price,
} from "./product-card.styles";
import { selectCartItems } from "../../store/cart/cart.selector";

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);

	const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={name} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button
                onClick={addProductToCart}
                buttonType={BUTTON_TYPE_CLASSES.inverted}
            >
                Add to cart
            </Button>
        </ProductCardContainer>
    );
};

export default ProductCard;
