// mongodb global queiry service

// create
exports.create = async (model, body) => {
  return await model.create(body);
};

//find one and update, create new if not found
exports.upsert = async (model, filter, body) => {
  return await model.findOneAndUpdate(filter, body, {
    new: true,
    upsert: true,
    runValidators: true,
    context: "query",
  });
};

// find and filter
exports.find = async (model, filter, projection = {}, pagination = {}, sort = {}, populate = "", select = "") => {
  return await model.find(filter, projection).skip(pagination.skip).limit(pagination.limit).sort(sort).populate(populate).select(select).lean();
};

//find a single document with filter
exports.findOne = async (model, filter, projection = {}, populate = "") => {
  return await model.findOne(filter, projection).populate(populate);
};

//count documetns
exports.countDocuments = async (model, filter) => {
  return await model.countDocuments(filter);
};

// updates
exports.findOneAndUpdate = async (model, filter, body) => {
  return await model.findOneAndUpdate(filter, body, { new: true });
};

exports.updateMany = async (model, filter, body) => {
  return await model.updateMany(filter, body, { new: true });
};

// delete
exports.findOneAndSoftDelete = async (model, filter, body) => {
  return await model.findOneAndUpdate(filter, body, { new: true });
};

exports.findOneAndHardDelete = async (model, filter) => {
  return await model.findOneAndDelete(filter);
};

exports.deleteMany = async (model, filter) => {
  return await model.deleteMany(filter);
};

// aggregation
exports.aggregate = async (model, query) => {
  return await model.aggregate(query);
};
