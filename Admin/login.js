// Initialize Firebase
var config = {
    apiKey: "AIzaSyAxc3xzAyZ0CM2dnl4LcKegx3cAzwct87k",
    authDomain: "rillyvisualsv2.firebaseapp.com",
    databaseURL: "https://rillyvisualsv2.firebaseio.com",
    storageBucket: "rillyvisualsv2.appspot.com"
  };
  firebase.initializeApp(config);

  document.getElementById("AdminLogin").addEventListener("submit", adminLogin);


  function adminLogin ( event) {
      event.preventDefault();
      
      var email = $("#adminEmail").val();
      var password = $("#adminPassword").val();

          firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(function(error) {

          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            swal("ERROR","Wrong Password", "error");
            } else {
                swal("ERROR", errorMessage, "error");
                // alert(errorMessage);
                }
            console.log(error);
        });
        swal("LOGIN SUCCESS", "GREAT", "success");

    }

    // Redirect user to gallery page after log in
firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          window.location = "../Admin/AdminMenuGallery.html";
        
        } else {

        }
      });

function signout (){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        swal("SIGN OUT SUCCESS", "GREAT", "success");
        window.location = "../Admin/Login.html";
      }).catch(function(error) {
        console.log(error);
      });
}