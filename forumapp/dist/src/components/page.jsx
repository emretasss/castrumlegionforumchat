"use strict";
"use client";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var chat_module_css_1 = __importDefault(require("./chat.module.css"));
var ChatPage = function (_a) {
    var socket = _a.socket, username = _a.username, roomId = _a.roomId;
    var _b = (0, react_1.useState)(""), currentMsg = _b[0], setCurrentMsg = _b[1];
    var _c = (0, react_1.useState)([]), chat = _c[0], setChat = _c[1];
    var sendData = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var msgData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!(currentMsg !== "")) return [3 /*break*/, 2];
                    msgData = {
                        roomId: roomId,
                        user: username,
                        msg: currentMsg,
                        time: new Date(Date.now()).getHours() +
                            ":" +
                            new Date(Date.now()).getMinutes(),
                    };
                    return [4 /*yield*/, socket.emit("send_msg", msgData)];
                case 1:
                    _a.sent();
                    setCurrentMsg("");
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        socket.on("receive_msg", function (data) {
            setChat(function (pre) { return __spreadArray(__spreadArray([], pre, true), [data], false); });
        });
    }, [socket]);
    return (<div className={chat_module_css_1.default.chat_div}>
      <div className={chat_module_css_1.default.chat_border}>
        <div style={{ marginBottom: "1rem" }}>
          <p>
            Name: <b>{username}</b> and Room Id: <b>{roomId}</b>
          </p>
        </div>
        <div>
          {chat.map(function (_a, key) {
            var roomId = _a.roomId, user = _a.user, msg = _a.msg, time = _a.time;
            return (<div key={key} className={user == username
                    ? chat_module_css_1.default.chatProfileRight
                    : chat_module_css_1.default.chatProfileLeft}>
              <span className={chat_module_css_1.default.chatProfileSpan} style={{ textAlign: user == username ? "right" : "left" }}>
                {user.charAt(0)}
              </span>
              <h3 style={{ textAlign: user == username ? "right" : "left" }}>
                {msg}
              </h3>
            </div>);
        })}
        </div>
        <div>
          <form onSubmit={function (e) { return sendData(e); }}>
            <input className={chat_module_css_1.default.chat_input} type="text" value={currentMsg} placeholder="Type your message.." onChange={function (e) { return setCurrentMsg(e.target.value); }}/>
            <button className={chat_module_css_1.default.chat_button}>Send</button>
          </form>
        </div>
      </div>
    </div>);
};
exports.default = ChatPage;
