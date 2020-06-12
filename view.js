// firebase ref
var storage = firebase.storage();
var storageRef = storage.ref();
var rootRef = firebase.database().ref().child('Images');
console.log(rootRef);
var myList = new Array();
// myList.push("ds")

var count = 0;
// var userId = firebase.auth().currentUser.uid;
var userID = ""
var fbRef = firebase.database().ref().child("users");
var imageRef = firebase.database().ref().child("Images");

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user);
        var user = firebase.auth().currentUser.uid;
        userID = user;
        // alert(user);    //you should have your user here!
    } else {
        console.log('No user is signed in.');
    }
});

imageRef.on("child_added", snap => {
    var key=snap.key;
    // alert(myList.length);
    var name = snap.child("url").val();
    myList.push(name);
});


storageRef.child('dog.jpg').getDownloadURL().then(function(url) {
  // Or inserted into an <img> element:
  var img = document.getElementById('myImgId');
  img.src = url;
}).catch(function(error) {
  // Handle any errors
});

function nextImg(){
    //get radio button values
    var ele = document.getElementsByName('label');
    var str_label = "";
    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked)
        str_label = ele[i].value;
    }

    alert("You sure you wanna continue?");

    if (count < myList.length){
      storageRef.child(myList[count]).getDownloadURL().then(function(url) {
        // Or inserted into an <img> element:
        var img = document.getElementById('myImgId');
        img.src = url;
        firebase.database().ref('completedProjects/' + userID).set({
            label: str_label
        });
      }).catch(function(error) {
        // Handle any errors
      });
    }else {
      alert("congratulations you have labeled all the projects");
    }
    count = count+1;
}
