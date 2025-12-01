"use client";

import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import slide1 from "../../public/Banner/slide 1.jpg";
import slide2 from "../../public/Banner/slide 2.jpg";
import slide4 from "../../public/Banner/slide 4.jpg";
import AboutUs from "@/components/AboutUs";
import Creation from "@/components/Creation";
import Companies from "@/components/Companies";
import TryForFree from "@/components/TryforFree";
import Review from "@/components/Review";


interface Slide {
  id: number;
  image: StaticImageData;
  title: string;
  subtitle: string;
  button: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: slide1,
    title: "Discover Variations",
    subtitle: "Let each step carry you towards your dream projects.",
    button: "Request A Demo",
  },
  {
    id: 2,
    image: slide2,
    title: "Wander Freely",
    subtitle: "The world waits quietly until you arrive.",
    button: "Start your Journey",
  },
  {
    id: 3,
    image: slide4,
    title: "Find Your Space",
    subtitle: "Every steps you take, is important.",
    button: "Get Started",
  },
];


export default function Banner() {
  const [current, setCurrent] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
const router = useRouter();
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

 
  useEffect(() => {
    const handleScroll = () => setScrollOffset(window.scrollY * 0.3);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>

      <section className="relative h-[90vh] w-full overflow-hidden">
        
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-out ${current === index ? "opacity-100" : "opacity-0"
              }`}
            style={{
              transform: `translateY(${scrollOffset}px)`,
            }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}

       
        <div className="absolute inset-0 bg-black/10" />

        
        <div className="relative z-20 h-full flex items-center justify-center px-6 font-sans">


          <div
            className={`
                p-10 mx-auto w-full max-w-2xl text-center shadow-2xl transition-all duration-700
                rounded-xl backdrop-blur-md bg-white/10 border border-white/20
            `}
          >
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg transition-all duration-700">
              {slides[current].title}
            </h1>

            <p className="mt-4 text-gray-100 text-lg md:text-xl max-w-2xl transition-all duration-700">
              {slides[current].subtitle}
            </p>

 
            <button 
  className="mt-8 px-8 py-3 font-bold border-2 border-white-850 text-white 
  hover:bg-indigo-600 rounded-full shadow-xl hover:text-white transition-all duration-300 
  text-sm"
   onClick ={()=> router.push('/login')}>
   
  {slides[current].button}
</button>

          </div>
        </div>

        {/* SLIDER DOTS */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-3 w-3 rounded-full transition-all ${current === index ? "bg-white" : "bg-white/40"
                }`}
            />
          ))}
        </div>
      </section>

      <AboutUs />
      <Creation />
      <Companies />
      <TryForFree />
      <Review />
    </>


  );

}


