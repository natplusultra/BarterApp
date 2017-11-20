// NOTE: hey guys, all of this is the authentication code.
//it basically gives us access to the users name, email, photo,
//and unique google id.
// in addition to that, it also stores this data in local storage
// and clears it on sign out.

$(document).ready(function() {
  var config = {
        apiKey: "AIzaSyDWuWMSBzJUA2CZYSWUMkgoBSCf7n3yNVA",
        authDomain: "barter-app-9fb57.firebaseapp.com",
        databaseURL: "https://barter-app-9fb57.firebaseio.com",
        projectId: "barter-app-9fb57",
        storageBucket: "barter-app-9fb57.appspot.com",
        messagingSenderId: "127264274079"
    };
  firebase.initializeApp(config);
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("logged in");
      console.log(user)
      notLoggedIn();
    } else {
      console.log("not logged in");
      notLoggedIn();
    }
  });


  $("#logout_button").on("click", function(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      localStorage.removeItem("name");
      localStorage.removeItem("picture");
      localStorage.removeItem("email");
      localStorage.removeItem("guid");
      localStorage.removeItem("userid");
      window.location.href = window.location.origin;
      console.log("You've signed out");
    }).catch(function(error) {
      // An error happened.
    });
  })

  function redirect(){
    $.get("/postlogin", userObject)
        .done(function(data){
            console.log(data)
    });
  }

  function notLoggedIn() {
    $("#btnGoogle").on('click', function() {

      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        user = result.user;
        name = user.displayName;
        email = user.email;
        photo = user.photoURL;
        uid = user.uid;

        console.log(result);

        localStorage.setItem("name", user.displayName);
        localStorage.setItem("picture", user.photoURL);
        localStorage.setItem("guid", user.uid);
        localStorage.setItem("email", user.email);

        console.log(localStorage.name);
        // $("#user_name").text(localStorage.name);
        // $("#display_picture").src(localStorage.photoURL);

        var userObject = {
          firebase_uuid : user.uid,
          name : user.displayName,
          email: user.email,
          image : user.photoURL
        };
        console.log(userObject);
        //Checks for user in database
        // NOTE: We'll probably be using a $.get here so that we can get
        // access to all the existing users.
        $.post("/api/users", userObject)
        .done(function(data){
            console.log(data)
          });

        //If the we can find the user in the json, we send an object back
        //with the new users cred.

        //otherwise, if the user exists, we display their homepage, with a
        //$.get to their id's data

      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    });
  }

})


