"use strict";
exports.__esModule = true;
var Layout_1 = require("@/components/Layout/Layout");
var Hero_1 = require("@/components/section/Hero");
var Services_1 = require("@/components/section/Services");
var Pricing_1 = require("@/components/section/Pricing");
var CustomerOpinion_1 = require("@/components/section/CustomerOpinion");
var Faq_1 = require("@/components/section/Faq");
var Plans_1 = require("@/components/section/Plans");
function Home() {
    return (React.createElement(React.Fragment, null,
        React.createElement(Hero_1["default"], null),
        React.createElement(Services_1["default"], null),
        React.createElement(Plans_1["default"], null),
        React.createElement(CustomerOpinion_1["default"], null),
        React.createElement(Pricing_1["default"], null),
        React.createElement(Faq_1["default"], null)));
}
exports["default"] = Home;
Home.getLayout = function (page) { return (React.createElement(Layout_1["default"], null, page)); };
