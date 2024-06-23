import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import sanityClient from "@/sanityClient";
import { toast } from "sonner";
import { colors } from "@/constants";
import { Badge } from "@/ui/components/ui/badge";

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const query = `*[_type == "product"][]{
      _id,
      description, 
      product,
      'image': image.asset->url,
      title,
      price,
      category,
      "gallery": gallery[].asset->url
    }`;
      const products = await sanityClient.fetch(query);
      setProducts(products);
    } catch (error) {
      toast("API Error", {
        description:error?.message
      })
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <section className="container mx-auto px-4 md:px-6 pb-12 pt-3 h-max">
      <div className={` h-60 mb-5 text-white flex flex-col-reverse p-2 shadow-md rounded-md`} style={{background:colors.primary}}>
        <p className=" w-[80%] text-sm mt-3  text-muted-background">
          Discover our diverse range of precision-engineered products tailored
          to meet your specific needs. From cutting-edge instruments to custom
          solutions, Black Swan Engineering delivers innovation across multiple
          categories to empower your projects and drive your success.
        </p>
        <h2>Our Products</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-background rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl"
          >
            <NavLink to={"/products/" + product._id} className="block" state={product}>
              <img
                src={product.image || require('@/assets/placeholder.svg')}
                alt={product.title}
                width={400}
                height={300}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
                <Badge>{product.category}</Badge>
                <p className=" line-clamp-3 w-full text-xs mt-2">
                  {product.description}
                </p>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
