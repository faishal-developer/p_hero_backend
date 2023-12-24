"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/users/user.route");
const quiz_route_1 = require("../modules/quiz/quiz.route");
const forms_route_1 = require("../modules/form/forms.route");
const quiz_numbers_route_1 = require("../modules/quiz_numbers/quiz_numbers.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        route: auth_route_1.authRoutes,
    },
    {
        path: '/users',
        route: user_route_1.userRoutes,
    },
    {
        path: '/quiz',
        route: quiz_route_1.QuizRoutes,
    },
    {
        path: '/quizmarks',
        route: quiz_numbers_route_1.QuizMarksRoutes,
    },
    {
        path: '/form',
        route: forms_route_1.FormRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
