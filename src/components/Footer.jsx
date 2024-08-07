import React, {useEffect, useState} from "react";
import client from "@/sanityClient";
import { toast } from "sonner";
import { NavLink } from 'react-router-dom';
import logo from '@/assets/logo.png'

const Footer = () => {


  const [socialMedia, setSocialMedia] = useState({});

  const fetchData = async () => {
    try {
      const query = `*[_type == "home"][0]{socialMediaLinks}`;
      const data = await client.fetch(query);
      setSocialMedia(data.socialMediaLinks);
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
    <footer className="bg-muted py-6 border-t">
        <div className="container flex flex-col items-center justify-between md:flex-row">
          <div className="flex items-center space-x-4">
            <NavLink to="/" >
              <img src={logo} alt="" width={60} height={60} />
              <span className="sr-only">BlackSwan Engineering</span>
            </NavLink>
            <div className="flex items-center space-x-4">
              <a href={socialMedia[0]?.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary" >
                <FacebookIcon className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href={socialMedia[1]?.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary" >
                <TwitterIcon className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href={socialMedia[2]?.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary" >
                <InstagramIcon className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href={socialMedia[3]?.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary" >
                <LinkedinIcon className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          <p className="text-muted-foreground">&copy; 2024 BlackSwan Engineering. All rights reserved.</p>
        </div>
      </footer>
  );
};

function FacebookIcon(props) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function InstagramIcon(props) {
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
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}


function LinkedinIcon(props) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}


function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}


function TwitterIcon(props) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

export default Footer;