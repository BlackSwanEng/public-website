import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import client from "@/sanityClient";
import { toast } from "sonner";
import { colors } from "@/constants";
import { Badge } from "@/ui/components/ui/badge";

const ProjectPage = () => {
  const [product, setProduct] = useState({});

  const location = useLocation();
  const state = location.state;
  const { id: projectId } = useParams();

  const fetchProduct = async (projectId) => {
    const query = `*[_type == "project" && _id == $projectId][0]{
    projectType->{title},
    truckType->{title},
    description,
    title,
    image,
    clientCompany,
    containerSize,
    clientDeliveryDate,
    "gallery": gallery[].asset->url
}`;
    const params = { projectId: projectId };

    try {
      const data = await client.fetch(query, params);
      setProduct(data);
    } catch (error) {
      toast("Error fetching product!");
    }
  };

  useEffect(() => {
    if (state != null) {
      setProduct(state);
    } else {
      fetchProduct(projectId);
    }
  }, []);

  return (
    <section className="container mx-auto px-4 md:px-6 pb-12 pt-3 h-screen">
      <div
        className={` h-60 mb-5 text-white flex flex-col-reverse p-2 shadow-md rounded-md`}
        style={{ background: colors.primary }}
      >
        <h2>{product.title}</h2>
      </div>
      <div className=" space-y-5">
        <div className=" flex space-x-3">
          <Badge>{product.projectType?.title}</Badge>
          <Badge>{product.truckType?.title}</Badge>
        </div>
        <p>{product.description}</p>
        <h3>Gallery</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {product.gallery?.length > 0 ? (product.gallery &&
            product.gallery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} - Image ${index + 1}`}
                className="w-full h-48 object-cover rounded-md shadow-md"
              />
            ))):
            <p>No images found</p>}
        </div>
      </div>
    </section>
  );
};

export default ProjectPage;
