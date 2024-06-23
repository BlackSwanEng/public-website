import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import client from "@/sanityClient";
import { toast } from "sonner";
import { colors } from "@/constants";

const ProductPage = () => {
  const [product, setProduct] = useState({});

  const location = useLocation();
  const state = location.state;
  const { id: productId } = useParams();

  const fetchProduct = async (productId) => {
    const query = `*[_type == "product" && _id == $productId][0]{
  _id,
  description,
  category,
  image,
  title,
  price,
  "gallery": gallery[].asset->url
}`;
    const params = { productId: productId };

    try {
      const product = await client.fetch(query, params);
      setProduct(product);
    } catch (error) {
      toast("Error fetching product!");
    }
  };

  useEffect(() => {
    if (state != null) {
      setProduct(state);
    } else {
      fetchProduct(productId);
    }
  }, []);

  return (
    <section className="container mx-auto px-4 md:px-6 pb-12 pt-3 h-[100vh]">
      <div
        className={` h-60 mb-5 text-white flex flex-col-reverse p-2 shadow-md rounded-md`}
        style={{ background: colors.primary }}
      >
        <h2>{product.title}</h2>
      </div>
      <div className=" space-y-5">
        <p>{product.description}</p>
        <h3>Gallery</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {product.gallery &&
            product.gallery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} - Image ${index + 1}`}
                className="w-full h-48 object-cover rounded-md shadow-md"
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
