import { createRef, useEffect, useRef, useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import {
  ExclamationCircleIcon,
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon
} from '@heroicons/react/24/outline';
const name = require('@rstacruz/startup-name-generator');
import { AnimatePresence, motion, useInView, useScroll } from 'framer-motion';
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
  const [loading, setLoading] = useState(false);
  const [bodyReq, setBodyReq] = useState({
    values: '',
    words: '',
    type: ''
  });
  const [[page, direction], setPage] = useState([1, 0]);
  const [buttonLeftDisabled, setbuttonLeftDisabled] = useState(page === 1);
  const [buttonRightDisabled, setbuttonRightDisabled] = useState(
    page === data.length
  );

  const refArr: any = useRef([]);
  refArr.current = data.map((item, index) => {
    return refArr.current[index] || createRef();
  });

  const [brandName, setBrandName] = useState('');
  const [brandNameResult, setBrandNameResult] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      if (page !== 1) {
        setbuttonLeftDisabled(false);
      } else {
        setbuttonLeftDisabled(true);
      }

      if (page === data.length) {
        setbuttonRightDisabled(true);
      } else {
        setbuttonRightDisabled(false);
      }
    }, 800);
  }, [page]);

  const paginate = (newDirection: number) => {
    const currentPage = page + newDirection;

    if (currentPage < 1 || currentPage > data.length) {
      return;
    }

    // @ts-ignore
    refArr.current[currentPage - 1].current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start'
    });

    setPage([currentPage, newDirection]);
  };

  async function goToLastPage() {
    setLoading(true);
    const resultPage = document.querySelector('.display-answer');
    resultPage?.scrollIntoView({ behavior: 'smooth' });

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

  return (
    <section className="h-[calc(100vh-50px)] md:h-screen p-5">
      <div className="bg-white overflow-hidden rounded-lg w-full h-full">
        <section className="question">
          {data.map((item, index) => (
            <motion.div
              id={`${item.id}`}
              key={item.id}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className={`h-screen flex flex-1 grow flex-col justify-center items-center ${item.background}`}
              data-index={item.id}
              ref={refArr.current[item.id]}
            >
              <div className="w-full flex flex-col items-center justify-center rounded-lg h-screen">
                <label htmlFor={`field-${item.id}`}>{item.title}</label>
                <input
                  type="text"
                  id={`field-${index}`}
                  className="p-2 text-2xl lg:text-5xl bg-transparent border-none w-screen text-center focus:ring-0 text-black placeholder-[#F38A7A]/50"
                  onChange={(e) =>
                    setBodyReq({ ...bodyReq, [item.tag]: e.target.value })
                  }
                  placeholder={item.placeholder}
                  autoComplete="off"
                />

                {index === data.length - 1 && (
                  <button
                    className="mt-5 bg-[#F38A7A] text-white p-2 rounded-lg"
                    onClick={goToLastPage}
                  >
                    Generate
                  </button>
                )}
              </div>
            </motion.div>
          ))}

          <motion.div
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="h-screen w-full bg-white"
            data-index={data.length}
          >
            {!loading ? (
              <div className="display-answer grid place-content-start grid-cols-2 lg:grid-cols-3 gap-4 p-5">
                {brandNameResult.map((brandName, i) => (
                  <Link
                    href={`/dashboard/name-generator2/${brandName}`}
                    key={i}
                  >
                    <a className="bg-white shadow rounded-lg flex justify-center items-center p-6 hover:text-black hover:bg-[#F38A7A]/10">
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
          </motion.div>
        </section>

        <div className="absolute bottom-5 right-5 z-10 p-5 flex gap-3 button-navigation">
          <button
            type="button"
            className={
              `bg-gray-100 text-black rounded-lg p-5 text-center` +
              (buttonLeftDisabled ? ' opacity-50 cursor-not-allowed' : '')
            }
            onClick={() => paginate(-1)}
            disabled={buttonLeftDisabled}
          >
            <ArrowSmallLeftIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            className={
              `bg-gray-100 text-black rounded-lg p-5 text-center` +
              (buttonRightDisabled ? ' opacity-50 cursor-not-allowed' : '')
            }
            onClick={() => paginate(1)}
            disabled={buttonRightDisabled}
          >
            <ArrowSmallRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default NameGenerator;

NameGenerator.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);
