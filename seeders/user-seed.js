// dependencies
var express = require("express");
var db = require("../models/");

// bulkCreate to seed the User model
// I'm omitting the image (since it's pulled from google) website_link, and linkedin_link, but doesn't all of this info basically get pulled from our google accounts, except for the description?
db.User.bulkCreate([
	{
		name: "Natalie Loman",
		location: "San Diego, CA",
		email: "natalie4@gmail.com",
		firebase_uuid: "9sm4XZExZshtQR58oHufmPAViRu2",
		description: "Hi there! My name is Natalie and I'm a web developer living in San Diego! I also have several years of experience in scientific publishing and public relations. I love food, music, and traveling. I've lived abroad in London, Berlin, Istanbul, Lisbon, and Antalya and have loved all those places, but I'm a Californian at heart! Hope to trade with you soon!"
	}, {
		name: "Simeon Utubor",
		location: "San Diego, CA",
		email: "simeon.utubor@gmail.com",
		firebase_uuid: "ui3iLflofMg9J96LqBlZBC05zYx1",
		description: "Hi there! My name is Simeon and I'm work in cyber security! I love living and working in San Diego, and you can probably find me at a cool brunch spot any day of the week! I look forward to connecting with you and hope we can trade soon!"
	}, {
		name: "Steph Huynh",
		location: "San Diego, CA",
		email: "stephanie48964@gmail.com",
		firebase_uuid: "qrTudjdG2jecIAVSqjHJeu8sNP13",
		description: "Hi, I'm Steph! I currently work in finance and I'm also a web developer! I'm a vegetarian and I live in San Diego with my dogs. I'm a great social manager and love organizing events. I would love to connect with other traders to see how we can help each other out!"
	}, {
		name: "Justin McLaren",
		location: "San Diego, CA",
		email: "justinmclaren63@gmail.com",
		firebase_uuid: "Eta4brZP3Ne7pMQv5Nz5o0qwFTI3",
		description: "Hi there, I'm Justin! I have a background in fashion and design, and I'm currently doing web development. I live in San Diego and try to go surfing as often as I can. I look forward to connecting with you and hope we can trade soon!"
	}
]).then(function() {
	return db.User.findAll()
}).then(function(users) {
	console.log(users)
});