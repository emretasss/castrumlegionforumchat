"use strict";
"use client";
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
var react_1 = require("react");
var ChatPage_module_css_1 = __importDefault(require("./ChatPage.module.css"));
var ChatPage = function (_a) {
    var socket = _a.socket, roomId = _a.roomId, username = _a.username;
    var _b = (0, react_1.useState)(""), message = _b[0], setMessage = _b[1];
    var _c = (0, react_1.useState)([]), messages = _c[0], setMessages = _c[1];
    (0, react_1.useEffect)(function () {
        socket.on("receive_message", function (newMessage) {
            setMessages(function (prevMessages) { return __spreadArray(__spreadArray([], prevMessages, true), [newMessage], false); });
        });
        // Cleanup on component unmount
        return function () {
            socket.off("receive_message");
        };
    }, [socket]);
    var handleSend = function () {
        if (message.trim() !== "") {
            socket.emit("send_message", { username: username, message: message, roomId: roomId });
            setMessage("");
        }
    };
    return (<div className={ChatPage_module_css_1.default.chat_container}>
      <div className={ChatPage_module_css_1.default.chat_messages}>
        {messages.map(function (msg, index) { return (<div key={index} className={ChatPage_module_css_1.default.chat_message}>
            <div className={ChatPage_module_css_1.default.chat_message_username}>{msg.username}</div>
            <div className={ChatPage_module_css_1.default.chat_message_text}>{msg.message}</div>
          </div>); })}
      </div>
      <div className={ChatPage_module_css_1.default.chat_input_area}>
        <input type="text" className={ChatPage_module_css_1.default.chat_input} value={message} onChange={function (e) { return setMessage(e.target.value); }} placeholder="Type a message..."/>
        <button className={ChatPage_module_css_1.default.chat_button} onClick={handleSend}>Send</button>
      </div>
    </div>);
};
exports.default = ChatPage;
