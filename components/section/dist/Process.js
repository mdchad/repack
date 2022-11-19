"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Section_1 = require("../ui/Sections/Section");
var Card_1 = require("../ui/Card/Card");
var services = [
    {
        title: 'Web Design',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['Design', 'ui/ux'],
        icon: 'web-design'
    },
    {
        title: 'Web Development',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['UI/UX', 'Frontend', 'Backend'],
        icon: 'web-development'
    },
    {
        title: 'Mobile App',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['UI/UX', 'Frontend', 'Backend'],
        icon: 'mobile-app'
    },
    {
        title: 'Branding',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['Branding', 'UI/UX'],
        icon: 'branding'
    },
    {
        title: 'SEO',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['Seo', 'Analytics', 'Marketing'],
        icon: 'seo'
    },
];
function Process() {
    return (react_1["default"].createElement(Section_1["default"], null,
        react_1["default"].createElement("div", { className: "mx-auto max-w-6xl px-6 flex flex-start flex-col gap-8" },
            react_1["default"].createElement("div", { className: "flex flex-col flex-wrap gap-4" },
                react_1["default"].createElement("div", { className: 'flex gap-4' },
                    react_1["default"].createElement("div", { className: 'w-1/2' },
                        react_1["default"].createElement(Card_1["default"], null, "1")),
                    react_1["default"].createElement("div", { className: 'w-1/2' },
                        react_1["default"].createElement(Card_1["default"], null, "2"))),
                react_1["default"].createElement("div", { className: 'flex gap-4' },
                    react_1["default"].createElement("div", { className: 'w-2/5' },
                        react_1["default"].createElement(Card_1["default"], null, "1")),
                    react_1["default"].createElement("div", { className: 'w-3/5' },
                        react_1["default"].createElement(Card_1["default"], null, "2"))),
                react_1["default"].createElement("div", { className: 'flex gap-4' },
                    react_1["default"].createElement("div", { className: 'w-2/3' },
                        react_1["default"].createElement(Card_1["default"], null, "1")),
                    react_1["default"].createElement("div", { className: 'w-1/3' },
                        react_1["default"].createElement(Card_1["default"], null, "2"))),
                react_1["default"].createElement("div", { className: 'flex gap-4' },
                    react_1["default"].createElement("a", { href: "#", className: "bg-[#0E1714] text-white py-3 px-6 rounded-md font-bold" }, "Get Started"))))));
}
exports["default"] = Process;
