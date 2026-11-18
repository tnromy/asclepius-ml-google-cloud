const { Firestore } = require('@google-cloud/firestore');

// Memakai database (default) pada project Cloud Run yang sedang berjalan
const db = new Firestore();
const predictCollection = db.collection('predictions');

async function storeData(id, data) {
  return predictCollection.doc(id).set(data);
}

async function getAllData() {
  const snapshot = await predictCollection.get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    history: doc.data(),
  }));
}

module.exports = { storeData, getAllData };
