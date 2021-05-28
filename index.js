"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var app = express_1.default();
app.set('view engine', 'ejs');
app.use(cors_1.default());
app.set('views', __dirname + '/src/views');
app.use(express_1.default.static(path_1.default.join(__dirname, 'src/public')));
app.get("/", function (req, res) {
    res.render("index");
});
app.get("/cadastrar/:id?", function (req, res) {
    res.render("cadastrar");
});
app.get("/lista", function (req, res) {
    res.render("lista");
});
app.listen(process.env.PORT || 3000, function () { });
