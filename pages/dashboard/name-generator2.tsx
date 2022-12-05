import { createRef, useEffect, useRef, useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { ExclamationCircleIcon, ArrowSmallLeftIcon, ArrowSmallRightIcon } from '@heroicons/react/24/outline';
const name = require('@rstacruz/startup-name-generator');
import { AnimatePresence, motion, useInView, useScroll } from 'framer-motion';

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
        id: 0,
        title: 'What do you want your brand name to signify in terms of values?',
        placeholder: 'e.g. trustworthy, innovative, etc.',
    },
    {
        id: 1,
        title: 'What are the keywords that describe your brand?',
        placeholder: 'e.g. tech, fashion, etc.',
    },
    {
        id: 2,
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
    const [buttonLeftDisabled, setbuttonLeftDisabled] = useState(page === 1);
    const [buttonRightDisabled, setbuttonRightDisabled] = useState(page === data.length);


    const refArr: any = useRef([])
    refArr.current = data.map((item, index) => {
        return refArr.current[index] || createRef();
    })

    const [brandName, setBrandName] = useState('');
    const [brandNameResult, setBrandNameResult] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            if (page !== 1) {
                setbuttonLeftDisabled(false);
            }

            if (page === data.length) {
                setbuttonRightDisabled(true)
            }
            //
            if (page === 1) {
                setbuttonLeftDisabled(true);
                setbuttonRightDisabled(false)
            }
        }, 600)
    }, [page]);

    const paginate = (newDirection: number) => {
        const currentPage = page + newDirection;

        if (currentPage < 1 || currentPage > data.length) {
            return;
        }

        // @ts-ignore
        refArr.current[currentPage - 1].current.scrollIntoView({ behavior: 'smooth' })
        setPage([currentPage, newDirection]);
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
    }

    return (
        <section className="h-full overflow-hidden relative">
            {/*<AnimatePresence exitBeforeEnter onExitComplete={handExitComplete}>*/}
            <div className="h-screen flex flex-row flex-wrap">
                <section className="question w-full h-screen relative overflow-hidden">
                    {
                        data.map((item, index) => (
                            <motion.div
                                id={`${item.id}`}
                                key={item.id}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="h-full lg:h-screen p-5 w-full page-{index}"
                                data-index={item.id}
                                ref={refArr.current[item.id]}
                            >
                                <div className="h-full bg-white flex flex-col items-center justify-center rounded-lg">
                                    <label htmlFor={`field-${item.id}`}>{item.title}</label>
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

                    <div className="fixed bottom-5 right-5 z-10 p-5 flex gap-3">
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
                </section>

                <section className="display-answer h-full w-full p-5">
                    <div className="h-full bg-white flex flex-col items-center justify-center rounded-lg">
                        display result
                    </div>
                </section>
            </div>
            {/*</AnimatePresence>*/}

            <div className="flex flex-col overflow-hidden mb-3 gap-3 p-5 hidden">
                <div className="flex flex-col">
                    <span className="text-lg font-light">Brand Name generator</span>
                    <span className="text-sm font-normal">Let's find out more about your brand.</span>
                </div>

                <div className="text-xl">
                    <form onChange={generateWords}>
                        My brand focuses on ___________ and strives to embody _________ values. It is unique because of _________, and I want it to represent __________ and communicate the message of _______. I want customers to experience _______ when interacting with my brand, and I would like it to be associated with words such as _______.
                        {/* My brand is <input type="text" placeholder="type of brand" /> that stands for ___(values)___ and conveys ___(message)___ to my customers, making them feel ___(feeling)___. I am unique because ___(characteristics)___ */}
                        {/* Our company mission is to <input type="text" onChange={(e) => setBrandName(e.target.value)} /> . Our brand identity is defined by five words: <input type="text" onChange={(e) => setBrandName(e.target.value)} /> . Our value proposition is that our products and services <input type="text" onChange={(e) => setBrandName(e.target.value)} />. */}
                    </form>
                </div>

                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="submit"
                //   onClick={(e) => generateWords(e)}
                >
                    Generate
                </button>

                <div className="w-full max-w-5xl p-5 pb-10 mx-auto mb-10 gap-5 columns-3 space-y-5">
                    {brandNameResult.map((result, i) => (
                        <div key={i} className="p-5 border rounded text-center">
                            <div className="min-w-0 flex-1">
                                <a href="#">
                                    <p className="truncate text-sm text-gray-500">{result}</p>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 items-start hidden">
                <div className="bg-gray border p-5 w-full lg:w-1/3 flex flex-col gap-4 rounded">
                    <div>
                        <cite className="text-lg not-italic font-bold">
                            Startup Name Generator
                        </cite>
                        <p>
                            Generate cool, creative, and catchy names for your startup in
                            seconds.
                        </p>
                    </div>

                    <form className="flex flex-col gap-4" onSubmit={generateWords}>
                        <div className="">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Seed words
                            </label>
                            <input
                                onChange={(e) => setBrandName(e.target.value)}
                                type="text"
                                id="name"
                                aria-describedby="helper-text-explanation"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="eg. fit, exercise, gym"
                                required
                            />
                        </div>

                        <div className="">
                            <label
                                htmlFor="message"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Product Description
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Explain here to the AI what your product (or service) is about. Rewrite to get different results."
                                disabled
                            ></textarea>
                        </div>

                        <div className="flex gap-2 items-center">
                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                            <p className="text-gray-500 text-[.7em]">
                                Each generate will cost a token
                            </p>
                        </div>

                        <button
                            type="submit"
                            //   onClick={(e) => generateWords(e)}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Generate
                        </button>
                    </form>
                </div>

                <div className="flex-1 w-full bg-white border h-screen rounded p-5 gap-4 flex flex-col">
                    <span className="block text-sm text-center text-gray-500">
                        Generate results by filling up the form on the left and clicking on
                        "Generate".
                    </span>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4 overflow-auto">
                        {brandNameResult.map((person, i) => (
                            <div
                                key={i}
                                className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                            >
                                <div className="min-w-0 flex-1">
                                    <a href="#">
                                        <span className="absolute inset-0" aria-hidden="true" />
                                        <p className="truncate text-sm text-gray-500">{person}</p>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NameGenerator;

NameGenerator.getLayout = (page: any) => (
    <DashboardLayout>{page}</DashboardLayout>
);
