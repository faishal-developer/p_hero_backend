"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const quiz_controller_1 = require("./quiz.controller");
const quiz_zod_1 = require("./quiz.zod");
const router = express_1.default.Router();
router.post('/create-quiz', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(quiz_zod_1.QuizZodSchema.create), quiz_controller_1.QuizController.createQuizs);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(quiz_zod_1.QuizZodSchema.update), quiz_controller_1.QuizController.updateSingleQuiz);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), quiz_controller_1.QuizController.deleteSingleQuiz);
router.get('/:id', quiz_controller_1.QuizController.getSingleQuiz);
router.get('/', quiz_controller_1.QuizController.getQuizs);
exports.QuizRoutes = router;
