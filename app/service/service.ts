import { Model, Document, FilterQuery, UpdateQuery } from "mongoose";

export async function create<T extends Document>(model: Model<T>, body: Object): Promise<T> {
  return await model.create(body);
}

export async function upsert<T extends Document>(model: Model<T>, filter: FilterQuery<T>, body: UpdateQuery<T>): Promise<T | null> {
  return await model.findOneAndUpdate(filter, body, {
    new: true,
    upsert: true,
    runValidators: true,
    context: "query",
  });
}

export async function find<T extends Document>(model: Model<T>, filter: FilterQuery<T>, projection?: any, sort?: any, select?: string): Promise<T[]> {
  let query = model.find(filter, projection).sort(sort).lean();

  if (select) {
    query = query.select(select);
  }

  return (await query.exec()) as T[];
}

export async function findOne<T extends Document>(model: Model<T>, filter: FilterQuery<T>, projection?: any): Promise<T | null> {
  return await model.findOne(filter, projection);
}

export async function countDocuments<T extends Document>(model: Model<T>, filter: FilterQuery<T>): Promise<number> {
  return await model.countDocuments(filter);
}

export async function findOneAndUpdate<T extends Document>(model: Model<T>, filter: FilterQuery<T>, body: UpdateQuery<T>): Promise<T | null> {
  return await model.findOneAndUpdate(filter, body, { new: true });
}

export async function findOneAndSoftDelete<T extends Document>(model: Model<T>, filter: FilterQuery<T>, body: UpdateQuery<T>): Promise<T | null> {
  return await model.findOneAndUpdate(filter, body, { new: true });
}

export async function findOneAndHardDelete<T extends Document>(model: Model<T>, filter: FilterQuery<T>): Promise<T | null> {
  return await model.findOneAndDelete(filter);
}

export async function deleteMany<T extends Document>(model: Model<T>, filter: FilterQuery<T>): Promise<{ deletedCount?: number }> {
  return await model.deleteMany(filter);
}
