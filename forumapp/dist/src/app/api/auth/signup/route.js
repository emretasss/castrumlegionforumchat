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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
exports.PUT = PUT;
exports.DELETE = DELETE;
var mongodb_1 = require("@/lib/mongodb");
var User_1 = __importDefault(require("@/models/User"));
var server_1 = require("next/server");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var mongoose_1 = __importDefault(require("mongoose"));
function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var reqBody, username, email, password, userFound, hashedPassword, user, savedUser, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, (0, mongodb_1.connectDB)()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, request.json()];
                case 2:
                    reqBody = _a.sent();
                    username = reqBody.username, email = reqBody.email, password = reqBody.password;
                    console.log(reqBody);
                    return [4 /*yield*/, User_1.default.findOne({ email: email })];
                case 3:
                    userFound = _a.sent();
                    if (userFound) {
                        return [2 /*return*/, server_1.NextResponse.json({ message: "Email already exists" }, { status: 409 })];
                    }
                    return [4 /*yield*/, bcryptjs_1.default.hash(password, 12)];
                case 4:
                    hashedPassword = _a.sent();
                    user = new User_1.default({
                        username: username,
                        email: email,
                        password: hashedPassword,
                    });
                    console.log(user);
                    return [4 /*yield*/, user.save()];
                case 5:
                    savedUser = _a.sent();
                    console.log(savedUser);
                    return [2 /*return*/, server_1.NextResponse.json({
                            username: savedUser.username,
                            email: savedUser.email,
                            createdAt: savedUser.createdAt,
                            updatedAt: savedUser.updatedAt,
                        }, { status: 201 })];
                case 6:
                    error_1 = _a.sent();
                    if (error_1 instanceof mongoose_1.default.Error.ValidationError) {
                        return [2 /*return*/, server_1.NextResponse.json({ message: error_1.message }, { status: 400 })];
                    }
                    else {
                        console.error("Error during signup:", error_1);
                        return [2 /*return*/, server_1.NextResponse.error()];
                    }
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function PUT(request) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, userId, username, email, password, address, userToUpdate, hashedPassword, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, (0, mongodb_1.connectDB)()];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, request.json()];
                case 2:
                    _a = _b.sent(), userId = _a.userId, username = _a.username, email = _a.email, password = _a.password, address = _a.address;
                    if (password && password.length < 6) {
                        return [2 /*return*/, server_1.NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 })];
                    }
                    return [4 /*yield*/, User_1.default.findById(userId)];
                case 3:
                    userToUpdate = _b.sent();
                    if (!userToUpdate) {
                        return [2 /*return*/, server_1.NextResponse.json({ message: "User not found" }, { status: 404 })];
                    }
                    if (username) {
                        userToUpdate.username = username;
                    }
                    if (email) {
                        userToUpdate.email = email;
                    }
                    if (!password) return [3 /*break*/, 5];
                    return [4 /*yield*/, bcryptjs_1.default.hash(password, 12)];
                case 4:
                    hashedPassword = _b.sent();
                    userToUpdate.password = hashedPassword;
                    _b.label = 5;
                case 5:
                    if (address) {
                        userToUpdate.address = address;
                    }
                    return [4 /*yield*/, userToUpdate.save()];
                case 6:
                    _b.sent();
                    console.log(userToUpdate);
                    return [2 /*return*/, server_1.NextResponse.json({
                            message: "User updated successfully",
                            updatedUser: {
                                id: userToUpdate._id,
                                username: userToUpdate.username,
                                email: userToUpdate.email,
                                createdAt: userToUpdate.createdAt,
                                updatedAt: userToUpdate.updatedAt,
                            },
                        }, { status: 200 })];
                case 7:
                    error_2 = _b.sent();
                    if (error_2 instanceof mongoose_1.default.Error.ValidationError) {
                        return [2 /*return*/, server_1.NextResponse.json({ message: error_2.message }, { status: 400 })];
                    }
                    else {
                        console.error("Error during user update:", error_2);
                        return [2 /*return*/, server_1.NextResponse.error()];
                    }
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function DELETE(request) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, user, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, (0, mongodb_1.connectDB)()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, request.json()];
                case 2:
                    userId = (_a.sent()).userId;
                    return [4 /*yield*/, User_1.default.findById(userId)];
                case 3:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, server_1.NextResponse.json({ message: "User not found" }, { status: 404 })];
                    }
                    return [4 /*yield*/, user.remove()];
                case 4:
                    _a.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ message: "User deleted successfully" }, { status: 200 })];
                case 5:
                    error_3 = _a.sent();
                    console.error("Error during user/cart item deletion:", error_3);
                    return [2 /*return*/, server_1.NextResponse.error()];
                case 6: return [2 /*return*/];
            }
        });
    });
}
