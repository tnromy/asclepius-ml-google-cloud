const tf = require('@tensorflow/tfjs-node');

// Model graph TensorFlow.js dimuat dari Cloud Storage bucket (MODEL_URL)
async function loadModel() {
  return tf.loadGraphModel(process.env.MODEL_URL);
}

module.exports = loadModel;
