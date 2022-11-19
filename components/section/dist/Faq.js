"use strict";
exports.__esModule = true;
var Section_1 = require("../ui/Section/Section");
var Card_1 = require("../ui/Card/Card");
var questions = [
    {
        question: 'What makes you different?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
        question: 'What makes you different?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
        question: 'What makes you different?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
        question: 'What makes you different?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
        question: 'What makes you different?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
        question: 'What makes you different?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
];
function Faq() {
    return (React.createElement(Section_1["default"], { id: "questions" },
        React.createElement("div", { className: "mx-auto max-w-6xl px-6 flex flex-start flex-col" },
            React.createElement("p", { className: 'text-[#F1887A] uppercase tracking-[.25em]' }, "FAQ"),
            React.createElement("h1", { className: 'text-left pb-[25px] md:text-[39px] text-[25px] dark:text-[#EBD9A1] text-[#293C4A]' }, "fret not!"),
            React.createElement("div", { className: "grid gap-7 grid-cols-1 md:grid-cols-2" }, questions.map(function (question, index) { return (React.createElement(Card_1["default"], { key: index },
                React.createElement("div", { className: 'text-center flex items-center flex-col' },
                    React.createElement("h3", { className: "text-[#F1887A] text-lg pb-3" }, question.question),
                    React.createElement("p", { className: 'text-sm' }, question.answer)))); })))));
}
exports["default"] = Faq;
