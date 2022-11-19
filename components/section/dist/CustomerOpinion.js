"use strict";
exports.__esModule = true;
var Section_1 = require("../ui/Sections/Section");
var Card_1 = require("../ui/Card/Card");
var testimonials = [
    {
        name: 'Nick Johnson',
        title: 'Web Design',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        icon: 'nick'
    },
    {
        name: 'Nick Johnson',
        title: 'Designer',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        icon: 'nick'
    },
    {
        name: 'Nick Johnson',
        title: 'Web Design',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        icon: 'nick'
    },
];
function CustomerOpinion() {
    return (React.createElement(Section_1["default"], { id: "testimonial" },
        React.createElement("div", { className: "mx-auto max-w-6xl px-6 flex flex-start flex-col" },
            React.createElement("p", { className: 'text-[#F1887A] uppercase tracking-[.25em]' }, "Testimonial"),
            React.createElement("h1", { className: 'text-left pb-[25px] md:text-[39px] text-[25px] dark:text-[#EBD9A1] text-[#293C4A]' }, "Hear from our customers"),
            React.createElement("div", { className: "grid gap-7 grid-cols-1 md:grid-cols-2 xl:grid-cols-3" }, testimonials.map(function (testi, index) { return (React.createElement(Card_1["default"], { key: index },
                React.createElement("div", { className: "flex flex-col gap-3" },
                    React.createElement("div", { className: 'flex flex-row gap-3 items-center' },
                        React.createElement("img", { src: "/testimonials/" + testi.icon + ".png", alt: testi.name, className: 'w-[50px] h-[50px]' }),
                        React.createElement("div", null,
                            React.createElement("h3", { className: "text-[#F1887A] text-lg" }, testi.name),
                            React.createElement("p", { className: 'text-[10px] text-[#293C4A] uppercase tracking-[.25em]' }, testi.title))),
                    React.createElement("p", { className: 'text-sm' }, testi.description)))); })))));
}
exports["default"] = CustomerOpinion;
