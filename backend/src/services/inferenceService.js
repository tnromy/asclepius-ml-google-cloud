const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = score[0] * 100;
    tf.dispose([tensor, prediction]);

    // Binary classification: di atas 50% = Cancer, selain itu Non-cancer
    if (confidenceScore > 50) {
      return { result: 'Cancer', suggestion: 'Segera periksa ke dokter!' };
    }
    return { result: 'Non-cancer', suggestion: 'Penyakit kanker tidak terdeteksi.' };
  } catch (error) {
    throw new InputError('Terjadi kesalahan dalam melakukan prediksi');
  }
}

module.exports = predictClassification;
