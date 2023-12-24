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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const quiz_constant_1 = require("./quiz.constant");
const createQuizs = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.quiz.create({
        data,
    });
    return result;
});
const getQuizs = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    options.limit = (options === null || options === void 0 ? void 0 : options.size) || 10;
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: quiz_constant_1.QuizSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                return {
                    [key]: {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        equals: filterData[key],
                    },
                };
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.quiz.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.quiz.count({
        where: whereConditions,
    });
    console.log(whereConditions['AND']);
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getSingleQuiz = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.quiz.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateSingleQuiz = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.quiz.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
const deleteSingleQuiz = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.quiz.delete({
        where: {
            id,
        },
    });
    return {};
});
exports.QuizService = {
    getQuizs,
    createQuizs,
    getSingleQuiz,
    updateSingleQuiz,
    deleteSingleQuiz,
};
