
const functions = require("firebase-functions");
exports.helloWorld = functions.https.onRequest((req, res) => {
    res.json({ message: "Hello from Firebase Cloud Functions!" });
  });