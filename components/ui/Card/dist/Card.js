"use strict";
exports.__esModule = true;
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var react_intersection_observer_1 = require("react-intersection-observer");
function Card(_a) {
    var children = _a.children, className = _a.className;
    var variants = {
        hidden: { transform: 'translateY(100px)' },
        visible: { transform: 'translateY(0px)', transition: { duration: 1 } }
    };
    var control = framer_motion_1.useAnimation();
    var _b = react_intersection_observer_1.useInView(), ref = _b[0], inView = _b[1];
    react_1.useEffect(function () {
        if (inView) {
            control.start("visible");
        }
        else {
            // control.start("hidden");
        }
    }, [control, inView]);
    return (react_1["default"].createElement(framer_motion_1.motion.div, { className: className, ref: ref, variants: variants, initial: "hidden", animate: control },
        react_1["default"].createElement("div", { className: 'flex flex-col gap-6 p-6 items-center justify-start bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 h-full' }, children)));
}
exports["default"] = Card;
