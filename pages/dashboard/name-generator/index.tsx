import { createRef, useEffect, useRef, useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import {
    ExclamationCircleIcon,
    ArrowSmallLeftIcon,
    ArrowSmallRightIcon
} from '@heroicons/react/24/outline';
const name = require('@rstacruz/startup-name-generator');
import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import LoadingDots from '@/components/ui/LoadingDots';

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
        tag: 'values',
        title: 'What do you want your brand name to signify in terms of values?',
        placeholder: 'e.g. trustworthy, innovative, etc.',
        background: 'bg-white-500'
    },
    {
        id: 1,
        tag: 'words',
        title: 'What are the keywords that describe your brand?',
        placeholder: 'e.g. tech, fashion, etc.',
        background: 'bg-white-500'
    },
    {
        id: 2,
        tag: 'type',
        title: 'What type of brand are you?',
        placeholder: 'e.g. product, service, etc.',
        background: 'bg-white-500'
    }
];

function NameGenerator() {
    const controls = useAnimation();
    const resultPage = useRef(null);
    const [loading, setLoading] = useState(false);
    const [bodyReq, setBodyReq] = useState({
        values: '',
        words: '',
        type: ''
    });
    const [[page, direction], setPage] = useState([1, 0]);
    const [buttonLeftDisabled, setbuttonLeftDisabled] = useState();
    const [buttonRightDisabled, setbuttonRightDisabled] = useState();

    const refArr: any = useRef([]);
    refArr.current = data.map((item, index) => {
        return refArr.current[index] || createRef();
    });
    const refInputArr: any = useRef([]);
    refInputArr.current = data.map((item, index) => {
        return refInputArr.current[index] || createRef();
    });

    const [brandName, setBrandName] = useState('');
    const [brandNameResult, setBrandNameResult] = useState([]);

    useEffect(() => {
        if (refInputArr.current) {
            refInputArr.current[0].current.focus()
        }
    }, [])

    async function paginate(newDirection: number, e: any) {
        e.preventDefault()
        const currentPage = page + newDirection;

        if (currentPage < 1 || currentPage > data.length) {
            return;
        }

        if (refArr.current[currentPage - 1]) {
            if (newDirection === 1) {
                await controls.start({
                    y: -refArr.current[currentPage - 1].current.offsetTop,
                    transition: { duration: 0.5 }
                });

                refInputArr.current[currentPage - 1].current.focus()
                setPage([currentPage, newDirection]);
            }

            if (newDirection === -1) {
                await controls.start({
                    y: -refArr.current[currentPage - 1].current.offsetTop,
                    transition: { duration: 0.5 }
                });

                refInputArr.current[currentPage - 1].current.focus()
                setPage([currentPage, newDirection]);
            }
        }
    }

    async function goToLastPage(e: any) {
        e.preventDefault()
        setLoading(true);

        document.querySelector('.question')?.classList.add('hidden');

        if (resultPage !== null) {
            await controls.start({
                // @ts-ignore
                y: -resultPage.current.offsetTop,
                transition: { duration: 0.5 }
            });

            document.querySelector('.button-navigation')?.classList.add('hidden');

            const res: Response = await fetch('/api/generate-name', {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                credentials: 'same-origin',
                body: JSON.stringify(bodyReq)
            });

            if (!res.ok) {
                console.log('Error in postData');

                throw Error(res.statusText);
            }

            const response = await res.json()
            setLoading(false);
            let result = name(brandName);

            // take the first 15 results
            result = result.slice(0, 8);

            setBrandNameResult(response.result);
        }
    }

    return (
        <section className="h-[calc(100vh-50px)] md:h-screen p-5">
            <div className="bg-white overflow-hidden rounded-lg w-full h-full">
                <motion.div animate={controls} className="h-screen w-full question">
                    {data.map((item, index) => (
                        <div key={item.id} className="w-full h-screen flex flex-col text-center items-center justify-center" ref={refArr.current[item.id]}>
                            <form onSubmit={(e) => index === data.length - 1 ? goToLastPage(e) : paginate(1, e)}>
                                <label htmlFor={`field-${item.id}`}>{item.title}</label>
                                <input
                                    type="text"
                                    ref={refInputArr.current[item.id]}
                                    id={`field-${index}`}
                                    className="p-2 text-2xl lg:text-5xl bg-transparent border-none text-center focus:ring-0 text-black placeholder-[#F38A7A]/50 w-full"
                                    onChange={(e) =>
                                        setBodyReq({ ...bodyReq, [item.tag]: e.target.value })
                                    }
                                    placeholder={item.placeholder}
                                    autoComplete="off"
                                />
                            </form>

                            {index === data.length - 1 && (
                                <button
                                    className="mt-5 bg-[#F38A7A] text-white p-2 rounded-lg"
                                    onClick={goToLastPage}
                                >
                                    Generate <code>↩︎</code>
                                </button>
                            )}
                        </div>
                    ))}
                </motion.div>

                {!loading ? (
                    <div className="display-answer w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-5 overflow-y-auto" ref={resultPage}>
                        {brandNameResult.map((brandName, i) => (
                            <Link
                                href={`/dashboard/name-generator/${encodeURIComponent(brandName)}`}
                                key={i}
                            >
                                <a className="bg-white shadow rounded-lg flex justify-center items-center p-6 hover:text-black hover:bg-[#F38A7A]/10 mb-5 text-center">
                                    {brandName}
                                </a>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex h-screen items-center justify-center">
                        <LoadingDots />
                    </div>
                )}

                <div className="absolute bottom-5 right-5 z-10 p-5 flex gap-3 button-navigation">
                    <button
                        type="button"
                        className={
                            `bg-gray-100 text-black rounded-lg p-5 text-center` +
                            (page === 1 ? ' opacity-50 cursor-not-allowed' : '')
                        }
                        onClick={(e) => paginate(-1, e)}
                        disabled={page === 1}
                    >
                        <ArrowSmallLeftIcon className="h-5 w-5" />
                    </button>

                    <button
                        type="button"
                        className={
                            `bg-gray-100 text-black rounded-lg p-5 text-center` +
                            (page === data.length ? ' opacity-50 cursor-not-allowed' : '')
                        }
                        onClick={(e) => paginate(1, e)}
                        disabled={page === data.length}
                    >
                        <ArrowSmallRightIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </section >
    );
}

export default NameGenerator;

NameGenerator.getLayout = (page: any) => (
    <DashboardLayout>{page}</DashboardLayout>
);
