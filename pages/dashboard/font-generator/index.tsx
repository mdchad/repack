import DashboardLayout from '@/components/Layout/DashboardLayout';
import React, { useState, useRef, useEffect } from "react";
import { ChevronDoubleDownIcon } from '@heroicons/react/24/solid';
import LoadingDots from '@/components/ui/LoadingDots';
import axios from 'axios';

const fontGenerator: any = () => {
    const [fonts, setFonts] = useState<any>([]);
    const [ready, setReady] = useState<boolean>(false);
    let [categories, setCategories] = useState<any>([]);
    const [headingCategory, setHeadingCategory] = useState<any>(null);
    const [headingFont, setHeadingFont] = useState<any>(null);
    const [bodyCategory, setBodyCategory] = useState<any>(null);
    const [headingStandart, setHeadingStandart] = useState<any>(null);
    const [headingImport, setHeadingImport] = useState<any>(null);
    const [headingFontUrl, setHeadingFontUrl] = useState<any>(null);
    const [bodyStandart, setBodyStandart] = useState<any>(null);
    const [bodyImport, setBodyImport] = useState<any>(null);
    const [bodyFont, setBodyFont] = useState<any>(null);
    const [bodyFontUrl, setBodyFontUrl] = useState<any>(null);
    const [bodyFontSize, setBodyFontSize] = useState<number>(18);
    const [headingFontSize, setHeadingFontSize] = useState<number>(32);
    const [darkBackground, setDarkBackground] = useState<boolean>(false);

    useEffect(() => {
        const url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;

        axios.get(url)
            .then((res: any) => {
                setFonts(res.data.items);
                setReady(true);
                allCategories(res.data.items);
                // generate();
            })
            .then(() => {
            })
            .catch((err: any) => {
                console.log(err);
            });
    }, []);

    const allCategories = (fonts: any) => {
        fonts.map((item: { category: any; }) => {
            if (!categories.includes(item.category)) {
                // remove duplicates
                categories.push(item.category);

                // sort alphabetically
                // categories.sort(function (a: any, b: any) {
                //     if (a < b) {
                //         return -1;
                //     }
                //     if (a > b) {
                //         return 1;
                //     }
                //     return 0;
                // });
            }
        });



        setHeadingCategory(categories[0]);
        setBodyCategory(categories[1]);
    };

    console.log(headingCategory, bodyCategory);


    const fontFilter = (category: any) => {
        let tempFonts: any[] = [], font;

        fonts
            .filter((item: { category: any; }) => item.category == category)
            .map((obj: any) => {
                tempFonts.push(obj);
            });
        font = tempFonts[Math.floor(Math.random() * (tempFonts.length - 1) + 1)];
        return font;
    };

    const generate = () => {
        setHeadingFont(fontFilter(headingCategory));
        setBodyFont(fontFilter(bodyCategory));
        const googleUrl = "https://fonts.googleapis.com/specimen/";
        setHeadingFontUrl(
            googleUrl + headingFont.family.replace(/ /g, "+")
        );
        setBodyFontUrl(googleUrl + bodyFont.family.replace(/ /g, "+"));
        const link = document.createElement("link");
        link.id = "combined-font";
        link.href = `https://fonts.googleapis.com/css?family=${headingFont.family.replace(/ /g, "+")}|${bodyFont.family.replace(/ /g, "+")}`;
        link.rel = "stylesheet";
        document.head.appendChild(link);
    };


    return (
        <div className="flex flex-col lg:flex-row p-5 gap-5">

            <div className="bg-white p-5 rounded-lg overflow-hidden w-full xl:w-4/12">
                <div className="flex flex-col gap-3 mb-5">
                    <div className="w-full">
                        <label htmlFor="select_heading" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Heading</label>
                        <select id="select_heading" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 capitalize">
                            {categories.map((item: any, index: number) => {
                                return (
                                    // get selected from headingCategory
                                    <option key={index} value={item} selected={headingCategory == item}>{item}</option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="w-full">
                        <label htmlFor="select_body" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Body</label>
                        <select id="select_body" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 capitalize">
                            {categories.map((item: any, index: number) => {
                                return (
                                    // get selected from headingCategory
                                    <option key={index} value={item} selected={bodyCategory == item}>{item}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>

                <div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={generate}>
                        Generate
                    </button>
                </div>

            </div>

            {ready ? (
                <div>
                    <div className="flex flex-col lg:flex-row rounded-lg overflow-hidden">
                        <div className="bg-white p-8">
                            <div>
                                <h1 className="mb-4 text-2xl">The Importance of Typography in Web Design</h1>
                                <div className="flex flex-col gap-3">
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

                    <div className="animate-bounce flex flex-col items-center py-5">
                        <span>See examples</span>
                        <ChevronDoubleDownIcon className="h-5 w-5" />
                    </div>
                </div>
            ) : (
                <LoadingDots />
            )}
            <div>

            </div>


        </div>
    );
};

export default fontGenerator;
fontGenerator.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

function axious(url: string) {
    throw new Error('Function not implemented.');
}
