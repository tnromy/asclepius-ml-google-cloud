const { postPredictHandler, getPredictHistoriesHandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/predict',
    handler: postPredictHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        // Batas ukuran gambar 1MB; Hapi otomatis membalas 413 bila terlampaui
        maxBytes: 1000000,
      },
    },
  },
  {
    method: 'GET',
    path: '/predict/histories',
    handler: getPredictHistoriesHandler,
  },
];

module.exports = routes;
