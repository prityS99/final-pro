
"use client";

import Image from "next/image";
import logo1 from "../../public/Companies/logo 1.jpeg";
import logo2 from "../../public/Companies/logo 2.webp";
import logo3 from "../../public/Companies/logo 3.jpg";
import logo4 from "../../public/Companies/logo 4.png";
import logo5 from "../../public/Companies/logo 5.png";
import logo6 from "../../public/Companies/logo 6.png";

const logos = [
  { src: logo1, alt: "Company 1" },
  { src: logo2, alt: "Company 2" },
  { src: logo3, alt: "Company 3" },
  { src: logo4, alt: "Company 4" },
  { src: logo5, alt: "Company 5" },
  { src: logo6, alt: "Company 6" },
];

export default function Companies() {
  return (
    <section className="py-16 w-full mb-8 bg-gray-50">
      <h2 className="text-center text-4xl font-bold font-semibold mb-20">
        Companies We’ve Worked With
      </h2>

      <div className="overflow-hidden w-full">
        <div className="flex items-center gap-12 animate-infinite-scroll">
          
          {logos.map((logo, i) => (
            <Image
              key={i}
              src={logo.src}
              alt={logo.alt}
              width={150}
              height={80}
              className="object-contain w-[120px] sm:w-[150px]"
            />
          ))}

         
          {logos.map((logo, i) => (
            <Image
              key={`dup-${i}`}
              src={logo.src}
              alt={logo.alt}
              width={150}
              height={80}
              className="object-contain w-[120px] sm:w-[150px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
