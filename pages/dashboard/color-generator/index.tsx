import DashboardLayout from '@/components/Layout/DashboardLayout';
import React, { useState, useRef, useEffect } from "react";
import chroma from "chroma-js";
var nicePalette = require("nice-color-palettes");

const MIN_CONTRAST_RATIO = 4.5;

const isColorAccessible = (color1:any , color2:any) => {
    const contrastRatio = chroma.contrast(color1, color2);
    return contrastRatio >= MIN_CONTRAST_RATIO;
};

const generateHarmoniousPalette: any = () => {
    const color = chroma.random();
    const scale = chroma.scale([color, chroma.random()]).colors(5);
    return scale;
};

const generateAnalogousPalette: any = () => {
    const color = chroma.random();
    const h = color.get("hsl.h");
    const s = color.get("hsl.s");
    const l = color.get("hsl.l");
    const color1 = chroma.hsl(h - 30, s, l);
    const color2 = chroma.hsl(h + 30, s, l);
    const scale = chroma.scale([color1, color2]).mode("hsl").colors(3);
    return scale;
};

const generateComplimentaryPalette: any = () => {
    const color = chroma.random();
    const h = color.get("hsl.h");
    const s = color.get("hsl.s");
    const l = color.get("hsl.l");
    const complement = chroma.hsl(h - 180, s, l);
    const scale = chroma.scale([color, complement]).colors(2);
    return scale;
};

const generateMonochromaticPalette: any = () => {
    const color = chroma.random();
    const l = color.get("lch.l");
    const c = color.get("lch.c");
    const h = color.get("lch.h");
    const brighter = chroma.lch(l + 10, c, h);
    const scale = chroma.scale([color, brighter]).colors(3);
    return scale;
};

const generateTriadicPalette: any = () => {
    const color = chroma.random();
    const h = color.get("hsl.h");
    const s = color.get("hsl.s");
    const l = color.get("hsl.l");
    const color1 = chroma.hsl(h - 120, s, l);
    const color2 = chroma.hsl(h + 120, s, l);
    const scale = chroma.scale([color, color1, color2]).mode("hsl").colors(3);
    return scale;
};

const generateTetradicPalette: any = () => {
    const color = chroma.random();
    const h = color.get("hsl.h");
    const s = color.get("hsl.s");
    const l = color.get("hsl.l");
    const color1 = chroma.hsl(h - 90, s, l);
    const color2 = chroma.hsl(h + 90, s, l);
    const color3 = chroma.hsl(h + 180, s, l);
    const scale = chroma
        .scale([color, color1, color2, color3])
        .mode("hsl")
        .colors(4);
    return scale;
};

const GeneratePallete = () => {
    const [palette, setPalette] = useState([]);
    const [convertedValue, setconvertedValue] = useState([]);
    const [type, setType] = useState('');

    const paletteType = useRef();

    useEffect(() => {
        handleGeneratePalette();

        // detect if G key is pressed
        const handleSpaceBar = (e: any) => {
            if (e.keyCode === 71) {
                handleGeneratePalette();
            }
        };

        // add event listener
        document.addEventListener("keydown", handleSpaceBar);

        // remove event listener on unmount
        return () => {
            document.removeEventListener("keydown", handleSpaceBar);
        };

    }, []);

    const handleGeneratePalette = () => {
        const list = [
            "harmonious",
            "analogous",
            "complimentary",
            "monochromatic",
            "triadic",
            "tetradic",
        ];

        // select random value from list
        const randomizer = list[Math.floor(Math.random() * list.length)];
        setType(randomizer);

        switch (randomizer) {
            // switch (paletteType.current.value) {
            case "harmonious":
                setPalette(generateHarmoniousPalette());
                break;
            case "analogous":
                setPalette(generateAnalogousPalette());
                break;
            case "complimentary":
                setPalette(generateComplimentaryPalette());
                break;
            case "monochromatic":
                setPalette(generateMonochromaticPalette());
                break;
            case "triadic":
                setPalette(generateTriadicPalette());
                break;
            case "tetradic":
                setPalette(generateTetradicPalette());
                break;
            default:
                break;
        }
    };

    const convertValueTo = (convert: string) => {
        if (convert === 'hex') {
            palette.map((color) => {
                return chroma(color).hex()
            })

            setconvertedValue(palette)
        };

        if (convert === 'hsl') {
            const hsl: any = palette.map((color) => {
                return chroma(color).hsl().map((value) => {
                    // return 2 decimal places and comma seperated
                    return Math.round(value * 100) / 100 + ', ';
                });
            })

            setconvertedValue(hsl)
        }

        if (convert === 'rgb') {
            const rgb:any = palette.map((color) => {
                return chroma(color).rgb().map((value) => {
                    return Math.round(value * 100) / 100;
                });
            })

            setconvertedValue(rgb)
        }
    };

    const savePalette = () => {
        console.log('save palette')
    };


    return (
        <div className="flex flex-col p-5">
            <div className="hidden">
                <select defaultValue="harmonious" ref={paletteType}>
                    <option value="harmonious">Harmonious</option>
                    <option value="analogous">Analogous</option>
                    <option value="complimentary">Complimentary</option>
                    <option value="monochromatic">Monochromatic</option>
                    <option value="triadic">Triadic</option>
                    <option value="tetradic">Tetradic</option>
                </select>
                <button onClick={handleGeneratePalette} className="bg-red-500 p-3">
                    Generate Palette
                </button>
            </div>

            <div className="flex flex-row justify-between items-end bg-white p-5 rounded-lg overflow-hidden">
                <div className="flex gap-3 sticky top-0">
                    {/* <button className="py-3 px-8 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => convertValueTo('hex')} > HEX </button>
                    <button className="py-3 px-8 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => convertValueTo('hsl')}> HSL </button>
                    <button className="py-3 px-8 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => convertValueTo('rgb')}> RGB </button> */}

                    <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400" onClick={handleGeneratePalette}>
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Generate Palette
                        </span>
                    </button>
                </div>

                <div>
                    <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={savePalette}> Save this palette </button>
                </div>
            </div>

            <div>
                <div className="flex gap-3 mb-5">
                    {convertedValue.map((color) => (
                        <span key={color} style={{ backgroundColor: chroma(color).hex() }} className="w-50 h-50 p-5">
                            {color}
                        </span>
                    ))}
                </div>

                {/* palette container */}
                <div className="w-full bg-white p-5 gap-12 flex flex-col rounded-lg">
                    <div className="flex flex-col gap-5">
                        <div>
                            <h1 className="text-2xl">Color Palette Generator</h1>
                            <span className="text-sm color-gray-300">Press "G" to generate.</span>
                        </div>

                        <div>
                            <span className="text-base text-gray-400 capitalize mb-2 block"> {type} </span>

                            <div className="flex items-center justify-center overflow-hidden rounded-xl">
                                {palette.map((color) => (
                                    <div key={color} style={{ backgroundColor: color }} className="flex w-full h-96 items-end justify-center pb-5 overflow-hidden">
                                        <span className={`${chroma.contrast(color, 'white') > 4.5 ? 'text-white' : 'text-black'}`}>
                                            {color}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <h1 className="text-2xl">Color Palette Inspiration</h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {nicePalette.map((palette:any, index:number) => (
                                <div className='overflow-hidden rounded-lg'>
                                    <div key={index} className="flex mb-1">
                                        {palette.map((color:any, i:number) => (
                                            <span
                                                key={i}
                                                style={{ backgroundColor: color }}
                                                className="h-40 w-full"
                                            >
                                                {/* {color} */}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-gray-500">Color Palette {index + 1}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneratePallete;
GeneratePallete.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;