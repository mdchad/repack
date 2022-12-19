import React from 'react'

function TextLayout({ type, text, font, variant, category }: any) {
    const textSizes = [] as any;
    const baseFontSize = 16;
    const scale = 1.250;

    // const typeOfText = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'button', 'caption', 'overline'];
    const typeOfText = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body'];
    typeOfText.reverse();

    const bodyIndex = typeOfText.indexOf('body');

    // Calculate the scaling factor for each text type based on the index of body
    // and the base font size of body
    const scalingFactors = typeOfText.map((type, index) => {
        return Math.pow(scale, index - bodyIndex);
    });

    // Calculate the actual font size for each text type based on the base font size and the scaling factor
    const typeScaling = typeOfText.map((type, index) => {
        return baseFontSize * scalingFactors[index];
    });

    typeOfText.map((type, index) => {
        textSizes.push({
            type: type,
            size: typeScaling[index]
        })
    });

    textSizes.reverse()

    const pxToRem = (px: number) => {
        return parseFloat((px / 16).toFixed(3))
    }

    return (
        <div className="lg:p-5 flex flex-col gap-10"
            style={{
                fontFamily: font + ',' + category,
                fontWeight: 'normal'
            }}
        >
            <div className='flex flex-col gap-3'>
                <div>
                    <h3 className="text-2xl">{type} - <span style={{ fontFamily: font + ',' + category }}>{font}</span></h3>
                </div>
            </div>

            <div className='flex flex-col gap-5'>
                <div className="text-6xl lg:text-9xl">Aa</div>
                <div className="text-2xl lg:text-6xl flex flex-col gap-3 justify-end">
                    <p>Aa Bb Cc Dd Ee Ff Gg Hh li</p>
                    <p>Jj Kk Ll Mm Nn Oo Pp Qq Rr</p>
                    <p>Ss Tt Uu Vv Ww Xx Yy Zz</p>
                    <p className='mt-5'>01 02 03 04 05 06 07 08 09</p>
                </div>
            </div>

            <div>
                <h2 className='w-full block'>Variants:</h2>
                <div className="flex flex-row flex-wrap gap-2">
                    {variant.map((v: any) => {
                        return (
                            <div className="lg:text-2xl" key={v} style={{
                                fontWeight: (v.includes('500') || v.includes('600') || v.includes('700') || v.includes('800') || v.includes('900')) ? v.replace('italic', '') : 'normal',
                                fontStyle: v.includes('italic') ? 'italic' : 'normal',
                            }}>
                                {v}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* tyle scale 1rem/16px */}
            <div>
                <h2 className='w-full block'>Typescale:</h2>
                <div className="flex flex-row gap-5">
                    {textSizes.map((t: any, index: number) => {
                        return (
                            <div className="flex flex-col items-center" key={index}>
                                <div
                                    style={{
                                        fontSize: t.size
                                    }}
                                >
                                    {t.type}
                                </div>
                                <div className="text-sm">{pxToRem(t.size)}rem</div>
                                <div className="text-sm">{parseFloat(t.size.toFixed(2))}px</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

    )
}

export default TextLayout