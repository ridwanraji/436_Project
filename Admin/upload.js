var storageRef = firebase.storage().ref();

//images database ref
var photoURLRef = firebase.database().ref("photoURL");

var percentUploaded = document.getElementById("percentUploaded");

// var uploadPhoto = document.getElementById("uploadPhoto");

var uploadButton = document.getElementById("photoSelect");
uploadButton.addEventListener("change",

function (e) {
    // Get photo to be uploaded

    var photo = e.target.files[0];

    // Get filename of photo to be uploaded
    var fileName = (+new Date()) + "-" + photo.name;
    var photoDatabaseKey = (+new Date());
    console.log(photoDatabaseKey);

    // Get Metadata of photo to be uploaded
    var metadata = { contentType: photo.type};

    //Upload the photo to Cloud Storage
    var upload = storageRef.child(fileName).put(photo, metadata);
    upload.on(firebase.storage.TaskEvent.STATE_CHANGED, 
        function (snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            percentUploaded.value = percentage;
            console.log("Upload is " + percentage + "% done");
            swal("GREAT", "Image Uploaded", "success").then((value) => {
                location.reload();
            });
    }, function (error){
        console.log(error);
    },

    // get download url of the image uploaded and put it in the database
    function() {
        upload.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            // console.log("Picture available at" , downloadURL);
            var newUploadKey = photoURLRef.push().key;
            // Put photo download url in firebase database
            photoURLRef.child(newUploadKey).set({
                name: fileName,
                photoURL: downloadURL,
                key: newUploadKey
            })
        }).catch(function(error){
            console.log(error);
        });
    },
    
    );
});

    //Load all uploaded images from database using thier download url
    photoURLRef.once("value", function(snapshot) {
        if(snapshot.exists()) {
            var galleryImages = "";
            snapshot.forEach(function(data) {
                var values = data.val();
                var URL = values.photoURL;
                var key = values.key;
                galleryImages += "<div class='pics'> <img src='"+URL+"' /></div>";
                galleryImages += '<a class="btn btn-default" onclick= "deleteImage(\''+URL+'\',\''+key+'\')"> Delete</a>';
                

            });
            $("#ImageGallery").append(galleryImages);
        }
    }).catch(function(error){
        swal("ERROR", error, "error");
        console.log(error);
    })

    // Delete Image from database and storage bucket
    function deleteImage(URL, key){
        // console.log("url of photo to be deleted is " + URL );
        // console.log("key to be used" + key)
        // Create reference to the file to delete
        var imageToDeleteRef = firebase.storage().refFromURL(URL);

        photoURLRef.child(key).remove().then(function () {
            console.log("Image Deleted from database")
        })
        .catch(function(error){
            console.log(error);
        });

        imageToDeleteRef.delete().then(function () {
            console.log("Image Deleted from Storage Bucket")
            swal("GREAT", "Image Deleted", "success").then((value) => {
                location.reload();
            });
        })
        .catch(function(error){
            console.log(error);
        });
    }