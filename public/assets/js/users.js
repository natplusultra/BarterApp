//Check if user already exist in our database

function getUser (firebase_uid){
	$.get("/api/users/firebase/" + firebase_uid, userObject)
       .done(function(data){
        console.log(data);
    });	
}

console.log(localStorage.userid);
