import DashboardLayout from '@/components/Layout/DashboardLayout';
import React, { useState, useRef, useEffect } from "react";
import { ArrowPathIcon, ChevronDoubleDownIcon, LinkIcon, MoonIcon, SunIcon, LockOpenIcon, LockClosedIcon, BookmarkIcon, AdjustmentsVerticalIcon } from '@heroicons/react/24/solid';
import LoadingDots from '@/components/ui/LoadingDots';
import axios from 'axios';
import WebFont from 'webfontloader';

const fontGenerator: any = () => {
    let [categories, setCategories] = useState<any>([]);
    const [theme, setTheme] = useState<any>('light');
    const [fonts, setFonts] = useState<any>([]);
    const [ready, setReady] = useState<boolean>(false);

    const [headingCategory, setHeadingCategory] = useState<string>('serif');
    const [headingFont, setHeadingFont] = useState<string>('');
    const [headingVariant, setHeadingVariant] = useState<any>([]);
    const [headingImport, setHeadingImport] = useState<any>(null);
    const [headingFontUrl, setHeadingFontUrl] = useState<any>(null);
    const [lockHeading, setLockHeading] = useState<boolean>(false);

    const [bodyCategory, setBodyCategory] = useState<string>('sans-serif');
    const [bodyFont, setBodyFont] = useState<any>(null);
    const [bodyVariant, setBodyVariant] = useState<any>([]);
    const [bodyImport, setBodyImport] = useState<any>(null);
    const [bodyFontUrl, setBodyFontUrl] = useState<any>(null);
    const [lockBody, setLockBody] = useState<boolean>(false);

    const [baseSize, setBaseSize] = useState<any>(16);
    const [lineHeight, setLineHeight] = useState<any>(1.75);
    const [adjustments, setAdjustments] = useState<boolean>(false);

    const headerCopyRef = useRef<any>(null);
    const bodyCopyRef = useRef<any>(null);

    const handleLockHeading = () => {
        setLockHeading(!lockHeading);
        // console.log('lockHeading: ', lockHeading)
    }

    const handleLockBody = () => {
        setLockBody(!lockBody);
        // console.log('lockBody: ', lockBody)
    }

    const handleLineHeight = (e: any) => {
        setLineHeight(e.target.value);
        bodyCopyRef.current.style.lineHeight = e.target.value;
    }

    const handleBaseSize = (e: any) => {
        // field cant go below 0    
        if (e.target.value < 0) {
            e.target.value = 0;
        }

        setBaseSize(e.target.value);

        const pxToEm = (px: any) => {
            return px / 16;
        }

        const headingEm = pxToEm(baseSize) * 2.5;
        const bodyEm = pxToEm(baseSize) * 1;

        headerCopyRef.current.style.fontSize = `${headingEm}em`;
        bodyCopyRef.current.style.fontSize = `${bodyEm}em`;
    }

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
        setReady(false);
        let heading = '';
        let body = '';

        if (!lockHeading) {
            heading = fontFilter(headingCategory);
            setHeadingFont(heading);
        } else {
            heading = headingFont;
        }

        if (!lockBody) {
            body = fontFilter(bodyCategory);
            setBodyFont(body);
        } else {
            body = bodyFont;
        }

        // get details of font from fonts
        const headingDetails = fonts.find((font: { family: any; }) => font.family === heading);
        // console.log(headingDetails)
        setHeadingVariant(headingDetails.variants);

        const bodyDetails = fonts.find((font: { family: any; }) => font.family === body);
        // console.log(bodyDetails)
        setBodyVariant(bodyDetails.variants);

        const headingVariant = headingDetails.variants.map((variant: any) => {
            return variant.replace(/ /g, ",");
        }).join(";");

        const bodyVariant = bodyDetails.variants.map((variant: any) => {
            return variant.replace(/ /g, ",");
        }).join(";");

        // combine heading + variants
        const headingFamily = `${heading.replace(/ /g, "+")}:${headingVariant}`;
        const bodyFamily = `${body.replace(/ /g, "+")}:${bodyVariant}`;

        // console.log('heading variant: ' + headingFamily)
        // console.log('body variant: ' + bodyFamily)

        import('webfontloader').then(WebFontLoader => {
            WebFontLoader.load({
                timeout: 2000,
                google: {
                    // families: [headingFamily]
                    families: [headingFamily, bodyFamily],
                },
                active: () => {
                    setReady(true);

                    setHeadingImport(`<style>
                    @import url('https://fonts.googleapis.com/css2?family=${headingFamily}&display=swap');
                    </style>`);
                    setBodyImport(`<style>
                    @import url('https://fonts.googleapis.com/css2?family=${bodyFamily}&display=swap');
                    </style>`);

                    setHeadingFontUrl(`<link rel="preconnect" href="https://fonts.googleapis.com">
                                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                                    <link href="https://fonts.googleapis.com/css2?family=${headingFamily}&display=swap" rel="stylesheet"></link>`);
                    setBodyFontUrl(`<link rel="preconnect" href="https://fonts.googleapis.com">
                                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                                    <link href="https://fonts.googleapis.com/css2?family=${bodyFamily}&display=swap" rel="stylesheet"></link>`);
                }
            })
        })
    };

    useEffect(() => {
        const url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
        console.log('url: ', url)

        axios.get(url)
            .then((res: any) => {
                // setReady(true);
                setFonts(res.data.items);
                allCategories(res.data.items);
                handleBaseSize({ target: { value: 16 } });
            })
            .catch((err: any) => {
                console.log(err);
            });
    }, []);

    return (
        <section>
            <div className="flex flex-col lg:flex-row gap-4 items-start p-5 ">
                <div className="p-5 w-full lg:w-1/3 flex flex-col gap-4 rounded-lg bg-white">
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
                        <div>
                            <button onClick={handleLockHeading} className="border rounded-lg block p-2">
                                {lockHeading ? <LockClosedIcon className="h-5 w-5 text-gray-400" /> : <LockOpenIcon className="h-5 w-5 text-gray-400" />}
                            </button>
                        </div>
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
                        <div>
                            <button onClick={handleLockBody} className="border rounded-lg block p-2" disabled={bodyCategory ? false : true}>
                                {lockBody ? <LockClosedIcon className="h-5 w-5 text-gray-400" /> : <LockOpenIcon className="h-5 w-5 text-gray-400" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            className="flex justify-center items-center gap-3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                            onClick={generate}
                            disabled={lockHeading && lockBody ? true : false}
                        >
                            Generate
                        </button>

                        <button
                            className="w-8 h-8 bg-gray-100 rounded-lg dark:bg-slate-800 flex items-center justify-center hover:ring-2 ring-gray-400 transition-all duration-300 focus:outline-none"
                        >
                            <BookmarkIcon className="h-5 w-5 text-gray-400" />
                        </button>

                        <button
                            className="w-8 h-8 bg-gray-100 rounded-lg dark:bg-slate-800 flex items-center justify-center hover:ring-2 ring-gray-400 transition-all duration-300 focus:outline-none"
                            onClick={() => setAdjustments(!adjustments)}
                        >
                            <AdjustmentsVerticalIcon className="h-5 w-5 text-gray-400" />
                        </button>
                    </div>

                    {adjustments ? (
                        <div className="flex flex-col gap-3">
                            <div className='flex items-end gap-3'>
                                <div className=''>
                                    <label htmlFor="baseSize" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Base Size
                                        {/* {baseSize ? '- ' + baseSize : ''} */}
                                    </label>
                                    <input id="baseSize" type="number" className="w-full" value={baseSize} onChange={(e) => handleBaseSize(e)} />
                                </div>
                                <span className='text-gray-400'>
                                    px (100%/1em)
                                </span>
                            </div>

                            <div className='flex items-end gap-3'>
                                <div className=''>
                                    <label htmlFor="lineHeight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Line Height
                                        {/* {lineHeight ? '- ' + lineHeight : ''} */}
                                    </label>
                                    <input id="lineHeight" type="number" className="w-full" value={lineHeight} onChange={(e) => handleLineHeight(e)} step="0.01" />
                                </div>
                            </div>
                        </div>
                    ) : null}

                </div>

                <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800 text-white'} flex-1 w-full rounded p-8 gap-4 flex flex-col`}>
                    <button
                        className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:ring-2 ring-blue-400 transition-all duration-300 focus:outline-none"
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        aria-label="Toggle Dark Mode"
                    >
                        {theme === 'light' ? (
                            <SunIcon className="text-gray-400 w-5 h-5" />
                        ) : (
                            <MoonIcon className="text-gray-400 w-5 h-5" />
                        )}
                    </button>

                    <div>
                        <h2 className='mb-4' style={{ fontFamily: headingFont + ',' + headingCategory }} ref={headerCopyRef}>
                            The Importance of Typography in Web Design
                        </h2>

                        <div className="flex flex-col gap-3" style={{ fontFamily: bodyFont }} ref={bodyCopyRef}>
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
                    <div className="flex flex-col items-center">
                        {/* <span className="mb-2 block">See examples</span> */}
                        <ChevronDoubleDownIcon className="h-5 w-5 animate-bounce" />
                    </div>

                    <h3 className="text-center text-3xl py-5">Styles</h3>

                    <div className="flex flex-col lg:flex-row items-start gap-3">
                        <div className='rounded-lg bg-white p-5 flex-1 w-full'>
                            <h3 className="text-center mb-5">{headingFont}</h3>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                {headingVariant && headingVariant.map((variant: any, index: number) => (
                                    <div
                                        className="text-black p-5 shadow text-center h-58 w-58 rounded-lg"
                                        key={index}
                                    >
                                        <span className="text-5xl lg:text-9xl block"
                                            style={{
                                                fontFamily: headingFont + ',' + headingCategory,
                                                fontWeight: (variant.includes('500') || variant.includes('600') || variant.includes('700') || variant.includes('800') || variant.includes('900')) ? variant.replace('italic', '') : 'normal',
                                                // if variant text has the word italic in it, set the font style to italic
                                                fontStyle: variant.includes('italic') ? 'italic' : 'normal',
                                            }}
                                        >
                                            Aa
                                        </span>
                                        <span className="text-sm">
                                            {(variant.includes('italic')) ? variant.replace(/\b/g, ' $&') : variant}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='rounded-lg bg-white p-5 flex-1 w-full'>
                            <h3 className="text-center mb-5">{bodyFont}</h3>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                {bodyVariant && bodyVariant.map((bodyVariant: any, index: number) => (
                                    <div
                                        className="text-black p-5 shadow text-center h-58 w-58 rounded-lg"
                                        key={index}
                                    >
                                        <span className="text-5xl lg:text-9xl block"
                                            style={{
                                                fontFamily: bodyFont + ',' + bodyCategory,
                                                fontWeight: (bodyVariant.includes('500') || bodyVariant.includes('600') || bodyVariant.includes('700') || bodyVariant.includes('800') || bodyVariant.includes('900')) ? bodyVariant.replace('italic', '') : 'normal',
                                                fontStyle: bodyVariant.includes('italic') ? 'italic' : 'normal',
                                            }}
                                        >
                                            Aa
                                        </span>
                                        <span className="text-sm">
                                            {(bodyVariant.includes('italic')) ? bodyVariant.replace(/\b/g, ' $&') : bodyVariant}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <h3 className="text-center text-3xl py-5">Characther Set (Normal)</h3>

                    <div className="flex flex-col lg:flex-row items-start gap-3">
                        <div className='rounded-lg bg-white p-5 flex-1 w-full'>
                            <h3 className="mb-5">{headingFont}</h3>

                            <div
                                style={{
                                    fontFamily: headingFont + ',' + headingCategory,
                                    fontWeight: 'normal'
                                }}
                                className="text-2xl lg:text-3xl flex flex-col gap-5"
                            >
                                <div>
                                    <h5 className="text-sm text-gray-400 mb-4">Uppercase</h5>
                                    <span>A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</span>
                                </div>
                                <div>
                                    <h5 className="text-sm text-gray-400 mb-4">Lowercase</h5>
                                    <span>a b c d e f g h i j k l m n o p q r s t u v w x y z</span>
                                </div>
                                <div>
                                    <h5 className="text-sm text-gray-400 mb-4">Numbers</h5>
                                    <span>0 1 2 3 4 5 6 7 8 9</span>
                                </div>
                                <div>
                                    <h5 className="text-sm text-gray-400 mb-4">Special Characters</h5>
                                    <span>{`! @ # $ % ^ & * ( ) - + = [ ] { } | / . < > ? : "`}</span>
                                </div>
                                <div>
                                    <h5 className="text-sm text-gray-400 mb-4">Punctuation</h5>
                                    <span>. , ! ? ; : "</span>
                                </div>
                            </div>
                        </div>

                        <div className='rounded-lg bg-white p-5 flex-1 w-full'>
                            <h3 className="mb-5">{bodyFont}</h3>

                            <div
                                style={{
                                    fontFamily: bodyFont + ',' + bodyCategory,
                                    fontWeight: 'normal'
                                }}
                                className="text-2xl lg:text-3xl flex flex-col gap-5"
                            >
                                <div>
                                    <h5 className="text-sm text-gray-400 mb-4">Uppercase</h5>
                                    <span>A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</span>
                                </div>
                                <div>
                                    <h5 className="text-sm text-gray-400 mb-4">Lowercase</h5>
                                    <span>a b c d e f g h i j k l m n o p q r s t u v w x y z</span>
                                </div>
                                <div>
                                    <h5 className="text-sm text-gray-400 mb-4">Numbers</h5>
                                    <span>0 1 2 3 4 5 6 7 8 9</span>
                                </div>
                                <div>
                                    <h5 className="text-sm text-gray-400 mb-4">Special Characters</h5>
                                    <span>{`! @ # $ % ^ & * ( ) - + = [ ] { } | / . < > ? : "`}</span>
                                </div>
                                <div>
                                    <h5 className="text-sm text-gray-400 mb-4">Punctuation</h5>
                                    <span>. , ! ? ; : "</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-center text-3xl py-5">Use on the web</h3>

                    <div className="flex flex-col lg:flex-row items-start gap-3 break-words">
                        <div className='rounded-lg bg-white p-5 flex-1 w-full lg:w-1/2'>
                            <h3 className="mb-5">{headingFont}</h3>

                            <div className="flex flex-col gap-5">
                                <div>
                                    <h5 className="text-sm text-gray-400 mb-4">{`To embed a font, copy the code into the <head> of your html`}</h5>
                                    <div className="whitespace-pre-line p-5 bg-gray-100 rounded-lg text-sm">
                                        {headingFontUrl}
                                    </div>
                                </div>

                                <div>
                                    <h5 className="text-sm text-gray-400 mb-4">Uppercase</h5>
                                    <div className="whitespace-pre-line p-5 bg-gray-100 rounded-lg text-sm">
                                        {headingImport}
                                    </div>
                                </div>

                                <div>
                                    <h5 className="text-sm text-gray-400 mb-4">CSS rules to specify families</h5>
                                    <div className="whitespace-pre-line p-5 bg-gray-100 rounded-lg text-sm">
                                        font-family: '{headingFont + "', " + headingCategory};
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='rounded-lg bg-white p-5 flex-1 w-full lg:w-1/2'>
                            <h3 className="mb-5">{bodyFont}</h3>

                            <div className="flex flex-col gap-5">
                                <div>
                                    <h5 className="text-sm text-gray-400 mb-4">{`To embed a font, copy the code into the <head> of your html`}</h5>
                                    <div className="whitespace-pre-line p-5 bg-gray-100 rounded-lg text-sm">
                                        {bodyFontUrl}
                                    </div>
                                </div>

                                <div>
                                    <h5 className="text-sm text-gray-400 mb-4">Uppercase</h5>
                                    <div className="whitespace-pre-line p-5 bg-gray-100 rounded-lg text-sm">
                                        {bodyImport}
                                    </div>
                                </div>

                                <div>
                                    <h5 className="text-sm text-gray-400 mb-4">CSS rules to specify families</h5>
                                    <div className="whitespace-pre-line p-5 bg-gray-100 rounded-lg text-sm">
                                        font-family: '{bodyFont + "', " + bodyCategory};
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                null
            )
            }
        </section >
    );
};

export default fontGenerator;
fontGenerator.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

function axious(url: string) {
    throw new Error('Function not implemented.');
}
