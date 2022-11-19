"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var Section_1 = require("@/components/ui/Sections/Section");
var framer_motion_1 = require("framer-motion");
var react_intersection_observer_1 = require("react-intersection-observer");
function hero() {
    var variants = {
        // slide from right
        hidden: { opacity: 0, x: 500 },
        visible: { opacity: 1, x: 0, transition: { duration: 1 } }
    };
    var control = framer_motion_1.useAnimation();
    var _a = react_intersection_observer_1.useInView(), ref = _a[0], inView = _a[1];
    react_1.useEffect(function () {
        if (inView) {
            control.start("visible");
        }
        else {
            // control.start("hidden");
        }
    }, [control, inView]);
    return (react_1["default"].createElement(Section_1["default"], { id: "hero" },
        react_1["default"].createElement("div", { className: "text-left flex flex-col items-start gap-4" },
            react_1["default"].createElement("h1", { className: "lg:text-[49px] md:text-[39px] text-[25px] md:w-[75%] md:w-[50%]" }, "The Modern Toolkit for All Your Website Needs"),
            react_1["default"].createElement("p", { className: "md:w-[60%] block font-thin" },
                "With its ",
                react_1["default"].createElement("strong", { className: "font-bold" }, "all-in-one"),
                " solution and modern toolkit, Repack is the perfect solution for your website design needs."),
            react_1["default"].createElement("div", { className: "py-5" },
                react_1["default"].createElement("a", { href: "#", className: "bg-[#0E1714] text-white py-3 px-6 rounded-md font-bold" }, "Get Started")),
            react_1["default"].createElement("div", { className: "w-full flex justify-end" },
                react_1["default"].createElement("div", { className: "md:w-[75%] lg:w-[50%]" },
                    react_1["default"].createElement(framer_motion_1.motion.div, { animate: {
                            y: [0, 10],
                            transition: { duration: 1, repeat: Infinity, repeatType: "reverse" }
                        } },
                        react_1["default"].createElement(image_1["default"], { src: "/hero-img.png", alt: "hero", layout: "intrinsic", width: 1000, height: 500 })))))));
}
exports["default"] = hero;
