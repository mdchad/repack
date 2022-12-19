import DashboardLayout from '@/components/Layout/DashboardLayout';
import React, { useState, useRef, useEffect } from 'react';
import chroma from 'chroma-js';
import { useRouter } from 'next/router';
import axios from 'axios';
import TextLayout from '@/components/ui/Dashboard/BrandGuide/TextLayout';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import LoadingDots from '@/components/ui/LoadingDots';

const GeneratePalette = () => {
    const supabase = useSupabaseClient();
    const user = useUser();
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [savedColor, setSavedColor] = useState<any>([]);
    const [savedFont, setSavedFont] = useState<any>([]);

    const [palette, setPalette] = useState([]);
    const [headingText, setHeadingText] = useState('');
    const [bodyText, setBodyText] = useState('');

    const [headingCategory, setHeadingCategory] = useState<string>('serif');
    const [headingFont, setHeadingFont] = useState<string>('');
    const [headingVariant, setHeadingVariant] = useState<any>([]);

    const [bodyCategory, setBodyCategory] = useState<string>('sans-serif');
    const [bodyFont, setBodyFont] = useState<any>(null);
    const [bodyVariant, setBodyVariant] = useState<any>([]);

    const allFonts = useRef<any>([]);
    const heading = useRef<any>([]);
    const body = useRef<any>([]);
    // const savedColor = useRef<any>([]);
    // const savedFont = useRef<any>([]);

    useEffect(() => {
        getSavedColor();
        getSavedFont();
    }, []);

    async function getSavedColor() {

        let { data: favourites, error }: any = await supabase
            .from('favourites')
            .select('*')
            .eq('user_id', user?.id)
            .eq('subtype', 'colour')
            .order('created_at', { ascending: false });

        favourites = favourites?.map((favourite: any) => {
            return favourite.saved.value;
        });

        setSavedColor(favourites);
    }

    async function getSavedFont() {
        let { data: favourites, error }: any = await supabase
            .from('favourites')
            .select('*')
            .order('created_at', { ascending: false })
            .eq('user_id', user?.id)
            .eq('subtype', 'font');

        favourites = favourites?.map((favourite: any) => {
            return favourite.saved.value;
        });

        setSavedFont(favourites);
    }

    // check if there's param
    useEffect(() => {
        const url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;

        axios.get(url)
            .then((res: any) => {
                allFonts.current = res.data.items;

                if (router.query.colors) {
                    heading.current = router.query.fonts ? (router.query.fonts as string).split('-')[0] : '';
                    body.current = router.query.fonts ? (router.query.fonts as string).split('-')[1] : '';

                    const headingDetails = getFontDtailsByName(heading.current);
                    const bodyDetails = getFontDtailsByName(body.current);

                    setHeadingText(headingDetails.family);
                    setBodyText(bodyDetails.family);

                    generateFont(heading.current, body.current);
                } else {
                    // no params
                    // heading.current = allFonts.current[Math.floor(Math.random() * allFonts.current.length)].family;
                    // body.current = allFonts.current[Math.floor(Math.random() * allFonts.current.length)].family;

                    // setHeadingText(heading.current);
                    // setBodyText(body.current);

                    // generateFont(heading.current, body.current);
                }
            })
            .catch((err: any) => {
                console.log(err);
            });

        if (router.query.colors) {
            let colors = router.query.colors as any;
            colors ? colors = colors.split('-').map((color: any) => `#${color}`) : colors = [];

            setPalette(colors);
        }

        if (router.query.fonts) {
            let fonts = router.query.fonts as any;
            fonts ? fonts = fonts.split('-') : fonts = [];

            allFonts.current = fonts;
        }

    }, [router.query.colors, router.query.fonts]);

    // console.log(palette)

    const generateScale = (color: any, steps: any) => {
        const shades = chroma.scale([chroma(color).luminance(0.15, 'hsl'), chroma(color).luminance(0.9, 'hsl')])
            // .scale()
            .correctLightness()
            .colors(steps);

        return shades;
    };

    const generateFont = (heading: any, body: any) => {

        const headingDetails = getFontDtailsByName(heading);
        const bodyDetails = getFontDtailsByName(body);

        const headingCategory = headingDetails.category.split(' ')[0];
        const bodyCategory = bodyDetails.category.split(' ')[0];

        const headingVariant = getFontVariant(headingDetails);
        const bodyVariant = getFontVariant(bodyDetails);

        const headingFamily = getFontFamily(heading, headingVariant);
        const bodyFamily = getFontFamily(body, bodyVariant);

        import('webfontloader').then(WebFontLoader => {
            WebFontLoader.load({
                timeout: 2000,
                google: {
                    // families: [headingFamily]
                    families: [headingFamily, bodyFamily],
                },
                active: () => {
                    setHeadingFont(heading);
                    setHeadingVariant(headingDetails.variants);
                    setHeadingCategory(headingCategory);

                    setBodyFont(body);
                    setBodyVariant(bodyDetails.variants);
                    setBodyCategory(bodyCategory);

                    // router.push({
                    //     pathname: '',
                    //     query: {
                    //         font: `${heading}-${body}`,
                    //     }
                    // });
                }
            })
        })
    }

    const getFontDtailsByName = (name: any) => {
        const font = allFonts.current.find((font: { family: any; }) => font.family === name);
        return font;
    }

    const getFontVariant = (fontDetails: any) => {
        return fontDetails.variants.map((variant: any) => {
            return variant.replace(/ /g, ",");
        }).join(";");
    }

    const getFontFamily = (type: any, variant: any) => {
        return `${type.replace(/ /g, "+")}:${variant}`;
    }

    const updatePalette = (color: any) => {
        const colors = color.split(',');
        setPalette(colors);

        setLoading(true);
    }

    const updateFont = (font: any) => {
        const fonts = font.split(',');

        const heading = fonts[0];
        const body = fonts[1];

        generateFont(heading, body);
        setLoading(true);
    }

    return (
        <div className="p-5">

            <div className="flex flex-col gap-10">
                <div className="bg-white p-5 rounded-lg overflow-hidden">
                    <div className="flex items-end gap-3">
                        <div className="flex-1">
                            <label htmlFor="select_color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Colors:</label>
                            <select
                                id="select_color"
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 capitalize"
                                // value={savedColor ? savedColor[0] : ''}
                                onChange={(e) => updatePalette(e.target.value)}
                            >
                                {savedColor.map((color: any, index: any) => (
                                    <option key={index} value={color}>{color}</option>
                                ))}

                            </select>
                        </div>

                        <div className="flex-1">
                            <label htmlFor="select_font" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fonts:</label>
                            <select
                                id="select_font"
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 capitalize"
                                // value={''}
                                onChange={(e) => updateFont(e.target.value)}
                            >
                                {savedFont.map((font: any) => {
                                        return <option key={font} value={font}> {font} </option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>

                {!loading ? <LoadingDots /> : (
                    <div className="bg-white p-5 rounded-lg overflow-hidden">
                        <div className="flex flex-col gap-10 container mx-auto">

                            <section className="flex flex-col gap-5">
                                <h2 className='text-3xl text-center'>Style Guide</h2>
                                <div className="relative flex items-center justify-center">
                                    <span className="font-bold text-gray-200 text-9xl mr-32">01</span>
                                    <h3 className='text-xl absolute'>Color Palette</h3>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                    {palette.map((color, index) => (
                                        <div key={index} className="flex">
                                            <div className="w-full lg:h-80" style={{ background: color }}>{''}</div>

                                            <div className="flex flex-col">
                                                {generateScale(color, 6).map((shade, index) => (
                                                    <div key={index} className="w-16 h-12 lg:h-full" style={{ background: shade }}>{''}</div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <hr />

                            <section className="flex flex-col gap-5">
                                <div className="relative flex items-center justify-center">
                                    <span className="font-bold text-gray-200 text-9xl mr-32">02</span>
                                    <h3 className='text-xl absolute'>Typography</h3>
                                </div>

                                <div className="flex flex-col gap-5">
                                    <TextLayout
                                        type="Primary"
                                        text={headingText}
                                        font={headingFont}
                                        variant={headingVariant}
                                        category={headingCategory}
                                    />

                                    <hr />

                                    <TextLayout
                                        type="Secondary"
                                        text={bodyText}
                                        font={bodyFont}
                                        variant={bodyVariant}
                                        category={bodyCategory}
                                    />
                                </div>
                            </section>
                        </div>

                    </div>
                )}
            </div >
        </div >
    );
};

export default GeneratePalette;
GeneratePalette.getLayout = (page: any) => (<DashboardLayout>{page}</DashboardLayout>);
