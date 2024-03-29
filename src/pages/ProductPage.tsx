import { useParams } from "react-router-dom";
import { getProductBySlug } from "../catalogManager";
import ProductNotFound from "../components/ProductNotFound";
import RatingStars from "../components/RatingStars";
import Slideshow from "../components/Slideshow";
import { formatPrice, getProductImageURLs } from "../utils";
import AttributesTable from "../components/AttributesTable";
import {
  ShoppingCart,
  AddProduct,
  RemoveProduct,
  AddFavorite,
  RemoveFavorite,
} from "../types";
import { useEffect, useState } from "react";
import CartButton from "../components/CartButton";
import NumericSelectOptions from "../components/NumericSelectOptions";
import FavoriteToggle from "../components/FavoriteToggle";

export default function ProductPage({
  addProduct,
  removeProduct,
  shoppingCart,
  addFavorite,
  removeFavorite,
  favorites,
}: {
  addProduct: AddProduct;
  removeProduct: RemoveProduct;
  shoppingCart: ShoppingCart;
  addFavorite: AddFavorite;
  removeFavorite: RemoveFavorite;
  favorites: string[];
}) {
  const { category, subcategory, product } = useParams();

  const [quantity, setQuantity] = useState(1);

  const productData = getProductBySlug(product as string);

  const productInCart =
    shoppingCart.find(
      (cartItem) =>
        cartItem.product.categoryId === category &&
        cartItem.product.subCategoryId === subcategory &&
        cartItem.product.slug === product
    ) != undefined;

  const [imageURLs, setImageURLs] = useState<string[]>([]);

  useEffect(() => {
    getProductImageURLs(
      category as string,
      subcategory as string,
      product as string
    ).then((imagesArr) => setImageURLs(imagesArr));
  }, [category, subcategory, product]);

  const NameAndPrice = ({
    name,
    price,
    classes,
  }: {
    name: string;
    price: number;
    classes?: string;
  }) => (
    <section className={classes}>
      <h1 className="text-xl font-bold">{name}</h1>
      <h3 className="text-lg">{formatPrice(price)}</h3>
    </section>
  );

  const isFavorite = productData ? favorites.includes(productData.slug) : false;

  return !productData ? (
    <ProductNotFound />
  ) : (
    <section className="flex justify-center">
      <section className="flex flex-col lg:flex-row bg-slate-500 w-full xl:w-[1280px] justify-center gap-6">
        <section className="bg-blue-400 flex flex-col items-center px-6">
          <section className="w-full md:w-[600px] flex flex-col gap-4">
            <NameAndPrice
              name={productData.name}
              price={productData.price}
              classes="lg:hidden"
            />
            <Slideshow imageUrls={imageURLs} />
            <RatingStars rating={productData.rating} classes="text-lg" />
            <AttributesTable attributes={productData.attributes} />
          </section>
        </section>
        <section className=" bg-green-500 flex flex-col items-center">
          <section className="w-full md:w-fit flex flex-col gap-4 mt-10 sticky top-10">
            <NameAndPrice
              name={productData.name}
              price={productData.price}
              classes="hidden lg:block"
            />

            <section className="flex gap-1 justify-center items-center w-11/12 md:w-[250px] self-center mb-10">
              {productInCart ? (
                <>
                  <FavoriteToggle
                    addToFavorites={() => addFavorite(productData.slug)}
                    removeFromFavorites={() => removeFavorite(productData.slug)}
                    isFavorite={isFavorite}
                    classes="mr-4"
                  />
                  <CartButton
                    innerText={"REMOVE FROM CART"}
                    callBack={() => removeProduct(productData)}
                    classes="flex-1"
                  />
                </>
              ) : (
                <>
                  <FavoriteToggle
                    addToFavorites={() => addFavorite(productData.slug)}
                    removeFromFavorites={() => removeFavorite(productData.slug)}
                    isFavorite={isFavorite}
                    classes="mr-4"
                  />
                  <select
                    className="w-1/4 h-full"
                    id="quantity-select"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  >
                    <NumericSelectOptions />
                  </select>
                  <CartButton
                    innerText={"ADD TO CART"}
                    callBack={() =>
                      addProduct({ product: productData, quantity })
                    }
                    classes="flex-1"
                  />
                </>
              )}
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}
