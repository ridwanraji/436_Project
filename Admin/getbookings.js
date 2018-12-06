
//create a new connection to firebase and reference bookings colleection
var bookingsRef = firebase.database().ref("bookings");

bookingsRef.once("value", function(snapshot) {
    if(snapshot.exists()) {
        var tableContent = "";
        snapshot.forEach(function(data) {
            var values = data.val();
            var key = values.key;
            tableContent += "<tr>";
            tableContent += '<td> <a class="btn btn-default" onclick= "deleteBooking(\''+key+'\')"> Delete</a> </td>';
            tableContent += "<td>" + values.firstNamen + "</td>";
            tableContent += "<td>" + values.lastName + "</td>";
            tableContent += "<td>" + values.email + "</td>";
            tableContent += "<td>" + values.phone + "</td>";
            tableContent += "<td>" + values.customerIG + "</td>";
            tableContent += "<td>" + values.howToContact + "</td>";
            tableContent += "<td>" + values.city + "</td>";
            tableContent += "<td>" + values.service + "</td>";
            tableContent += "<td>" + values.shootDate + "</td>";
            tableContent += "<td>" + values.message + "</td>";
            tableContent += "</tr>";
        });
        $("#bookingsTable").append(tableContent);
    }
})

// Delete Image from database and storage bucket
function deleteBooking(key){

    bookingsRef.child(key).remove().then(function () {
        swal("GREAT", "Booking Deleted", "success").then((value) => {
            location.reload();
        });
    })
    .catch(function(error){
        console.log(error);
    });
}