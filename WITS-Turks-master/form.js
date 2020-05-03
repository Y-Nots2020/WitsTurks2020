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

function uploadImage() {
      const ref = firebase.storage().ref();
      const file = document.querySelector("#photo").files[0];
      const name = +new Date() + "-" + file.name;
      const metadata = {
        contentType: file.type
      };
      const task = ref.child(name).put(file, metadata);
      task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
          console.log(url);
          document.querySelector("#image").src = url;
        })
        .catch(console.error);
    }

function writeUserData(userId, name, email, type) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        type: type
    });
}

function UpdateInfo() {
    var label = "";
    if (document.getElementById("owner").checked == true)
        label = "owner";
    else if (document.getElementById("labeler").checked == true)
        label = "labeler";
    else
        alert("Please select account type")
    // var name = document.getElementById("name").value;
    // var email = document.getElementById("email").value;
    //var type = document.getElementById("type");
    // var userId = firebase.auth().currentUser.uid;
    var ref = database.ref('users/');

    var data = {
        name: username,
        email: user_email,
        label: label
    }
    ref.push(data);
    window.open('Login.html')
}

function SignUp() {
    var username = document.getElementById('name');
    var email = document.getElementById('email');
    // var email = document.getElementById('email');
    var password = document.getElementById('password');

    var accType = document.querySelector('input[name = "acc_type"]:checked').value;

    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));

    var ref = database.ref('users/');

    var data = {
        name: username,
        email: email,
        label: accType
    }
    ref.push(data);

    auth.onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      firebaseUser.updateProfile({
        displayName: name
      });
      console.log("display name: " + firebaseUser.displayName);
    } else { }
  });

    auth.onAuthStateChanged(function(user) {
      if (user){
        window.location.href = 'OwnerHomePage.html'
      }
    });
    var form = document.getElementById("type");
    alert(form.elements["type"].value);
}

// var value = document.getElementById('lform').children[0].value;
// document.write(value);

function signIn() {

    var email = document.getElementById("email");

    var password = document.getElementById("password");

    document.write(email);
    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));
    auth.onAuthStateChanged(function(user) {
      if (user){
        window.location.href = 'OwnerHomePage.html'
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

    // authorization();

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

$(document).ready(function() {
  //Initialize the Firebase App
  Auth.init(function() {

    var user = Auth.checkLoggedInUser();
    console.log(user)
    if( user ){

    } else {

    }
    appRouter.listen();
  });
})

// auth.onAuthStateChanged(function(user) {
//
//     if (user) {
//
//         var email = user.email;
//         // alert("Active User " + email);
//
//         //Take user to a different or home page
//
//         //is signed in
//         // window.location.href = 'OwnerHomePage.html'
//         // openInNewTab('OwnerHomePage.html');
//
//     } else {
//
//         // alert("No Active User");
//         //no user is signed in
//         // openInNewTab('signin.html');
//         // window.location.href = 'signin.html'
//     }
//
// });

    // window.addEventListener('load', function() {
    //   document.querySelector('input[type="file"]').addEventListener('change', function() {
    //       if (this.files && this.files[0]) {
    //           var img = document.querySelector('img');  // $('img')[0]
    //           img.src = URL.createObjectURL(this.files[0]); // set src to blob url
    //           img.onload = imageIsLoaded;
    //       }
    //   });
    // });
    //
    // function imageIsLoaded() {
    //   alert(this.src);  // blob url
    //   // update width and height ...
    // }

// function upload() {
//     //get your select image
//     var image = document.getElementById("photo").files[0];
//     //now get your image name
//     var imageName = image.name;
//     //firebase  storage reference
//     //it is the path where yyour image will store
//     var storageRef = firebase.storage().ref('images/' + imageName);
//     //upload image to selected storage reference
//
//     var uploadTask = storageRef.put(image);
//
//     uploadTask.on('state_changed', function(snapshot) {
//         //observe state change events such as progress , pause ,resume
//         //get task progress by including the number of bytes uploaded and total
//         //number of bytes
//         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log("upload is " + progress + " done");
//     }, function(error) {
//         //handle error here
//         console.log(error.message);
//     }, function() {
//         //handle successful uploads on complete
//
//         uploadTask.snapshot.ref.getDownloadURL().then(function(downlaodURL) {
//             //get your upload image url here...
//             console.log(downlaodURL);
//         });
//     });
// }
//
// function uploadImage() {
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
//         })
//         .catch(console.error);
//     }
//
// const video = document.getElementById('video');
// const canvas = document.getElementById('canvas');
// const snap = document.getElementById("snap");
// const errorMsgElement = document.querySelector('span#errorMsg');
//
// const constraints = {
//   audio: false,
//   video: {
//     width: 400, height: 400
//   }
// };
//
// // Access webcam
// async function init() {
//   try {
//     const stream = await navigator.mediaDevices.getUserMedia(constraints);
//     handleSuccess(stream);
//   } catch (e) {
//     errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
//   }
// }
//
// // Success
// function handleSuccess(stream) {
//   window.stream = stream;
//   video.srcObject = stream;
// }
//
// // Load init
// init();
//
// // Draw image
// var context = canvas.getContext('2d');
// snap.addEventListener("click", function() {
//     context.drawImage(video, 0, 0, 640, 480);
//     var image = new Image();
//     image.id = "pic";
//     image.src = canvas.toDataURL();
//     console.log(image.src)
//     var button = document.createElement('button')
//     button.textContent = 'Upload Image'
//     document.body.appendChild(button)
//
// button.onclick = function() {
//     const ref = firebase.storage().ref();
//     ref.child(new Date() + '-' + 'base64').putString(image.src, 'data_url').then(function(snapshot) {
//     console.log('Uploaded a data_url string!');
//     alert("Image Uploaded")
// });
