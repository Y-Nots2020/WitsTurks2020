// web app's Firebase configuration
const firebaseConfig = {
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
console.log(firebase);

console.log(firebase);
const auth = firebase.auth();
const database = firebase.database();
// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

// Create a storage reference from our storage service
var storageRef = storage.ref();
// Create a child reference
var imagesRef = storageRef.child('images');

// function uploadImage()
// {
//       const ref = firebase.storage().ref();
//       const file = document.querySelector("#photo").files[0];
//       const name = +new Date() + "-" + file.name;
//       const metadata = {
//         contentType: file.type
//       };
//       const task = ref.child(name).put(file, metadata);
//       task
//         .then(snapshot => snapshot.ref.getDownloadURL())
//         .then(url => {
//           console.log(url);
//           document.querySelector("#image").src = url;
//           Img_url = url;
//         })
//         .catch(console.error);
//         alert("File uploaded, select another image to upload or go back to the projects");
// }

function writeUserData(userId, email, type) {
    firebase.database().ref('users/' + userId).set({
        email: email,
        type: type
    });
}
function addUser(userId, email, a_type) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        accountType:a_type
    });
}

function SignUp() {
    var email = document.getElementById("semail").value;
    var password = document.getElementById("spassword").value;
    var ele = document.getElementsByName('acc_type');
    var label = "";
    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked)
        label = ele[i].value;
    }
    // var label = "";
    // if (document.getElementById("owner").checked == true)
    //     label = "owner";
    // else if (document.getElementById("labeler").checked == true)
    //     label = "labeler";
    // else
    //     alert("Please select account type")
    // document.write(email);
    if (label == "labeler" || label == "owner")
    {
        const promise = auth.createUserWithEmailAndPassword(email, password);
        promise.catch(e => alert(e.message));
        alert(email);
        alert(password);
        auth.onAuthStateChanged(function(user) {
            alert(label);
            if (user)
            {
                var userId = firebase.auth().currentUser.uid;
                var ref = database.ref('users/');
                alert(userId);
                addUser(userId, email, label);
                if (label=="owner") {
                  window.location.href = 'projectownerindex.html'
                }
                ////else sign in as labeler
            }
          });
    }else{
        alert("Please select account type")
    }

}


function signIn() {

    var email = document.getElementById("email");

    var password = document.getElementById("password");

    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));
    auth.onAuthStateChanged(function(user) {
      if (user){
        var user = firebase.auth().currentUser.uid;
        var myRef = firebase.database().ref().child("users/"+user);
        myRef.on("child_added", snap => {
            var key=snap.key;
            // alert(myList.length);
            var label = snap.child("label").val();
            if (label=="owner"){
              window.location.href = 'projectownerindex.html'
            }
        });

      }
    });

    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
   // user signed in
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });

}

function signOut() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        // authorization();
        window.location.href = 'signin.html'
        }).catch(function(error) {
        // An error happened.
        });

}

function snedIm() {
    var uploader = document.getElementById("uploader");
    var s = document.getElementById("password").value;
    alert(s);
    var Upbutton = document.getElementById("imUploader");

    alert(Upbutton.value);
    Upbutton.addEventListener('change', function(e) {
      var file = e.target.files[0];

      var storageRef = firebase.storage().ref('ower_img/'+file.name);
      var task = storageRef.put(file);

      task.on('state_changed',
        function progress(snapshot) {
        var percent = (snapshot.bytesTransferred /
        snapshot.totalBytes)*100;
        uploader.value = percent;
        },

        function error() {

        },

        function complete() {

        }
      );
    });
}




function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}
