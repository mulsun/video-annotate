// Imports the Google Cloud Node.js client library
const { Storage } = require("@google-cloud/storage");
// Imports the Google Cloud Video Intelligence library
const videoIntelligence = require("@google-cloud/video-intelligence");

// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
// const firebaseFunctions = require("firebase-functions");
// The Firebase Admin SDK to access Firestore.
const firebaseAdmin = require("firebase-admin");
firebaseAdmin.initializeApp();

const serviceAccount = require("./config/service-account-key.json");

firebaseAdmin.initializeApp({ credential: firebaseAdmin.credential.cert(serviceAccount) });

const db = firebaseAdmin.firestore();
const data = {
  name: "Los Angeles",
  state: "CA",
  country: "USA",
};

// Creates a Storage client
const storage = new Storage();

// Creates a Video Intelligence client
const gcviClient = new videoIntelligence.VideoIntelligenceServiceClient();

exports.entryPoint = async (file, context) => {
  if (file.name.split(".").pop() != "mp4") return;
  // The GCS uri of the video to analyze
  const gcsBucket = file.bucket;
  const fileName = file.name;
  const gcsUri = `gs://${gcsBucket}/${fileName}`;
  // Construct request
  const request = {
    inputUri: gcsUri,
    features: ["LABEL_DETECTION"],
  };
  // Execute request
  const [operation] = await gcviClient.annotateVideo(request);
  const [operationResult] = await operation.promise();
  const fileContents = JSON.stringify(operationResult);

  // upload output to bucket
  await storage
    .bucket(gcsBucket)
    .file(`${fileName.split(".").shift()}.json`)
    .save(fileContents, { resumable: false })
    .catch(console.error);

  // Take the text parameter passed to this HTTP endpoint and insert it into
  // Firestore under the path /messages/:documentId/original
  await db.collection("videos").doc("testVideo").set(data);
};
