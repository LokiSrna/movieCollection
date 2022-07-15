"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var castSchema = new mongoose_1["default"].Schema({
    name: {
        type: String,
        required: true
    },
    movieId: {
        type: String,
        required: true
    }
});
exports["default"] = mongoose_1["default"].model('cast', castSchema);
