
const { getStipendCollection } = require('../models/db');

exports.createStipend = async (data) => {
  const collection = getStipendCollection();
  
  if (Array.isArray(data)) {
    return await collection.insertMany(data);
  } else {
    return await collection.insertOne(data);
  }
};