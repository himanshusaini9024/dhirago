import { some } from "lodash";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { toggleFavProduct } from "../../store/reducers/user";
import { CloudCog } from "lucide-react";
import Image from "next/image";
const ProductItem = ({
  discount,
  images,
  id,
  name,
  price,slug,
  currentPrice,
}) => {
  const dispatch = useDispatch();
const favProducts = useSelector((state) => state.user?.favProducts || []);
  const isFavourite = some(favProducts, (productId) => productId === id);

  const toggleFav = () => {
    dispatch(
      toggleFavProduct({
        id,
      })
    );
  };

  const baseURL = process.env.NEXT_IMG_URL;
   const imageUrl =
    images && images.length > 0
      ? 'https://res.cloudinary.com/ds48lk80f/' + images[0]
      : "/images/placeholder.png";

  return (
    <div className="product-item">
      <div className="product__image">
        <button
          type="button"
          onClick={toggleFav}
          className={`btn-heart ${isFavourite ? "btn-heart--active" : ""}`}
        >
          <i className="icon-heart" />
        </button>

        <Link href={`/product/${slug}`}>
          <img src={imageUrl}  alt={name}  />
          {discount && <span className="product__discount">{discount}%</span>}
        </Link>
      </div>

      <div className="product__description">
        <h3>{name}</h3>

        <div
          className={`product__price ${
            discount ? "product__price--discount" : ""
          }`}
        >
          <h4>${currentPrice}</h4>

          {discount && <span>${price}</span>}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;