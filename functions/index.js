
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
admin.initializeApp();
const db = admin.firestore();
// // Add User Function
exports.addUser = functions.https.onRequest((req,res) => {
    cors(req,res, async() => {
        const {name, email} = req.body;
        try {
            const docRef = await db.collection("users").add({name, email});
            res.json({message: `User added with ID: ${docRef.id}`})
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    })
});
// Fetch Users Function
exports.getUsers = functions.https.onRequest((req,res) => {
    cors(req,res, async () => {
       try {
        const snapShot = await db.collection("users").get();
        let users = [];
        snapShot.forEach((doc) => users.push({id: doc.id, ...doc.data() }));
        res.json(users);
       } catch (error) {
        res.status(500).json({error: error.message});
       }
    })
});
// update users
exports.updateUsers = functions.https.onRequest((req,res) => {
    cors(req,res, async() =>{
        const userId = req.query.id;
        const { name, email } = req.body;
        try {
            await db.collection("users").doc(userId).update({ name, email });
            res.json({ message: `User with ID: ${userId} updated` });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
});
// delete user
exports.deleteUser = functions.https.onRequest((req,res) => {
    cors(req,res,async() =>{
        const userId = req.query.id;
        try {
            await db.collection("users").doc(userId).delete();
            res.json({ message: `User with ID: ${userId} deleted` });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
});
// exports.helloWorld = functions.https.onRequest((req, res) => {
//     cors(req, res, () => {
//       res.json({ message: "Hello Ruchika!" });
//     });
//   });


// exports.greetUser = functions.https.onRequest((req,res) => {
//     const name = req.query.name || "Guest";
//     res.send(`Hello, ${name}!`);
// })