"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var movieCollectionSchema = new mongoose_1["default"].Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    genere: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    }
});
exports["default"] = mongoose_1["default"].model('movieCollection', movieCollectionSchema);
