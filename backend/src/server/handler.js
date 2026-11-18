const crypto = require('crypto');
const predictClassification = require('../services/inferenceService');
const { storeData, getAllData } = require('../services/firestoreService');

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { result, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id,
    result,
    suggestion,
    createdAt,
  };

  await storeData(id, data);

  return h.response({
    status: 'success',
    message: 'Model is predicted successfully',
    data,
  }).code(201);
}

async function getPredictHistoriesHandler(request, h) {
  const histories = await getAllData();

  return h.response({
    status: 'success',
    data: histories,
  }).code(200);
}

module.exports = { postPredictHandler, getPredictHistoriesHandler };
