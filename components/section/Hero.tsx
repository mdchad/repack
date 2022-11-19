import React, { useEffect } from 'react'
import Image from 'next/image';
import Section from '@/components/ui/Sections/Section'
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

function hero() {
    const variants = {
        // slide from right
        hidden: { opacity: 0, x: 500 },
        visible: { opacity: 1, x: 0, transition: { duration: 1 } },
    }

    const control = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            control.start("visible");
        } else {
            // control.start("hidden");
        }
    }, [control, inView]);

    return (
        <Section id="hero">
            <div className="text-left flex flex-col items-start gap-4">
                <h1 className="lg:text-[49px] md:text-[39px] text-[25px] md:w-[75%] md:w-[50%]">
                    The Modern Toolkit for All Your Website Needs
                </h1>

                <p className="md:w-[60%] block font-thin">
                    With its <strong className="font-bold">all-in-one</strong> solution and modern toolkit, Repack is the perfect solution for your website design needs.
                </p>

                <div className="py-5">
                    <a href="#" className="bg-[#0E1714] text-white py-3 px-6 rounded-md font-bold">
                        Get Started
                    </a>
                </div>

                <div className="w-full flex justify-end">
                    <div className="md:w-[75%] lg:w-[50%]">
                        <motion.div
                            animate={{
                                y: [0, 10],
                                transition: { duration: 1, repeat: Infinity, repeatType: "reverse" },
                            }}
                        >
                            <Image src="/hero-img.png" alt="hero" layout="intrinsic" width={1000} height={500} />
                        </motion.div>
                    </div>
                </div>
            </div>
        </Section >
    )
}

export default hero;
