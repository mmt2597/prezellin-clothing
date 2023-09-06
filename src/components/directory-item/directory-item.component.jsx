import { useNavigate } from "react-router-dom";
import "./directory-item.styles";
import {
	BackgroundImage,
	Body,
	DirectoryItemContainer,
} from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
	const { imageUrl, title, route } = category;
	const navigate = useNavigate();

	const goToShopByCategory = () => navigate(route);

	return (
		<DirectoryItemContainer onClick={goToShopByCategory}>
			<BackgroundImage $imageUrl={imageUrl} />
			<Body>
				<h2>{title}</h2>
				<p>Shop Now</p>
			</Body>
		</DirectoryItemContainer>
	);
};

export default DirectoryItem;
