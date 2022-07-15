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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var dotenv = require("dotenv");
dotenv.config();
var express_1 = require("express");
var bodyParser = require("body-parser");
var express_ejs_layouts_1 = require("express-ejs-layouts");
var date_fns_1 = require("date-fns");
var mongoDb_1 = require("./config/mongoDb");
mongoDb_1["default"].once('open', function () { return console.log('Connection established'); });
var movieCollection_1 = require("./model/movieCollection");
var cast_1 = require("./model/cast");
var app = (0, express_1["default"])();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Static files
app.use(express_1["default"].static('src/public'));
app.use('/css', express_1["default"].static(__dirname + 'public/css'));
// Template engine
app.use(express_ejs_layouts_1["default"]);
app.set('views', './src/views/');
app.set('view engine', 'ejs');
app.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var senderData, data, _i, data_1, item, castList, localData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                senderData = Array();
                return [4 /*yield*/, movieCollection_1["default"].find()];
            case 1:
                data = _a.sent();
                _i = 0, data_1 = data;
                _a.label = 2;
            case 2:
                if (!(_i < data_1.length)) return [3 /*break*/, 5];
                item = data_1[_i];
                return [4 /*yield*/, cast_1["default"].find({ movieId: item.id })];
            case 3:
                castList = _a.sent();
                senderData.push({
                    id: item.id,
                    name: item.name,
                    rating: item.rating,
                    genere: item.genere,
                    releaseDate: (0, date_fns_1.format)(item.releaseDate, 'dd-MM-yyyy'),
                    cast: castList
                });
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                localData = {
                    title: "Collection List",
                    movieList: senderData
                };
                res.render('index', localData);
                return [2 /*return*/];
        }
    });
}); });
app.get('/add', function (req, res) {
    var localData = {
        title: "Add new collection"
    };
    res.render('add', localData);
});
app.post('/add', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newMovieData, newMovie, newMovieId, castList, _i, castList_1, castName, newCastData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newMovieData = new movieCollection_1["default"]({
                    name: req.body.name,
                    rating: req.body.rating,
                    genere: req.body.genere,
                    releaseDate: req.body.releaseDate
                });
                return [4 /*yield*/, newMovieData.save()];
            case 1:
                newMovie = _a.sent();
                newMovieId = newMovie.id;
                castList = req.body.cast;
                _i = 0, castList_1 = castList;
                _a.label = 2;
            case 2:
                if (!(_i < castList_1.length)) return [3 /*break*/, 5];
                castName = castList_1[_i];
                newCastData = new cast_1["default"]({
                    name: castName,
                    movieId: newMovieId
                });
                return [4 /*yield*/, newCastData.save()];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                res.redirect('/?msg=Success');
                return [2 /*return*/];
        }
    });
}); });
app.get("/edit/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, movieData, data, castData, castList, localData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                if (!id)
                    res.redirect('/');
                return [4 /*yield*/, movieCollection_1["default"].find({ _id: id })];
            case 1:
                movieData = _a.sent();
                data = {
                    name: movieData[0].name,
                    rating: movieData[0].rating,
                    genere: movieData[0].genere,
                    releaseDate: (0, date_fns_1.format)(movieData[0].releaseDate, 'yyyy-MM-dd')
                };
                return [4 /*yield*/, cast_1["default"].find({ movieId: id })];
            case 2:
                castData = _a.sent();
                castList = castData.map(function (item) {
                    return item.name;
                });
                localData = {
                    movie: {
                        details: data,
                        castList: castList
                    },
                    title: "Edit Collecttion"
                };
                res.render('edit', localData);
                return [2 /*return*/];
        }
    });
}); });
app.post("/edit/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, castList, _i, castList_2, castName, newCastData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                if (!id)
                    res.redirect('/');
                return [4 /*yield*/, movieCollection_1["default"].updateOne({ id: id }, {
                        name: req.body.name,
                        rating: req.body.rating,
                        genere: req.body.genere,
                        releaseDate: req.body.releaseDate
                    })];
            case 1:
                _a.sent();
                return [4 /*yield*/, cast_1["default"].deleteMany({ movieId: id })];
            case 2:
                _a.sent();
                castList = req.body.cast;
                _i = 0, castList_2 = castList;
                _a.label = 3;
            case 3:
                if (!(_i < castList_2.length)) return [3 /*break*/, 6];
                castName = castList_2[_i];
                newCastData = new cast_1["default"]({
                    name: castName,
                    movieId: id
                });
                return [4 /*yield*/, newCastData.save()];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6:
                res.redirect('/?msg=Success');
                return [2 /*return*/];
        }
    });
}); });
app.get("/delete/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                if (!id)
                    res.redirect('/');
                // res.json(data)
                return [4 /*yield*/, movieCollection_1["default"].deleteOne({ _id: id })];
            case 1:
                // res.json(data)
                _a.sent();
                return [4 /*yield*/, cast_1["default"].deleteMany({ movieId: id })];
            case 2:
                _a.sent();
                res.redirect('/?msg=Success');
                return [2 /*return*/];
        }
    });
}); });
app.listen(process.env.PORT || 3000, function () {
    return console.log("Listening at http://localhost:".concat(process.env.PORT));
});
