import React, { useEffect } from 'react'
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

type Props = {
    children: React.ReactNode,
    className?: string,
    id?: string,
}

function Section({ children, id }: Props) {
    const variants = {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
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
        <section className="py-20" id={id}>
            <motion.div
                className="box"
                ref={ref}
                variants={variants}
                initial="hidden"
                animate={control}
            >
                <div className="mx-auto max-w-7xl px-6">
                    {children}
                </div>
            </motion.div>
        </section>
    )
}

export default Section