const FirestoreInit = (function () {
    let instance;
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAExVYeyZRIjGahLpwWaylcX7FrfaahhiQ",
        authDomain: "js-online-news-app.firebaseapp.com",
        databaseURL: "https://js-online-news-app.firebaseio.com",
        projectId: "js-online-news-app",
        storageBucket: "js-online-news-app.appspot.com",
        messagingSenderId: "831861925918"
    };
    firebase.initializeApp(config);
    // Initialize Cloud Firestore through Firebase
    var db = firebase.firestore();
    // db.collection("favorite-news").get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //     console.log(`${doc.id}`);
    //     console.dir(doc.data());
    //     });
    // });
    function getDb() {
        return db;
    }
    
    function createInstance() {
        return {
            getDb
        }
    }
    return {
        getInstance() {
            return instance || (instance = createInstance());
        }
    }
})();