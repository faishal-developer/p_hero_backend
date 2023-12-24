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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const helper_1 = require("../../../shared/helper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const signUp = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.create({ data });
    return result;
});
const login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = data;
    const isUserExist = yield prisma_1.default.user.findFirst({
        where: {
            email: email,
        },
    });
    console.log(isUserExist);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Wrong user or password ');
    }
    const passwordMatched = yield bcrypt_1.default.compare(password, isUserExist.password);
    if (!passwordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    const response = {
        email: isUserExist.email,
        role: isUserExist.role,
        id: isUserExist.id,
    };
    const accessToken = (0, helper_1.generateAccessToken)(response);
    const refreshToken = (0, helper_1.generateRefreashToken)(response);
    return {
        accessToken,
        refreshToken,
        user: response,
    };
});
exports.authService = {
    signUp,
    login,
};
