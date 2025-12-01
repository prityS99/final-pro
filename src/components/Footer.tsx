"use client";

import Image from "next/image";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "../../public/Logo/logo.svg";
import bg from "../../public/Footer/bg.webp";

export default function Footer() {
  return (
    <footer className="relative w-full mt-10">

      
      <div className="absolute inset-0 -z-10">
        <Image
          src={bg}
          alt="footer background"
          fill
          className="object-cover blur-[1.4px] opacity-65"
        />
      </div>

      <div className="backdrop-blur-md bg-black/40 text-white py-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-8">

          
          <div className="md:col-span-2">

            
            <Image
              src={logo}
              alt="logo"
              width={110}
              height={50}
              className="object-contain mb-3"
            />

           
            <p className="text-lg opacity-85 text-bold leading-snug mb-3">
              Carrying forward timeless design values with implicity, inspired by craft —
              we blend tradition with modern vision
              to create spaces where ideas feel at home.
            </p>

            
            <div className="flex gap-3 mt-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-white/10 backdrop-blur-sm 
                   border border-white/15 shadow-md
                   hover:bg-white/20 hover:shadow-lg hover:shadow-white/30
                   hover:-translate-y-0.5 hover:scale-110
                   transition-all duration-300 cursor-pointer"
                >
                  <Icon size={18} />
                </div>
              ))}
            </div>

          </div>


         
          <div>
            <h2 className="text-base text-lg font-semibold mb-3">Quick Links</h2>
            <ul className="relative opacity-90 transition-all duration-300 hover:opacity-100 
               hover:translate-x-1 
               after:content-[''] after:absolute after:left-0 after:-bottom-0.5 
               after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full">
              <li><a href="/" className="hover:opacity-150">Home</a></li>
              <li><a href="/about" className="hover:opacity-100">About</a></li>
              <li><a href="/services" className="hover:opacity-100">Services</a></li>
              <li><a href="/contact" className="hover:opacity-100">Contact</a></li>
            </ul>
          </div>

         
          <div>
            <h2 className="text-base text-lg font-semibold mb-3">Company</h2>
            <ul className="relative opacity-90 transition-all duration-300 hover:opacity-100 
               hover:translate-x-1 
               after:content-[''] after:absolute after:left-0 after:-bottom-0.5 
               after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full">
              <li><a href="/team" className="hover:opacity-100">Our Team</a></li>
              <li><a href="/careers" className="hover:opacity-100">Careers</a></li>
              <li><a href="/blog" className="hover:opacity-100">Blog</a></li>
              <li><a href="/terms" className="hover:opacity-100">Terms & Policy</a></li>
            </ul>
          </div>

          
          <div>
            <h2 className="text-base text-lg font-semibold mb-3">Resources</h2>
            <ul className="relative opacity-90 transition-all duration-300 hover:opacity-100 
               hover:translate-x-1 
               after:content-[''] after:absolute after:left-0 after:-bottom-0.5 
               after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full">
              <li><a href="/docs" className="hover:opacity-100">Documentation</a></li>
              <li><a href="/tutorials" className="hover:opacity-100">Tutorials</a></li>
              <li><a href="/faq" className="hover:opacity-100">FAQ</a></li>
              <li><a href="/support" className="hover:opacity-100">Support Center</a></li>
            </ul>
          </div>

          
          <div>
            <h2 className="text-base text-lg font-semibold mb-3">Newsletter</h2>
            <p className="text-l opacity-75 mb-2">
              Stay updated with our latest releases.
            </p>
            <div className="flex items-center gap-2">
              <Input
                type="email"
                placeholder="Email"
                className="bg-white/20 text-white placeholder:text-white/60"
              />
              <Button className="bg-white text-black hover:bg-gray-200">
                Join
              </Button>
            </div>
          </div>

          {/* Social Icons */}
          {/* <div>
            <h2 className="text-base top-20 font-semibold mb-3 mt-9">Connect</h2>
            <div className="flex gap-3 mt-1">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-white/10 backdrop-blur-sm 
             border border-white/15 shadow-md
             hover:bg-white/20 hover:shadow-lg hover:shadow-white/30
             hover:-translate-y-0.5 hover:scale-110
             transition-all duration-300 cursor-pointer"
                >
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div> */}

        </div>

       
        <p className="text-center mt-10 text-xs opacity-60">
          © {new Date().getFullYear()} Workspace. Crafted with purpose and care.
        </p>
      </div>
    </footer>
  );
}
