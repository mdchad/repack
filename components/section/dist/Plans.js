"use strict";
exports.__esModule = true;
var Section_1 = require("../ui/Section/Section");
var Card_1 = require("../ui/Card/Card");
var plans = [
    {
        title: 'Phase 1',
        icon: 'web-design',
        data: [{
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            {
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            {
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            }]
    },
    {
        title: 'Phase 2',
        icon: 'web-design',
        data: [{
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            {
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            {
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            }]
    },
    {
        title: 'Phase 3',
        icon: 'web-design',
        data: [{
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            {
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            {
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            }]
    }
];
function checkLeftorRight(index) {
    if (index % 2 === 0) {
        return 'mb-8 flex justify-between items-center w-full right-timeline';
    }
    else {
        return 'mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline';
    }
}
function Plan() {
    return (React.createElement(Section_1["default"], { id: "plans" },
        React.createElement("div", { className: "mx-auto max-w-6xl px-6 flex items-center flex-col" },
            React.createElement("p", { className: 'text-[#F1887A] uppercase tracking-[.25em]' }, "Agenda"),
            React.createElement("h1", { className: 'text-left pb-[25px] md:text-[39px] text-[25px] dark:text-[#EBD9A1] text-[#293C4A]' }, "Our Plans"),
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "relative wrap overflow-hidden h-full" },
                    React.createElement("div", { className: "border-2-2 absolute border-opacity-20 border-gray-700 dark:border-white  h-full border left-[50%] invisible xl:visible" }),
                    plans.map(function (plan, index) { return (
                    // odd/even index
                    React.createElement("div", { key: index, className: "" + checkLeftorRight(index + 1) },
                        React.createElement("div", { className: "order-1 w-5/12 invisible xl:visible" }),
                        React.createElement("div", { className: "z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full invisible xl:visible" },
                            React.createElement("h1", { className: "mx-auto font-semibold text-lg text-white" }, index + 1)),
                        React.createElement(Card_1["default"], { className: "order-1 xl:w-5/12 p-6 flex flex-col flex-start gap-4" },
                            React.createElement("img", { src: "/icons/" + plan.icon + ".png", alt: plan.title, className: 'w-[50px] h-[50px] invert dark:invert-0' }),
                            React.createElement("h3", { className: "font-bold text-[#F1887A] dark:text-[#F1887A] text-xl" }, plan.title),
                            plan.data.map(function (item, index) { return (React.createElement("p", { key: index, className: "text-sm text-[#293C4A] dark:text-white" }, item.description)); })))); }))))));
}
exports["default"] = Plan;
