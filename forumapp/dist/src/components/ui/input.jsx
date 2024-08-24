"use strict";
// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input
"use client";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
var React = __importStar(require("react"));
var utils_1 = require("@/lib/utils");
var framer_motion_1 = require("framer-motion");
var Input = React.forwardRef(function (_a, ref) {
    var className = _a.className, type = _a.type, props = __rest(_a, ["className", "type"]);
    var radius = 100; // change this to increase the rdaius of the hover effect
    var _b = React.useState(false), visible = _b[0], setVisible = _b[1];
    var mouseX = (0, framer_motion_1.useMotionValue)(0);
    var mouseY = (0, framer_motion_1.useMotionValue)(0);
    function handleMouseMove(_a) {
        var currentTarget = _a.currentTarget, clientX = _a.clientX, clientY = _a.clientY;
        var _b = currentTarget.getBoundingClientRect(), left = _b.left, top = _b.top;
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }
    return (<framer_motion_1.motion.div style={{
            background: (0, framer_motion_1.useMotionTemplate)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        radial-gradient(\n          ", " circle at ", "px ", "px,\n          var(--blue-500),\n          transparent 80%\n        )\n      "], ["\n        radial-gradient(\n          ", " circle at ", "px ", "px,\n          var(--blue-500),\n          transparent 80%\n        )\n      "])), visible ? radius + "px" : "0px", mouseX, mouseY),
        }} onMouseMove={handleMouseMove} onMouseEnter={function () { return setVisible(true); }} onMouseLeave={function () { return setVisible(false); }} className="p-[2px] rounded-lg transition duration-300 group/input">
        <input type={type} className={(0, utils_1.cn)("flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent \n          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 \n          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600\n           disabled:cursor-not-allowed disabled:opacity-50\n           dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]\n           group-hover/input:shadow-none transition duration-400\n           ", className)} ref={ref} {...props}/>
      </framer_motion_1.motion.div>);
});
exports.Input = Input;
Input.displayName = "Input";
var templateObject_1;
