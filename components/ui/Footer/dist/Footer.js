"use strict";
exports.__esModule = true;
var GitHub_1 = require("components/icons/GitHub");
function Footer() {
    return (React.createElement("footer", { className: "bg-white text-[#293C4A] pt-6" },
        React.createElement("div", { className: "mx-auto max-w-6xl px-6" },
            React.createElement("div", { className: "flex justify-between p-5 flex-col md:flex-row items-center gap-4" },
                React.createElement("div", { className: "flex gap-2 md:gap-[1em] flex-col-reverse md:flex-row items-center" },
                    React.createElement("h1", null, "Repack"),
                    " ",
                    React.createElement(GitHub_1["default"], null)),
                React.createElement("div", { className: "flex flex-col gap-[1em]" },
                    React.createElement("ul", { className: "flex flex-row gap-[1em]" },
                        React.createElement("li", null, "Pricing"),
                        React.createElement("li", null, "Support"),
                        React.createElement("li", null, "Privacy"),
                        React.createElement("li", null, "Terms")),
                    React.createElement("ul", { className: "flex flex-row gap-3 justify-center md:justify-end" },
                        React.createElement("li", null,
                            React.createElement(GitHub_1["default"], null)),
                        React.createElement("li", null,
                            React.createElement(GitHub_1["default"], null)),
                        React.createElement("li", null,
                            React.createElement(GitHub_1["default"], null)),
                        React.createElement("li", null,
                            React.createElement(GitHub_1["default"], null))))),
            React.createElement("hr", { className: "my-[1em] h-px bg-gray-200 border-0 light:bg-gray-700" }),
            React.createElement("div", { className: "flex justify-center p-5" },
                React.createElement("span", { className: "text-sm text-[#293C4A] font-thin" },
                    "Copyright \u00A9 2022 ",
                    React.createElement("strong", { className: "font-bold" }, "REPACK"),
                    ". All rights reserved.")))));
}
exports["default"] = Footer;
