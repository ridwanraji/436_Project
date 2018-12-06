  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAxc3xzAyZ0CM2dnl4LcKegx3cAzwct87k",
    authDomain: "rillyvisualsv2.firebaseapp.com",
    databaseURL: "https://rillyvisualsv2.firebaseio.com",
    storageBucket: "rillyvisualsv2.appspot.com"
  };
  firebase.initializeApp(config);
  
var storageRef = firebase.storage().ref();

//images database ref
var photoURLRef = firebase.database().ref("photoURL");
   
   //Load all uploaded images from database using thier download url
    photoURLRef.once("value", function(snapshot) {
        if(snapshot.exists()) {
            var galleryImages = "";
            snapshot.forEach(function(data) {
                var values = data.val();
                galleryImages += "<div> <img src='"+values.photoURL+"' /></div>";
            });
            $("#ImageGallery").append(galleryImages);
        }
    }).catch(function(error){
        console.log(error);
    })