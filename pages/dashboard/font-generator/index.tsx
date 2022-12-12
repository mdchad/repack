import DashboardLayout from '@/components/Layout/DashboardLayout';
import React, { useState, useRef, useEffect } from "react";
import { ArrowPathIcon, ChevronDoubleDownIcon, LinkIcon, MoonIcon, SunIcon, LockOpenIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import LoadingDots from '@/components/ui/LoadingDots';
import axios from 'axios';
import WebFont from 'webfontloader';

const fontGenerator: any = () => {
    let [categories, setCategories] = useState<any>([]);
    const [theme, setTheme] = useState<any>('light');
    const [fonts, setFonts] = useState<any>([]);
    const [ready, setReady] = useState<boolean>(false);

    const [headingCategory, setHeadingCategory] = useState<any>(null);
    const [headingFont, setHeadingFont] = useState<any>(null);
    const [headingStandart, setHeadingStandart] = useState<any>(null);
    const [headingImport, setHeadingImport] = useState<any>(null);
    const [headingFontUrl, setHeadingFontUrl] = useState<any>(null);
    const [headingFontSize, setHeadingFontSize] = useState<number>(32);

    const [bodyCategory, setBodyCategory] = useState<any>(null);
    const [bodyFont, setBodyFont] = useState<any>(null);
    const [bodyStandart, setBodyStandart] = useState<any>(null);
    const [bodyImport, setBodyImport] = useState<any>(null);
    const [bodyFontUrl, setBodyFontUrl] = useState<any>(null);
    const [bodyFontSize, setBodyFontSize] = useState<number>(18);

    const allCategories = (fonts: any) => {
        fonts.map((item: { category: any; }) => {
            if (!categories.includes(item.category)) {
                categories.push(item.category);
            }
        });

        setHeadingCategory(categories[1]);
        setBodyCategory(categories[0]);

        setHeadingFont(fontFilter(headingCategory));
        setBodyFont(fontFilter(bodyCategory));
    };

    const fontFilter = (category: any) => {
        // v1
        // // get random font from category base on Heading or Body
        // const filtered = fonts.filter((item: { category: any; }) => item.category === category);
        // const random = Math.floor(Math.random() * filtered.length);

        // console.log(filtered[random])
        // return filtered[random];

        // v2
        const fontFamilies = fonts.map((font: { family: any; }) => font.family);
        const filtered = fontFamilies.filter((font: any) => fonts.find((f: { family: any; }) => f.family === font).category === category);
        const randomIndex = Math.floor(Math.random() * filtered.length);
        const randomFont = filtered[randomIndex];

        return randomFont;
    };

    const generate = () => {
        const headingFont = fontFilter(headingCategory)
        const bodyFont = fontFilter(bodyCategory)

        // console.log(headingFont, ' & ' ,bodyFont)

        import('webfontloader').then(WebFontLoader => {
            WebFontLoader.load({
                timeout: 3000,
                google: {
                    families: [headingFont.replace(/ /g, "+"), bodyFont.replace(/ /g, "+")],
                },
                active: () => {
                    setHeadingFont(headingFont);
                    setBodyFont(bodyFont);
                }
            })
        })
    };

    useEffect(() => {
        const url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;

        axios.get(url)
            .then((res: any) => {
                setReady(true);
                setFonts(res.data.items);
                allCategories(res.data.items);
                // generate();
            })
            .catch((err: any) => {
                console.log(err);
            });
    }, []);

    return (
        <section>
            <div className="flex flex-col lg:flex-row gap-4 items-start p-5 ">
                <div className="border p-5 w-full lg:w-1/3 flex flex-col gap-4 rounded-lg bg-white">
                    <div className="flex items-end gap-3">
                        <div className="flex-1">
                            <label htmlFor="select_heading" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Heading {headingFont ? '- ' + headingFont : ''}</label>
                            <select
                                id="select_heading"
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 capitalize"
                                value={headingCategory || ''}
                                onChange={(e) => setHeadingCategory(e.target.value)}
                            >
                                {categories.map((item: any, index: number) => {
                                    return (
                                        // get selected from headingCategory
                                        <option key={index} value={item}>{item}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <a href="#" target="_blank" className="border rounded-lg block p-2">
                            <LinkIcon className="h-5 w-5 text-gray-400" />
                        </a>
                    </div>

                    <div className="flex items-end gap-3">
                        <div className="flex-1">
                            <label htmlFor="select_body" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Body {bodyFont ? '- ' + bodyFont : ''}</label>
                            <select
                                id="select_body"
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 capitalize"
                                value={bodyCategory || ''}
                                onChange={(e) => setBodyCategory(e.target.value)}
                            >
                                {categories.map((item: any, index: number) => {
                                    return (
                                        // get selected from headingCategory
                                        <option key={index} value={item}>{item}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <a href="#" target="_blank" className="border rounded-lg block p-2">
                            <LockOpenIcon className="h-5 w-5 text-gray-400" />
                        </a>
                    </div>

                    <div>
                        <button type="button" className="flex justify-center items-center gap-3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={generate}>
                            Generate {!ready ? <LoadingDots /> : null}
                        </button>
                    </div>
                </div>

                <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800 text-white'} flex-1 w-full rounded p-8 gap-4 flex flex-col`}>
                    <button
                        className="w-8 h-8 bg-blue-100 rounded-lg dark:bg-slate-800 flex items-center justify-center hover:ring-2 ring-blue-400 transition-all duration-300 focus:outline-none"
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        aria-label="Toggle Dark Mode"
                    >
                        {theme === 'light' ? (
                            <SunIcon className="text-blue-400 w-5 h-5" />
                        ) : (
                            <MoonIcon className="text-blue-500 w-5 h-5" />
                        )}
                    </button>

                    <div>
                        <span className="mb-4 text-4xl" style={{ fontFamily: headingFont }}>
                            The Importance of Typography in Web Design
                        </span>
                        <div className="flex flex-col gap-3" style={{ fontFamily: bodyFont }}>
                            <p>
                                Typography plays a crucial role in web design, as it helps to create a visual hierarchy, establish a tone and mood, and improve the overall user experience. Effective web typography involves choosing the right typefaces, font sizes, line lengths, and other elements to make the content legible, readable, and appealing on different devices and screen sizes.</p>
                            <p>
                                Good web typography requires an understanding of the technical limitations and possibilities of web browsers, as well as the needs and preferences of the target audience. It also involves an awareness of accessibility concerns, such as ensuring that the text can be easily read by people with visual impairments or dyslexia.
                            </p>
                            <p>
                                By considering typography in web design, designers can create websites that are visually appealing, easy to read, and engaging for the user. This can help to improve the user's experience and increase the chances of them staying on the website and interacting with the content.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {ready ? (
                <div className="flex flex-col gap-4 p-5 ">
                    <div className="flex flex-col items-center py-5">
                        <span className="mb-2 block">See examples</span>
                        <ChevronDoubleDownIcon className="h-5 w-5 animate-bounce" />
                    </div>

                    <div className="border p-5 w-full rounded-lg bg-white">
                        examples
                    </div>
                </div>
            ) : (
                <LoadingDots />
            )}
        </section>
    );
};

export default fontGenerator;
fontGenerator.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

function axious(url: string) {
    throw new Error('Function not implemented.');
}
