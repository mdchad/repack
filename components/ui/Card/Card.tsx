import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type Props = {
  children: React.ReactNode;
  className?: string;
};

function Card({ children, className }: Props) {
  const variants = {
    hidden: { transform: 'translateY(100px)' },
    visible: { transform: 'translateY(0px)', transition: { duration: 1 } }
  };

  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start('visible');
    } else {
      // control.start("hidden");
    }
  }, [control, inView]);

  return (
    <motion.div
      className={className}
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={control}
    >
      <div className="flex flex-col gap-6 p-6 items-center justify-start bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 h-full">
        {children}
      </div>
    </motion.div>
  );
}

export default Card;
