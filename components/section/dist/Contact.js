"use strict";
exports.__esModule = true;
var Section_1 = require("../ui/Sections/Section");
var Card_1 = require("../ui/Card/Card");
function Contact() {
    return (React.createElement(Section_1["default"], { id: "contact" },
        React.createElement(Card_1["default"], null,
            React.createElement("div", { className: 'h-96 w-full flex flex-col items-start justify-center' },
                React.createElement("h1", { className: "text-3xl font-bold text-gray-900" }, "Contact")))));
}
exports["default"] = Contact;
