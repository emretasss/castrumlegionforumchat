"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = void 0;
var react_1 = require("next-auth/react");
var Provider = function (_a) {
    var children = _a.children;
    return <react_1.SessionProvider>{children}</react_1.SessionProvider>;
};
exports.Provider = Provider;
