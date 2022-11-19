"use strict";
exports.__esModule = true;
var Section_1 = require("../ui/Sections/Section");
var Card_1 = require("../ui/Card/Card");
var Tags_1 = require("../ui/Tags/Tags");
var services = [
    {
        title: 'Social Media',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['Design', 'ui/ux'],
        icon: 'web-design'
    },
    {
        title: 'Brand Guide',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['UI/UX', 'Frontend', 'Backend'],
        icon: 'web-development'
    },
    {
        title: 'SEO',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['UI/UX', 'Frontend', 'Backend'],
        icon: 'mobile-app'
    },
    {
        title: 'Website Builder',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['Branding', 'UI/UX'],
        icon: 'branding'
    },
    {
        title: 'Advertising',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['Seo', 'Analytics', 'Marketing'],
        icon: 'seo'
    },
    {
        title: 'Marketing',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['Seo', 'Analytics', 'Marketing'],
        icon: 'seo'
    },
];
function Services() {
    return (React.createElement(Section_1["default"], { id: "services" },
        React.createElement("div", { className: "mx-auto max-w-6xl px-6 flex flex-start flex-col" },
            React.createElement("p", { className: 'text-[#F1887A] uppercase tracking-[.25em]' }, "Features"),
            React.createElement("h1", { className: 'text-left pb-[25px] md:text-[39px] text-[25px] dark:text-[#EBD9A1] text-[#293C4A]' }, "Why repack?"),
            React.createElement("div", { className: "grid gap-7 grid-cols-1 md:grid-cols-2 xl:grid-cols-3" }, services.map(function (service, index) { return (React.createElement(Card_1["default"], { key: index },
                React.createElement("div", { className: 'text-center flex items-center flex-col' },
                    React.createElement("img", { src: "/icons/" + service.icon + ".png", alt: service.title, className: 'w-[50px] h-[50px] m-auto invert dark:invert-0' }),
                    React.createElement("h3", { className: "text-[#F1887A] text-lg pb-3" }, service.title),
                    React.createElement("p", { className: 'text-sm' }, service.description)),
                React.createElement("div", { className: "flex flex-wrap gap-1" }, service.tags.map(function (tag, index) { return (React.createElement(Tags_1["default"], { key: index }, tag)); })))); })))));
}
exports["default"] = Services;
