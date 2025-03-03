
const functions = require("firebase-functions");
exports.helloWorld = functions.https.onCall((data, context) => {
    return { message: `Hello, ${data.name}!` };
  })

exports.greetUser = functions.https.onRequest((req,res) => {
    const name = req.query.name || "Guest";
    res.send(`Hello, ${name}!`);
})