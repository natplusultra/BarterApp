// dependencies
var express = require("express");
var db = require("../models/");

//bulkCreate to seed the Service model
// I'm not sure how to associate the service with the usr though. Where should I add the foreign key?
db.Service.bulkCreate([
	{
		title: "Coding",
		description: "I'm a full-stack web developer and can code you a great website from end to end. I can work with you to develop a concept, design, layout, and can set up any backend functionality you may need. I'm proficient in JavaScript, Node, and MySQL."
		location: "San Diego, CA",
		image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1950&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
	}, {
		title: "Dog Walking",
		description: "If you have dogs that need walking during the day in North County, San Diego, contact me! I have experience walking all dogs, big and small. I'm reliable and love animals!"
		location: "San Diego, CA",
		image: "https://images.unsplash.com/photo-1489417139533-915815598d31?auto=format&fit=crop&w=2610&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
	}, {
		title: "Home-cooked Meals",
		description: "My hobby is gourmet cooking, and I'd love to cook you a delicious, home-cooked meal from scratch for a trade!"
		location: "San Diego, CA",
		image: "https://images.unsplash.com/photo-1504387828636-abeb50778c0c?auto=format&fit=crop&w=934&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
	}, {
		title: "Surfing Lessons",
		description: "I'm a competitive surfer and have been surfing since I could walk. I can teach any beginner how to surf, and can also help improve your surfing skills if you already surf. I am happy to show you how to surf on any kind of board, at any beach in San Diego."
		location: "San Diego, CA",
		image: "https://images.unsplash.com/photo-1459745930869-b3d0d72c3cbb?auto=format&fit=crop&w=1867&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
	}
]).then(function() {
	return db.Service.findAll()
}).then(function(services) {
	console.log(services)
});