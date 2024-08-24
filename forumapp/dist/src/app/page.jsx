"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
var react_1 = require("react");
var react_2 = require("next-auth/react");
var link_1 = __importDefault(require("next/link"));
var ModeToggle_1 = __importDefault(require("@/components/ModeToggle"));
function Home() {
    var status = (0, react_2.useSession)().status;
    var _a = (0, react_1.useState)('general'), room = _a[0], setRoom = _a[1]; // Varsayılan oda adı
    var showSession = function () {
        if (status === "authenticated") {
            return (<>
          <button className="text-[#888] text-sm text-999 mt-7 transition duration-150 ease hover:text-white" onClick={function () {
                    (0, react_2.signOut)();
                }}>
            Logout here
          </button>
          <link_1.default href="/forum" className="text-[#888] text-sm text-999 mt-7 transition duration-150 ease hover:text-white">
            Go to Forum
          </link_1.default>
        </>);
        }
        else if (status === "loading") {
            return (<span className="text-[#888] text-sm mt-7">Loading...</span>);
        }
        else {
            return (<>
          <link_1.default href="/login" className="text-[#888] text-sm text-999 mt-7 transition duration-150 ease hover:text-white">
            Login here
          </link_1.default>
          <link_1.default href="/forum" className="text-[#888] text-sm text-999 mt-7 transition duration-150 ease hover:text-white">
            Go to Forum
          </link_1.default>
        </>);
        }
    };
    return (<main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-xl">NextAuth APP</h1>
      {showSession()}

      <ModeToggle_1.default />
    </main>);
}
