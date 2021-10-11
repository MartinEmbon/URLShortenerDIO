"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const URLController_1 = require("./controller/URLController");
const express_1 = __importDefault(require("express"));
const MongoConnection_1 = require("./database/MongoConnection");
const api = (0, express_1.default)();
api.use(express_1.default.json());
const urlController = new URLController_1.URLController();
const database = new MongoConnection_1.MongoConnection();
database.connect();
var path = require('path');
api.set("views", path.join(__dirname, "views"));
api.set("view engine", "ejs");
api.post('/shorten', urlController.shorten);
api.get("/hash", urlController.redirect);
api.get("/", urlController.home);
api.get("/test", (req, res) => {
    res.json({ sucess: true });
});
api.listen(5000, () => console.log("express rodando"));
//# sourceMappingURL=index.js.map