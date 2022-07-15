"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
mongoose_1["default"].connect(process.env.DB_URL);
var db = mongoose_1["default"].connection;
db.on('error', function (error) { return console.error(error); });
exports["default"] = db;
