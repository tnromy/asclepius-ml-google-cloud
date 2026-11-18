const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const loadModel = require('../services/loadModel');
const InputError = require('../exceptions/InputError');

(async () => {
  const server = Hapi.server({
    port: process.env.PORT || 8080,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.app.model = await loadModel();

  server.route(routes);

  // Seragamkan format error untuk seluruh endpoint
  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof InputError) {
      return h.response({
        status: 'fail',
        message: response.message,
      }).code(response.statusCode);
    }

    if (response.isBoom) {
      return h.response({
        status: 'fail',
        message: response.message,
      }).code(response.output.statusCode);
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server start at: ${server.info.uri}`);
})();
