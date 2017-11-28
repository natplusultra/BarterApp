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
      $("#btnGoogle").text(localStorage.name);
      $("#btnGoogle").removeClass('loginButton');
      $("#btnGoogle").addClass('userButton');
      checkUser(localStorage.guid);
      $("#btnGoogle").attr('href', '/user/'+localStorage.userid);
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


  function checkUser (firebase_uid){
    $.get("/api/users/firebase/" + firebase_uid, function(data) {
      if (data === null){
        $.post("/api/users", userObject)
        .done(function(data){
            localStorage.setItem("userid", data.id);
            console.log(data)
            //window.location.href = "/index2";
        });
      }else{
        localStorage.setItem("userid", data.id);
      }

    });
  }

  function notLoggedIn() {
    $(document).on('click', '.loginButton', function() {

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

        var userObject = {
          firebase_uuid : user.uid,
          name : user.displayName,
          email: user.email,
          image : user.photoURL
        };

        checkUser(firebase_uuid);

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


