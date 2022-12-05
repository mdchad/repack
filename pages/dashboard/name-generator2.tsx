import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { ExclamationCircleIcon, ArrowSmallLeftIcon, ArrowSmallRightIcon } from '@heroicons/react/24/outline';
const name = require('@rstacruz/startup-name-generator');
import { AnimatePresence, motion } from "framer-motion"
import { wrap } from "popmotion";


const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        };
    }
};

const data = [
    {
        title: 'What do you want your brand name to signify in terms of values?',
        placeholder: 'e.g. trustworthy, innovative, etc.',
    },
    {
        title: 'What are the keywords that describe your brand?',
        placeholder: 'e.g. tech, fashion, etc.',
    },
    {
        title: 'What type of brand are you?',
        placeholder: 'e.g. product, service, etc.',
    },
]

function NameGenerator() {
    const [loading, setLoading] = useState('');
    const [values, setValues] = useState('');
    const [keywords, setKeywords] = useState('');
    const [type, setType] = useState('');
    const [[page, direction], setPage] = useState([1, 0]);
    const [buttonLeftDisabled, setbuttonLeftDisabled] = useState(false as any);
    const [buttonRightDisabled, setbuttonRightDisabled] = useState(false as any);

    const [brandName, setBrandName] = useState('');
    const [brandNameResult, setBrandNameResult] = useState([]);

    const paginate = (newDirection: number) => {
        const currentPage = page + newDirection;

        if (currentPage < 1 || currentPage > data.length) {
            return;
        }

        setPage([currentPage, newDirection]);

        const element = document.querySelector(`[data-index="${currentPage}"]`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    function generateWords(e: any) {
        console.log(brandName);
        e.preventDefault();

        let result = name(brandName);
        setBrandNameResult(result);
    }

    function goToLastPage() {
        console.log('goToLastPage');

        const resultPage = document.querySelector('.display-answer');
        resultPage?.scrollIntoView({ behavior: 'smooth' });

        document.querySelector('.button-navigation')?.classList.add('hidden');
    }

    return (
        <section className="flex flex-col gap-5 p-5 h-[calc(100vh-50px)] md:h-full">
            <div className="h-full bg-white overflow-hidden rounded-lg">
                <section className="question w-full relative">
                    {
                        data.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="h-screen flex flex-col justify-center items-center"
                                data-index={index + 1}
                            >
                                <div className=" bg-white flex flex-col items-center justify-center rounded-lg">
                                    <label htmlFor={`field-${index}`}>{item.title}</label>
                                    <input type="text" id={`field-${index}`} className="p-2 text-2xl lg:text-5xl bg-transparent border-none w-full text-center focus:ring-0 text-black placeholder-[#F38A7A]/50" onChange={(e) => setValues(e.target.value)} placeholder={item.placeholder} autoComplete="off" />

                                    {
                                        index === data.length - 1 && (
                                            <button className="mt-5 bg-[#F38A7A] text-white p-2 rounded-lg" onClick={goToLastPage}>Generate</button>
                                        )
                                    }
                                </div>
                            </motion.div>
                        ))
                    }

                    <motion.div
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="h-screen flex flex-col justify-center items-center"
                        data-index={data.length + 1}
                    >
                        <div className="display-answer h-full bg-white flex flex-col items-center justify-center rounded-lg">
                            display result
                        </div>
                    </motion.div>
                </section>

                <div className="absolute bottom-5 right-5 z-10 p-5 flex gap-3 button-navigation">
                    <button type="button" className={`bg-gray-100 text-black rounded-lg p-5 text-center` + (buttonLeftDisabled ? ' opacity-50 cursor-not-allowed' : '')} onClick={() => paginate(-1)} disabled={buttonLeftDisabled}>
                        <ArrowSmallLeftIcon className="h-5 w-5" />
                    </button>

                    {buttonRightDisabled ? (
                        <button type="button" className="bg-gray-100 text-black rounded-lg p-5 cursor-not-allowed text-center" disabled onClick={() => paginate(-1)}>
                            <ArrowSmallRightIcon className="h-5 w-5" />
                        </button>
                    ) : (
                        <button className="bg-gray-200 text-black rounded-lg p-5" onClick={() => paginate(1)}>
                            <ArrowSmallRightIcon className="h-5 w-5" />
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}

export default NameGenerator;

NameGenerator.getLayout = (page: any) => (
    <DashboardLayout>{page}</DashboardLayout>
);
