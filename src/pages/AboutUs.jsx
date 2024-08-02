import React, { useState, useEffect } from "react";
import { colors } from "@/constants";
import { toast } from "sonner";
import { NavLink } from "react-router-dom";
import { Badge } from "@/ui/components/ui/badge";
import client from "@/sanityClient";
import placeholderImage from "@/assets/placeholder.svg"; 

const AboutUs = () => {
  const [about, setAbout] = useState();

  const fetchData = async () => {
    try {
      const query = `*[_type == "about"][0]{
  businessDescription,
  "projectsCompleted": projectsCompleted[]->{
    _id,
    title,
    description,
    'image':image.asset->url,
    clientCompany,
    containerSize,
    clientDeliveryDate,
    _key,
    projectType->{title},
    truckType->{title},
    "gallery": gallery[].asset->url
  },
  mission,
  vision
}`;
      const data = await client.fetch(query);
      setAbout(data);
    } catch (error) {
      toast("API Error", {
        description: error?.message,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="container mx-auto px-4 md:px-6 pb-12 pt-3 ">
      <div
        className={` h-60 mb-5 text-white flex flex-col-reverse p-2 shadow-md rounded-md`}
        style={{ background: colors.primary }}
      >
        <h2>About Us</h2>
      </div>
      <div className=" space-y-5">
        <p className=" text-justify">{about?.businessDescription}</p>
        <h2>Mission</h2>
        <p className=" text-justify">{about?.mission}</p>
        <h2>Vision</h2>
        <p className=" text-justify">{about?.vision}</p>
      </div>
      <h2 className=" my-6">Our Success Stories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {about?.projectsCompleted.map((project) => (
          <div
            key={project._id}
            className="bg-background rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl"
          >
            <NavLink
              to={"/project/" + project._id}
              className="block"
              state={project}
            >
              <img
                src={project.image || placeholderImage}
                alt={project.title}
                width={400}
                height={300}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                <Badge>{project.projectType.title}</Badge>
                <p className=" line-clamp-3 w-full text-xs mt-2">
                  {project.description}
                </p>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
