import React, {useEffect, useState} from "react";
import client from "@/sanityClient";
import { toast } from "sonner";

const ContactUs = () => {
  const [contact, setContact] = useState({});

  const fetchData = async () => {
    try {
      const query = `*[_type == "contactUs"][0]`;
      const data = await client.fetch(query);
      setContact(data);
    } catch (error) {
      toast("API Error", {
        description: error?.message,
      });
    }
  }

  useEffect(()=> {
    fetchData()
  }, [])

  return ( 
    <div className="container mx-auto py-12 md:py-20 h-[100vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
            <p className="text-muted-foreground ">
              Get in touch with us for any inquiries or feedback.
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Address</h3>
              <p className="text-muted-foreground w-60">
                {contact.address}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-muted-foreground w-30">
                {contact.phone}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p className="text-muted-foreground">
                {contact.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
