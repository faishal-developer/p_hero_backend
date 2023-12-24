"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizMarksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const quiz_numbers_controller_1 = require("./quiz_numbers.controller");
const quiz_numbers_zod_1 = require("./quiz_numbers.zod");
const router = express_1.default.Router();
router.post('/create-quizmarks', (0, validateRequest_1.default)(quiz_numbers_zod_1.QuizMarksZodSchema.create), quiz_numbers_controller_1.QuizMarksController.createQuizMarks);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(quiz_numbers_zod_1.QuizMarksZodSchema.update), quiz_numbers_controller_1.QuizMarksController.updateSingleQuizMarks);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), quiz_numbers_controller_1.QuizMarksController.deleteSingleQuizMarks);
router.get('/:id', quiz_numbers_controller_1.QuizMarksController.getSingleQuizMarks);
router.get('/', quiz_numbers_controller_1.QuizMarksController.getQuizMarkss);
exports.QuizMarksRoutes = router;
