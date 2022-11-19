"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
require("styles/main.css");
require("styles/chrome-bug.css");
var react_1 = require("react");
var react_2 = require("react");
var Layout_1 = require("@/components/Layout/Layout");
var auth_helpers_react_1 = require("@supabase/auth-helpers-react");
var auth_helpers_nextjs_1 = require("@supabase/auth-helpers-nextjs");
var useUser_1 = require("utils/useUser");
var next_themes_1 = require("next-themes");
var react_3 = require("@vercel/analytics/react");
function MyApp(_a) {
    var Component = _a.Component, pageProps = _a.pageProps;
    var supabaseClient = react_1.useState(function () {
        return auth_helpers_nextjs_1.createBrowserSupabaseClient();
    })[0];
    react_1.useEffect(function () {
        var _a;
        (_a = document.body.classList) === null || _a === void 0 ? void 0 : _a.remove('loading');
    }, []);
    var _b = react_1.useState(null), user = _b[0], setUser = _b[1];
    var getLayout = Component.getLayout || (function (page) { return react_2["default"].createElement(Layout_1["default"], null, page); });
    return (react_2["default"].createElement(next_themes_1.ThemeProvider, { enableSystem: true, attribute: "class" },
        react_2["default"].createElement(auth_helpers_react_1.SessionContextProvider, { supabaseClient: supabaseClient, initialSession: pageProps.initialSession },
            react_2["default"].createElement(useUser_1.MyUserContextProvider, null,
                getLayout(react_2["default"].createElement(Component, __assign({}, pageProps))),
                react_2["default"].createElement(react_3.Analytics, null)))));
}
exports["default"] = MyApp;
