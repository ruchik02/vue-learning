
const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
exports.helloWorld = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      res.json({ message: "Hello Ruchika!" });
    });
  });

// exports.greetUser = functions.https.onRequest((req,res) => {
//     const name = req.query.name || "Guest";
//     res.send(`Hello, ${name}!`);
// })