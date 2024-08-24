"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
var react_1 = require("react");
var socket_io_client_1 = require("socket.io-client");
var ChatPage_1 = __importDefault(require("@/components/ChatPage"));
var page_module_css_1 = __importDefault(require("./page.module.css"));
function Home() {
    var _a = (0, react_1.useState)(false), showChat = _a[0], setShowChat = _a[1];
    var _b = (0, react_1.useState)(""), userName = _b[0], setUserName = _b[1];
    var _c = (0, react_1.useState)(false), showSpinner = _c[0], setShowSpinner = _c[1];
    var _d = (0, react_1.useState)(""), roomId = _d[0], setRoomId = _d[1];
    // Socket.io bağlantısı
    var socket = (0, socket_io_client_1.io)("http://localhost:3001");
    // Odaya katılma fonksiyonu
    var handleJoin = function () {
        if (userName.trim() !== "" && roomId.trim() !== "") {
            console.log("UserName:", userName, "RoomId:", roomId);
            socket.emit("join_room", roomId);
            setShowSpinner(true);
            // Chat ekranını göster ve spinner'ı gizle
            setTimeout(function () {
                setShowChat(true);
                setShowSpinner(false);
            }, 4000);
        }
        else {
            alert("Please fill in Username and Room Id");
        }
    };
    return (<div className={page_module_css_1.default.main_div}>
      {!showChat ? (<div className={page_module_css_1.default.form_container}>
          <input className={page_module_css_1.default.main_input} type="text" placeholder="Username" onChange={function (e) { return setUserName(e.target.value); }} disabled={showSpinner}/>
          <input className={page_module_css_1.default.main_input} type="text" placeholder="Room ID" onChange={function (e) { return setRoomId(e.target.value); }} disabled={showSpinner}/>
          <button className={page_module_css_1.default.main_button} onClick={handleJoin}>
            {!showSpinner ? "Join" : <div className={page_module_css_1.default.loading_spinner}></div>}
          </button>
        </div>) : (<ChatPage_1.default socket={socket} roomId={roomId} username={userName}/>)}
    </div>);
}
