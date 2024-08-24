"use strict";
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
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var mongodb_1 = require("../lib/mongodb"); // MongoDB bağlantı fonksiyonunu içe aktar
var Message_1 = require("../models/Message"); // Mesaj modelini içe aktar
// HTTP sunucusu oluştur
var httpServer = http_1.default.createServer();
// Socket.io sunucusu oluştur ve HTTP sunucusuna bağla
var io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000', // React uygulamanızın çalıştığı URL
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true,
    },
});
// MongoDB bağlantısı kur
var initializeDB = function () { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, mongodb_1.connectDB)()];
            case 1:
                _a.sent();
                console.log('Connected to MongoDB');
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.error('MongoDB connection error:', err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Socket.io olaylarını yönet
io.on('connection', function (socket) {
    console.log('A user connected:', socket.id);
    // Odaya katılma
    socket.on('join_room', function (roomId) {
        socket.join(roomId);
        console.log("User with id-".concat(socket.id, " joined room - ").concat(roomId));
    });
    // Mesaj gönderme
    socket.on('send_msg', function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var newMessage, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Received message data:', data);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    newMessage = new Message_1.default({
                        roomId: data.roomId,
                        userName: data.userName,
                        text: data.text,
                    });
                    return [4 /*yield*/, newMessage.save()];
                case 2:
                    _a.sent();
                    // Mesajı belirli bir odaya gönder
                    io.to(data.roomId).emit('receive_msg', data);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error saving message:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // Bağlantı kesildiğinde
    socket.on('disconnect', function () {
        console.log('A user disconnected:', socket.id);
    });
});
// Sunucuyu başlat
var PORT = process.env.PORT || 3001;
httpServer.listen(PORT, function () {
    console.log("Socket.io server is running on port ".concat(PORT));
});
// Veritabanı bağlantısını başlat
initializeDB();
