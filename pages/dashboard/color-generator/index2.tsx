import DashboardLayout from '@/components/Layout/DashboardLayout';
import React, { useState } from "react";
import chroma from "chroma-js";
import _ from "lodash";

const ColorPalette = () => {
    const [primaryColor, setPrimaryColor] = useState("#6002ee");

    // to create a color scale from a single color
    const adjustScale = (color: any) => {
        const colors = chroma(color).hsl();
        const hue = colors[0];
        const saturation = colors[1];
        const lightness = colors[2];

        // Calculate the control points for the Bezier curve
        const darkColors = chroma.hsl(hue, saturation, lightness - 0.1).hex();
        const lightColors = chroma.hsl(hue, saturation, lightness + 0.3).hex();

        // create darkColors, color, lightColors array
        const darkControlPoints = [darkColors, color];
        const lightControlPoints = [color, lightColors];

        const scale = (controlPoints: any) => {
            // Generate a color scale using Bezier interpolation
            const scale = chroma
                // .bezier(controlPoints)
                .scale(controlPoints) // Use the scale method to create a color scale from the Bezier curve
                .colors(10); // Generate the desired number of colors

            // Correct the lightness of the colors in the scale
            const correctedScale = scale.map((color) => {
                if (chroma(color).luminance() < 0.5) {
                    // If the color is too dark, make it lighter
                    return chroma(color).brighten().hex();
                } else {
                    // If the color is too light, make it darker
                    return chroma(color).darken(0.1).hex();
                }
            });

            return correctedScale;
        }

        let correctedScale = [...darkControlPoints, color, ...lightControlPoints];
        correctedScale = scale(correctedScale);

        // const correctedDarkScale = scale(darkControlPoints);
        // const correctedLightScale = scale(lightControlPoints);


        // Remove the duplicate colors
        const uniqueColors = _.uniq(correctedScale);

        const palette = uniqueColors;

        return palette;
    };



    const complementaryScale = (color: any) => {
        const colors = chroma(color).hsl();
        const hue = colors[0];
        const saturation = colors[1];
        const lightness = colors[2];

        const complementaryHue = (hue + 180) % 360; // Calculate the complementary hue

        const complementaryColor = chroma.hsl(complementaryHue, saturation, lightness).hex();

        const scale = adjustScale(complementaryColor);

        return scale;
    };

    const analogousScale = (color: any) => {
        const colors = chroma(color);
        const h = colors.get("hsl.h");
        const s = colors.get("hsl.s");
        const l = colors.get("hsl.l");
        const color1 = chroma.hsl(h - 30, s, l);
        const color2 = chroma.hsl(h + 30, s, l);
        const scale = chroma.scale([color1, color2]).mode("hsl").colors(3);
        return scale;
    };

    const colorName = (color: any) => {
        return chroma(color).name();
    };

    const colorScale = adjustScale(primaryColor);

    // const filteredColorScale = colorScale.filter(
    //     (color) => chroma.distance(primaryColor, color) > 1
    // );

    const complementaryColorScale = complementaryScale(primaryColor)
    const analogousColorScale = analogousScale(primaryColor)

    return (
        <div className="color-palette flex flex-col items-center">
            <div className="color-picker">
                <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                />
            </div>
            <div className="color-scale flex flex-col w-full h-50">
                <div className="flex justify-start gap-5">
                    <p>Priamry Color : {colorName(primaryColor)}</p>
                </div>

                <div className="flex items-start">
                    {colorScale.map((color: any, i: any) => (
                        <div
                            key={i}
                            className={`color-swatch w-full block h-20 grid place-content-center ${chroma.contrast(color, primaryColor) < 4.5 ? "text-white" : "text-black"}`}
                            style={{ backgroundColor: color }}
                        >
                            {color}
                        </div>
                    ))}
                </div>
            </div>

            <div className="color-scale flex flex-col w-full h-50">
                <div className="flex justify-start gap-5">
                    {/* <p>{Cdark.hex()}</p> */}
                    <p>Complementary Scale</p>
                    {/* <p>{Clight.hex()}</p> */}
                </div>

                <div className="flex">
                    {complementaryColorScale.map((color: any, i: any) => (
                        <div
                            key={i}
                            className="color-swatch w-full block h-20"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
            </div>

            <div className="color-scale flex flex-col w-full h-50">
                <div className="flex justify-start gap-5">
                    {/* <p>{Cdark.hex()}</p> */}
                    <p>Analogous Scale</p>
                    {/* <p>{Clight.hex()}</p> */}
                </div>

                <div className="flex">
                    {analogousColorScale.map((color: any, i: any) => (
                        <div
                            key={i}
                            className="color-swatch w-full block h-20"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ColorPalette;

ColorPalette.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;