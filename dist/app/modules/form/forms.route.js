"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
// import validateRequest from '../../middlewares/validateRequest';
const forms_controller_1 = require("./forms.controller");
const router = express_1.default.Router();
router.post('/create-form', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), forms_controller_1.FormController.createForms);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), forms_controller_1.FormController.updateSingleForm);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), forms_controller_1.FormController.deleteSingleForm);
router.get('/:id', forms_controller_1.FormController.getSingleForm);
router.get('/', forms_controller_1.FormController.getForms);
exports.FormRoutes = router;
