
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAxc3xzAyZ0CM2dnl4LcKegx3cAzwct87k",
    authDomain: "rillyvisualsv2.firebaseapp.com",
    databaseURL: "https://rillyvisualsv2.firebaseio.com",
    storageBucket: "rillyvisualsv2.appspot.com"
  };
  firebase.initializeApp(config);

  //create a new connection to firebase and reference bookings colleection
  var bookingsRef = firebase.database().ref("bookings");

  document.getElementById("bookingForm").addEventListener("submit", submitbookingForm);


  function submitbookingForm (event) {
    event.preventDefault();
    
    //get the actual values that we will send to firebase
    var firstName = $("#customerFName").val();
    var lastName = $("#customerLName").val();
    var email = $("#customerEmail").val();
    var phone = $("#phonenumber").val();
    var customerIG = $("#customerIGName").val();
    var howToContact = $("#contactSelect").val();
    var service = $("#serviceSelect").val();
    var shootDate = $("#datepicker").val();
    var city = $("#city").val();
    var message = $("#message").val();



    try {
      
      saveBookings(firstName,lastName,email,phone,customerIG,howToContact,service,shootDate,city,message);
      swal("Hey   " + "   " + firstName + "!", "Thank you for booking with us! We'll get back to you ASAP", "success");
    }
    catch {
      swal("Hey   " + "   " + firstName + "!", "OUR BOOKING SERVER IS CURRENTLY NOT RESPONDING, PLEASE TRY AGAIN LATER! ", "error");
    }
    
    

    document.getElementById("bookingForm").reset();
    }



    function saveBookings(firstName,lastName,email,phone,customerIG,howToContact,service,shootDate,city,message){
      var newBookingKey = bookingsRef.push().key;
      bookingsRef.child(newBookingKey).set({
        firstNamen: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        customerIG: customerIG,
        howToContact: howToContact,
        service: service,
        shootDate: shootDate,
        city: city,
        message: message,
        key: newBookingKey
      });
    }