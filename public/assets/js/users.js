//Check if user already exist in our database

function checkUser (firebase_uid){
	$.get("/api/users/firebase/" + firebase_uid, userObject)
       .done(function(data){
        console.log(data);
    });	

}