"use client";


import Image from 'next/image';
import bg from "../../public/About/bg.jpg";
import { useRouter } from 'next/navigation';


const AboutUs = () => {
    const router = useRouter();


    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    {/* <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                        Our Story
                    </h2> */}
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Pioneering Innovation and Creativity
                    </p>
                </div>

                <div className="mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                        
                        <div className="space-y-6">
                            <p className="text-xl text-bold text-italic text-black-600 leading-relaxed">
                                Founded on the belief that environment shapes output, we created more than just office space—we built a hub for productivity and collaborative growth. Our journey began with recognizing the need for flexible, beautifully designed, and technologically advanced workspaces that inspire their inhabitants.
                                Today, our community includes startups, freelancers, and established enterprises who choose us for our premium amenities, seamless operations, and vibrant networking events. We provide the infrastructure and support needed for businesses to thrive, allowing you to focus purely on your mission and innovation.
                            </p>

                            <div className="pt-4">
                                <a
                                    className="font-semibold border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all 
                                    duration-300 rounded-lg px-4 py-1.5 text-sm"
                                    onClick={() => router.push('/login')}>
                                    Start Your Work
                                </a>

                            </div>
                        </div>

                        {/* ------ RIGHT SIDE : IMG ----- */}
                        <div className="relative h-96 rounded-lg shadow-xl overflow-hidden">
                            <Image
                                src={bg}
                                alt="Modern, collaborative workspace interior."
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;