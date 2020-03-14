// web app's Firebase configuration
var firebaseConfig = {
    //firebase config stuff
    apiKey: "AIzaSyDmvEacD4-rg4ROS4yv9M9W9haigGqrWXI",
    authDomain: "witsturks-84dd0.firebaseapp.com",
    databaseURL: "https://witsturks-84dd0.firebaseio.com",
    projectId: "witsturks-84dd0",
    storageBucket: "witsturks-84dd0.appspot.com",
    messagingSenderId: "715634280158",
    appId: "1:715634280158:web:751406c3fa3e7fedd4644f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Get a reference to the database service
// var database = firebase.database();

const auth = firebase.auth();
var database = firebase.database();

function addUser(userId, name, email) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email
    });
}

function signUp() {
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var userId = firebase.auth().currentUser.uid;
    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));

    // alert("Signed Up");
    addUser(userId, name, email)
    authorization();
}



function signIn() {

    var email = document.getElementById("email");

    var password = document.getElementById("password");

    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));

    authorization();

}


function signOut() {

    auth.signOut();
    // alert("Signed Out");
    openInNewTab('login.html');

}

function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

function authorization() {
    auth.onAuthStateChanged(function(user) {

        if (user) {

            var email = user.email;
            // alert("Active User " + email);

            //Take user to a different or home page

            //is signed in
            openInNewTab('main.html');

        } else {

            // alert("No Active User");
            //no user is signed in
            openInNewTab('login.html');
        }

    });
}