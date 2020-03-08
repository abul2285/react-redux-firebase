const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const createNotification = (notification, doc) => {
  return admin
    .firestore()
    .doc(`notifications/${doc.id}`)
    .set(notification)
    .then(doc => console.log("notification added", doc));
};

exports.onPostCreated = functions.firestore
  .document("posts/{postId}")
  .onCreate(doc => {
    const post = doc.data();
    const notification = {
      content: "Added a new post",
      user: post.owner,
      time: admin.firestore.FieldValue.serverTimestamp()
    };
    return createNotification(notification, doc);
  });

exports.onLikePost = functions.firestore
  .document("likes/{likeId}")
  .onCreate(ldoc => {
    const likeDoc = ldoc.data();
    return admin
      .firestore()
      .collection(`posts/${doc.likeDoc.postId}`)
      .get()
      .then(pdoc => {
        let postDoc = pdoc.data();
        const notification = {
          sender: likeDoc.liker,
          receiver: postDoc.creator,
          type: "like",
          time: admin.firestore.FieldValue.serverTimestamp(),
          read: false
        };
        return createNotification(notification, ldoc);
      });
  });

exports.onUnlikePost = functions.firestore
  .document("likes/{likeId}")
  .onDelete(doc => {
    return admin
      .firestore()
      .doc(`notifications/${doc.id}`)
      .delete()
      .catch(err => {
        console.log(err);
        return;
      });
  });

exports.onCommentPost = functions.firestore
  .document("comments/{commentId}")
  .onCreate(cDoc => {
    const comment = cDoc.data();
    return admin
      .firestore()
      .doc(`posts/${comment.postId}`)
      .get()
      .then(pDoc => {
        const post = pDoc.data();
        const notification = {
          sender: comment.commenter,
          receiver: post.owner,
          type: "comment",
          time: admin.firestore.FieldValue.serverTimestamp(),
          read: false
        };
        return createNotification(notification, cDoc);
      });
  });
