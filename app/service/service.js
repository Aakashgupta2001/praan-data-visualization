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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMany = exports.findOneAndHardDelete = exports.findOneAndSoftDelete = exports.findOneAndUpdate = exports.countDocuments = exports.findOne = exports.find = exports.upsert = exports.create = void 0;
function create(model, body) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield model.create(body);
    });
}
exports.create = create;
function upsert(model, filter, body) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield model.findOneAndUpdate(filter, body, {
            new: true,
            upsert: true,
            runValidators: true,
            context: "query",
        });
    });
}
exports.upsert = upsert;
function find(model, filter, projection, sort, select) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = model.find(filter, projection).sort(sort).lean();
        if (select) {
            query = query.select(select);
        }
        return (yield query.exec());
    });
}
exports.find = find;
function findOne(model, filter, projection) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield model.findOne(filter, projection);
    });
}
exports.findOne = findOne;
function countDocuments(model, filter) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield model.countDocuments(filter);
    });
}
exports.countDocuments = countDocuments;
function findOneAndUpdate(model, filter, body) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield model.findOneAndUpdate(filter, body, { new: true });
    });
}
exports.findOneAndUpdate = findOneAndUpdate;
function findOneAndSoftDelete(model, filter, body) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield model.findOneAndUpdate(filter, body, { new: true });
    });
}
exports.findOneAndSoftDelete = findOneAndSoftDelete;
function findOneAndHardDelete(model, filter) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield model.findOneAndDelete(filter);
    });
}
exports.findOneAndHardDelete = findOneAndHardDelete;
function deleteMany(model, filter) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield model.deleteMany(filter);
    });
}
exports.deleteMany = deleteMany;
