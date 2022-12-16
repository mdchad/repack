import DashboardLayout from '@/components/Layout/DashboardLayout';
import React, { useState, useRef, useEffect } from 'react';
import chroma from 'chroma-js';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { BookmarkIcon } from '@heroicons/react/24/solid';
import { BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { SUBTYPE, TYPE } from '@/utils/enums';
import { splitHashURL } from '@/utils/helpers';
import { Reorder } from 'framer-motion';
import { Popover } from '@headlessui/react';

const MIN_CONTRAST_RATIO = 4.5;

const isColorAccessible = (color1: any, color2: any) => {
  const contrastRatio = chroma.contrast(color1, color2);
  return contrastRatio >= MIN_CONTRAST_RATIO;
};

const generateHarmoniousPalette: any = () => {
  const color = chroma.random();
  const color1 = chroma.random();

  // const scale = chroma.scale([color, chroma.random()]).colors(5);
  return chroma.scale([color, color1]).colors(5);
};

const generateAnalogousPalette: any = () => {
  const color = chroma.random();
  const h = color.get('hsl.h');
  const s = color.get('hsl.s');
  const l = color.get('hsl.l');
  const color1 = chroma.hsl(h - 30, s, l);
  const color2 = chroma.hsl(h + 30, s, l);
  return chroma.scale([color1, color2]).mode('hsl').colors(3);
};

const generateComplimentaryPalette: any = () => {
  const color = chroma.random();
  const h = color.get('hsl.h');
  const s = color.get('hsl.s');
  const l = color.get('hsl.l');
  const complement = chroma.hsl(h - 180, s, l);
  return chroma.scale([color, complement]).colors(2);
};

const generateMonochromaticPalette: any = () => {
  const color = chroma.random();
  const l = color.get('lch.l');
  const c = color.get('lch.c');
  const h = color.get('lch.h');
  const brighter = chroma.lch(l + 10, c, h);
  const scale = chroma.scale([color, brighter]).colors(3);
  return scale;
};

const generateTriadicPalette: any = () => {
  const color = chroma.random();
  const h = color.get('hsl.h');
  const s = color.get('hsl.s');
  const l = color.get('hsl.l');
  const color1 = chroma.hsl(h - 120, s, l);
  const color2 = chroma.hsl(h + 120, s, l);
  return chroma.scale([color, color1, color2]).mode('hsl').colors(3);
};

const generateTetradicPalette: any = () => {
  const color = chroma.random();
  const h = color.get('hsl.h');
  const s = color.get('hsl.s');
  const l = color.get('hsl.l');
  const color1 = chroma.hsl(h - 90, s, l);
  const color2 = chroma.hsl(h + 90, s, l);
  const color3 = chroma.hsl(h + 180, s, l);
  const scale = chroma
    .scale([color, color1, color2, color3])
    .mode('hsl')
    .colors(4);
  return scale;
};

const GeneratePalette = () => {
  const [palette, setPalette] = useState<any>([]);
  const [convertedValue, setConvertedValue] = useState([]);
  const [type, setType] = useState('');
  const [saved, setSaved] = useState(false);
  const [colorData, setColorData] = useState<any>([]);
  const [lockColor, setLockColor] = useState('');
  const [pointerGrabbing, setPointerGrabbing] = useState(false);
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const user = useUser();

  const paletteType = useRef(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('colors');

    getColors();
    if (!myParam) {
      handleGeneratePalette();
    } else {
      const colorParam = myParam?.split('-');
      const transformedParams: any = colorParam.map((color: string) => {
        return '#'.concat(color);
      });
      getSaved(transformedParams);
      setPalette(transformedParams);
    }

    // detect if G key is pressed
    const handleSpaceBar = (e: any) => {
      if (e.keyCode === 71) {
        handleGeneratePalette();
      }
    };

    // add event listener
    document.addEventListener('keydown', handleSpaceBar);

    // remove event listener on unmount
    return () => {
      document.removeEventListener('keydown', handleSpaceBar);
    };
  }, []);

  // console.log(saved)
  async function getSaved(savedData: string[]) {
    let { data, error } = await supabaseClient
      .from('favourites')
      .select()
      .contains('saved', { value: savedData })
      .single();

    if (data) {
      setSaved(true);
    }
  }

  const handleGeneratePalette = () => {
    const list = [
      'harmonious',
      'analogous',
      'complimentary',
      'monochromatic',
      'triadic',
      'tetradic'
    ];

    // select random value from list
    const randomizer = list[Math.floor(Math.random() * list.length)];
    setType(randomizer);
    let result;

    switch (randomizer) {
      case 'harmonious':
        result = generateHarmoniousPalette();
        setPalette(result);
        break;
      case 'analogous':
        result = generateAnalogousPalette();
        setPalette(result);
        break;
      case 'complimentary':
        result = generateComplimentaryPalette();
        setPalette(result);
        break;
      case 'monochromatic':
        result = generateMonochromaticPalette();
        setPalette(result);
        break;
      case 'triadic':
        result = generateTriadicPalette();
        setPalette(result);
        break;
      case 'tetradic':
        result = generateTetradicPalette();
        setPalette(result);
        break;
      default:
        break;
    }

    const joined = splitHashURL(result);
    getSaved(result);

    router.push({
      pathname: '',
      query: {
        colors: joined
      }
    });
  };

  async function getColors() {
    let { data, error } = await supabaseClient.from('colors').select();
    setColorData(data);
  }

  const convertValueTo = (convert: string) => {
    if (convert === 'hex') {
      palette.map((color: any) => {
        return chroma(color).hex();
      });

      setConvertedValue(palette);
    }

    if (convert === 'hsl') {
      const hsl: any = palette.map((color: any) => {
        return chroma(color)
          .hsl()
          .map((value) => {
            // return 2 decimal places and comma seperated
            return Math.round(value * 100) / 100 + ', ';
          });
      });

      setConvertedValue(hsl);
    }

    if (convert === 'rgb') {
      const rgb: any = palette.map((color: any) => {
        return chroma(color)
          .rgb()
          .map((value) => {
            return Math.round(value * 100) / 100;
          });
      });

      setConvertedValue(rgb);
    }
  };

  async function savePalette() {
    const duration = 2000;

    if (saved) {
      return;
    }

    if (!palette.length) {
      return;
    }

    const newSave = {
      created_at: new Date().toISOString(),
      type: TYPE.Branding,
      subtype: SUBTYPE.Colour,
      saved: {
        value: palette
      },
      user_id: user?.id
    };

    let { error } = await supabaseClient.from('favourites').insert(newSave);

    if (error) {
      console.log(error);
      toast.error('Fail to save', {
        position: 'top-right',
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'light'
      });
    } else {
      toast.success('Added to saved', {
        position: 'top-right',
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'light'
      });
    }
  }

  function order(val: string[]) {
    const joined = splitHashURL(val);

    router.push({
      pathname: '',
      query: {
        colors: joined
      }
    });
    setPalette(val);
  }

  function pointerEvent(bool: any) {
    setPointerGrabbing(bool)
  }

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

          <button
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
            onClick={handleGeneratePalette}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Generate Palette
            </span>
          </button>
        </div>
        <div className="flex flex-row">
          <Reorder.Group
            className="flex"
            axis="x"
            values={palette}
            onReorder={order}
          >
            {palette.map((color: any) => {
              const style = { backgroundColor: color };
              return (
                <Reorder.Item key={color} value={color} onPointerDown={() => pointerEvent(true)} onPointerUp={() => pointerEvent(false)}>
                  <div
                    className={`mr-2 h-10 w-10 rounded-full ${pointerGrabbing ? 'cursor-grabbing' : 'cursor-grab'}`}
                    style={style}
                    key={color}
                  ></div>
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
          <div>
            <button
              onClick={savePalette}
              className="w-10 h-10 bg-gray-100 rounded-lg dark:bg-slate-800 flex items-center justify-center hover:ring-2 ring-gray-400 transition-all duration-300 focus:outline-none"
            >
              {saved ? (
                <BookmarkIcon className="h-5 w-5 text-yellow-400" />
              ) : (
                <BookmarkIconOutline className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex gap-3 mb-5">
          {convertedValue.map((color) => (
            <span
              key={color}
              style={{ backgroundColor: chroma(color).hex() }}
              className="w-50 h-50 p-5"
            >
              {color}
            </span>
          ))}
        </div>

        {/* palette container */}
        <div className="w-full bg-white p-5 gap-12 flex flex-col rounded-lg">
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-2xl">Color Palette Generator</h1>
              <span className="text-sm color-gray-300">
                Press "G" to generate.
              </span>
            </div>

            <div>
              <span className="text-base text-gray-400 capitalize mb-2 block">
                {' '}
                {type}{' '}
              </span>

              <div className="flex items-center justify-center overflow-hidden rounded-xl">
                {palette.map((color: any) => (
                  <div
                    key={color}
                    style={{ backgroundColor: color }}
                    className="flex w-full h-96 items-end justify-center pb-5 overflow-hidden"
                  >
                    <span
                      className={`${
                        chroma.contrast(color, 'white') > 4.5
                          ? 'text-white'
                          : 'text-black'
                      }`}
                    >
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
              {colorData.map((palette: any, index: number) => (
                <div className="overflow-hidden rounded-lg" key={index}>
                  <div className="flex mb-1">
                    {JSON.parse(palette.color).map((color: any, i: number) => (
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

export default GeneratePalette;
GeneratePalette.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);
