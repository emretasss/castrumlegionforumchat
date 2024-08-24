"use strict";
"use client";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginPage;
var label_1 = require("@/components/ui/label");
var input_1 = require("@/components/ui/input");
var utils_1 = require("@/lib/utils");
var icons_react_1 = require("@tabler/icons-react");
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var use_toast_1 = require("@/components/ui/use-toast");
var button_1 = require("@/components/ui/button");
var react_2 = require("next-auth/react");
function LoginPage() {
    var _this = this;
    var router = (0, navigation_1.useRouter)();
    var session = (0, react_2.useSession)().data;
    var toast = (0, use_toast_1.useToast)().toast;
    var _a = (0, react_1.useState)({
        email: "",
        password: "",
        redirect: false,
    }), user = _a[0], setUser = _a[1];
    (0, react_1.useEffect)(function () {
        if (session === null || session === void 0 ? void 0 : session.user) {
            router.push("/");
        }
    }, [session, router]);
    var onLogin = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, react_2.signIn)("credentials", user)];
                case 1:
                    response = _a.sent();
                    console.log(response);
                    if (response === null || response === void 0 ? void 0 : response.error) {
                        showErrorToast(response.error);
                    }
                    else {
                        showToast("Succesfuly");
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    showErrorToast("Error");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    function showErrorToast(message) {
        toast({
            variant: "destructive",
            title: "Logion failed",
            description: message,
        });
    }
    function showToast(message) {
        toast({
            variant: "default",
            title: "Login Succesfuly",
            description: message,
        });
    }
    return (<div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black border border-gray-700 ">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                LOGIN
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                Castrum Legionsa hoş geldiniz. Unutmayın biz bir aileyiz
            </p>

            <div className="my-8">
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">

                </div>
                <LabelInputContainer className="mb-4">
                    <label_1.Label htmlFor="email">Email Address</label_1.Label>
                    <input_1.Input id="email" placeholder="projectmayhem@fc.com" type="email" value={user.email} onChange={function (e) { return setUser(__assign(__assign({}, user), { email: e.target.value })); }}/>
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <label_1.Label htmlFor="password">Password</label_1.Label>
                    <input_1.Input id="password" placeholder="••••••••" type="password" value={user.password} onChange={function (e) { return setUser(__assign(__assign({}, user), { password: e.target.value })); }}/>
                </LabelInputContainer>


                <button onClick={onLogin} className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]" type="submit">
                    Login &rarr;
                    <BottomGradient />
                </button>

                <button_1.Button variant={"link"} onClick={function () { return router.push("/register"); }} className=" text-gray-500 mt-3">
                    Don&apos;t have an account? Register
                </button_1.Button>
                <button_1.Button variant={"link"} onClick={function () { return router.push("/forgotpassword"); }} className=" text-gray-500 mt-3">
                    Forgot password
                </button_1.Button>

                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full"/>

                <div className="flex flex-col space-y-4">
                    <button onClick={function (e) {
            e.preventDefault();
            (0, react_2.signIn)("github");
        }} className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]" type="submit">
                        <icons_react_1.IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300"/>
                        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                            GitHub
                        </span>
                        <BottomGradient />
                    </button>
                    <button onClick={function (e) {
            e.preventDefault();
            (0, react_2.signIn)("google");
        }} className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]" type="submit">
                        <icons_react_1.IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300"/>
                        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                            Google
                        </span>
                        <BottomGradient />
                    </button>
                    <button className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]" type="submit">
                        <icons_react_1.IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300"/>
                        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                            OnlyFans
                        </span>
                        <BottomGradient />

                    </button>
                </div>
            </div>
        </div>);
}
var BottomGradient = function () {
    return (<>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"/>
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"/>
        </>);
};
var LabelInputContainer = function (_a) {
    var children = _a.children, className = _a.className;
    return (<div className={(0, utils_1.cn)("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>);
};
