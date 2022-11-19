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
exports.useUser = exports.MyUserContextProvider = exports.UserContext = void 0;
var react_1 = require("react");
var auth_helpers_react_1 = require("@supabase/auth-helpers-react");
exports.UserContext = react_1.createContext(undefined);
exports.MyUserContextProvider = function (props) {
    var _a;
    var _b = auth_helpers_react_1.useSessionContext(), session = _b.session, isLoadingUser = _b.isLoading, supabase = _b.supabaseClient;
    var user = auth_helpers_react_1.useUser();
    var accessToken = (_a = session === null || session === void 0 ? void 0 : session.access_token) !== null && _a !== void 0 ? _a : null;
    var _c = react_1.useState(false), isLoadingData = _c[0], setIsloadingData = _c[1];
    var _d = react_1.useState(null), userDetails = _d[0], setUserDetails = _d[1];
    var _e = react_1.useState(null), subscription = _e[0], setSubscription = _e[1];
    var getUserDetails = function () { return supabase.from('users').select('*').eq('id', user === null || user === void 0 ? void 0 : user.id).single(); };
    var getSubscription = function () {
        return supabase
            .from('subscriptions')
            .select('*, prices(*, products(*))')["in"]('status', ['trialing', 'active'])
            .single();
    };
    react_1.useEffect(function () {
        if (user && !isLoadingData && !userDetails && !subscription) {
            setIsloadingData(true);
            Promise.allSettled([getUserDetails(), getSubscription()]).then(function (results) {
                var userDetailsPromise = results[0];
                var subscriptionPromise = results[1];
                if (userDetailsPromise.status === 'fulfilled')
                    setUserDetails(userDetailsPromise.value.data);
                if (subscriptionPromise.status === 'fulfilled')
                    setSubscription(subscriptionPromise.value.data);
                setIsloadingData(false);
            });
        }
        else if (!user && !isLoadingUser && !isLoadingData) {
            setUserDetails(null);
            setSubscription(null);
        }
    }, [user, isLoadingUser]);
    var value = {
        accessToken: accessToken,
        user: user,
        userDetails: userDetails,
        isLoading: isLoadingUser || isLoadingData,
        subscription: subscription
    };
    return React.createElement(exports.UserContext.Provider, __assign({ value: value }, props));
};
exports.useUser = function () {
    var context = react_1.useContext(exports.UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a MyUserContextProvider.");
    }
    return context;
};
