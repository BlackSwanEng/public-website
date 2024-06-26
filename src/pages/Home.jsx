import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/ui/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/components/ui/avatar";
import { toast } from "sonner";
import client from "@/sanityClient";
import backgroundImage from "@/assets/background.jpg";

const Home = () => {
  const [homeData, setHomeData] = useState({});

  const fetchData = async () => {
    try {
      const query = `*[_type == "home"][0]{
  heroSection{
    headline,
    subheadline,
    callToAction
  },
  testimonialsSection[]{
    authorName,
    testimonial,
    'authorImage': authorImage.asset->url,
    _key
  },
  featuredProductsSection[]{
    description, title, category, 'image': image.asset->url,
  },
  projectsCounter[]{
    title, number
  }

}`;
      const data = await client.fetch(query);
      setHomeData(data);
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
    <div className="flex flex-col min-h-[100dvh]">
      <section className="relative w-full h-[80vh] overflow-hidden">
        <img
          src={backgroundImage}
          className="absolute inset-0 w-full h-full object-cover"
          alt="bg"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 container h-full flex flex-col items-start justify-center text-white space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Black Swan Engineering
          </h1>
          <h2>{homeData?.heroSection?.headline}</h2>
          <p className="text-xl md:text-2xl max-w-3xl">
            Specializing in the production of high-quality containers for trucks
            and pickup trucks.
          </p>
          <NavLink
            to="/products"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-lg font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {homeData?.heroSection?.callToAction}
          </NavLink>
        </div>
      </section>
      <section className="py-20 bg-muted">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
          {homeData?.featuredProductsSection?.map((item) => (
            <div className="flex flex-col items-center justify-center space-y-4" key={item.title}>
              <img
                src={item.image}
                width={300}
                height={200}
                alt={item.title}
                className="rounded-lg object-cover"
              />
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
              <NavLink to="/products" className="text-primary hover:underline">
                Learn More
              </NavLink>
            </div>
          ))}
        </div>
      </section>
      <section className="py-20 bg-background">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {homeData?.projectsCounter?.map((item) => (
            <div className="flex flex-col items-center justify-center space-y-2" key={item.title}>
              <h2 className="text-4xl font-bold">{item.number}</h2>
              <p className="text-muted-foreground">{item.title}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="flex flex-col items-center justify-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              What Our Customers Say
            </h2>
            <Carousel className="w-full max-w-3xl">
              <CarouselContent>
                {homeData?.testimonialsSection &&
                  homeData?.testimonialsSection?.map((item) => (
                    <CarouselItem key={item._key}>
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <blockquote className="text-center">
                          <p className="text-xl">"{item.testimonial}"</p>
                        </blockquote>
                        <div className="flex items-center space-x-2">
                          <Avatar>
                            <AvatarImage src={item.authorImage} />
                            <AvatarFallback>{item.authorName}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="text-lg font-semibold">
                              {item.authorName}
                            </h4>
                            {item.position && (
                              <p className="text-muted-foreground">
                                {item.position}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>
      <section className="py-20 bg-background">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Our Process</h2>
            <p className="text-muted-foreground max-w-md">
              At Black Swan Engineering, we follow a meticulous process to ensure
              the highest quality and customer satisfaction.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center space-x-2">
                <CheckIcon className="h-5 w-5 text-primary" />
                <span>Consultation and Design</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckIcon className="h-5 w-5 text-primary" />
                <span>Precision Manufacturing</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckIcon className="h-5 w-5 text-primary" />
                <span>Rigorous Testing</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckIcon className="h-5 w-5 text-primary" />
                <span>Timely Delivery</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us?</h2>
            <p className="text-muted-foreground max-w-md">
              BlackSwan Engineering stands out from the competition with our
              unparalleled quality, customer service, and industry expertise.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center space-x-2">
                <CheckIcon className="h-5 w-5 text-primary" />
                <span>Over 5 years of experience</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckIcon className="h-5 w-5 text-primary" />
                <span>Innovative and custom solutions</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckIcon className="h-5 w-5 text-primary" />
                <span>Commitment to customer satisfaction</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckIcon className="h-5 w-5 text-primary" />
                <span>Reliable and on-time delivery</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default Home;
