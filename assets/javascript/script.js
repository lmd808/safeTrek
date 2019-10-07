$(document).ready(function() {
	$('#init').show();
	$('#divOne').hide();
	$('#divTwo').hide();
	$('#divThree').hide();
	$('#divFour').hide();
	$('#divOneL').hide();
});

// variables

var posi = '';

$('#logInit').on('click', function() {
	$('#divOneL').show();
	$('#init').hide();
});

$('#signInit').on('click', function() {
	$('#divOne').show();
	$('#init').hide();
});

$('#location').on('click', function() {
	getLocation();
});

function getLocation() {
	//Check if Geolocation is supported
	if (navigator.geolocation) {
		//the watchposition() method show the position of the user and update it while is moving
		var location = navigator.geolocation.watchPosition(showPosition).then(function() {
			// https://cors-anywhere.herokuapp.com/
			email();
		});
	} else {
		//If not, display a message to the user
		$('#testCord').html('Geolocation is not supported by this browser.');
	}
	return location;
}

//The showPosition() function outputs the Latitude and Longitude
function showPosition(position) {
	posi = $('#textCord').html(`Latitude: ${position.coords.latitude} <br> Longitude: ${position.coords.longitude}`);
	email();
}

function email() {
	let templateParams = {
		// to: user.email
		to: 'lditom808@gmail.com',
		subject: 'New e-mail alert from SafeTrek',
		html: `
		<h2>Location alert from SafeTrek</h2>
		<p>${location}</p>`
	};
	emailjs.send('default_service', 'template_3bDgeTFE', templateParams).then(
		function(response) {
			console.log('SUCCESS!', response.status, response.text);
		},
		function(error) {
			console.log('FAILED...', error);
		}
	);
}

//  text message

// var twilio = require('twilio');

// var accountSid = 'AC6d1fdb13caf5d64c78c33de472cccd2a'; // Your Account SID from www.twilio.com/console
// var authToken = '2762d2d0446ddca7e98590e3623c14a6'; // Your Auth Token from www.twilio.com/console

// var twilio = require('twilio');
// var client = new twilio(accountSid, authToken);

// client.messages
// 	.create({
// 		body: 'Hello from Node',
// 		to: '+17323797526', // Text this number
// 		from: '+15203415162' // From a valid Twilio number
// 	})
// 	.then((message) => console.log(message.sid));

$('#extrasButton').on('click', function() {
	$('#divThree').show();
	$('#home').show();
	$('#extrasButton').hide();
	$('#hotline').hide();
	$('#public').hide();
	$('#selfCare').hide();
	$('#food').hide();
	$('#fut').hide();
	$('#divTwo').hide();
});

$('#home').on('click', function() {
	$('#divThree').hide();
	$('#extrasButton').show();
	$('#home').hide();
	$('#divTwo').show();
});

$('#hot').on('click', function() {
	$('#hotline').show();
	$('#public').hide();
	$('#selfCare').hide();
	$('#food').hide();
	$('#fut').hide();
	renderHotline();
});

var hotlineArray = [
	'Immediate Emergency: 911',
	'Suicide Hotline: 800-784-2433',
	'Crisis Call Center: 800-273-8255',
	'Domestic Abuse Hotline: 800-799-7233',
	'LGBT Youth Hotline: 800-96-YOUTH',
	'Rainn: 800-656-4673'
];

function renderHotline() {
	$('#generateHotline').empty();
	for (var i = 0; i < hotlineArray.length; i++) {
		// create new list item
		var newLi = $('<li>');
		// add class to list item
		newLi.addClass('list-group-item list-item');
		// add attribute to list item
		newLi.attr('data-name', hotlineArray[i]);
		// add text to list item
		newLi.text(hotlineArray[i]);
		// add list item to div
		$('#generateHotline').prepend(newLi);
	}
}

$('#searchButton').on('click', function() {
	// new value of an animal button
	var newHotline = $('#searchBar').val().trim();
	// add to my array
	hotlineArray.push(newHotline);
	// will make the new animal into a button
	renderHotline();
	// clear the search bar
	$('#searchBar').val('');
});

$('#publicLocations').on('click', function() {
	$('#public').show();
	$('#hotline').hide();
	$('#selfCare').hide();
	$('#food').hide();
	$('#fut').hide();
});

$('#self').on('click', function() {
	$('#public').hide();
	$('#hotline').hide();
	$('#selfCare').show();
	$('#food').hide();
	$('#fut').hide();
	healthArt();
});

function healthArt() {
	$('#selfCare').empty();
	var queryURL =
		'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=health&api-key=GaB7lP16dHpgUzrYTF3DjDRjcvPcDSmR';

	$.ajax({
		url: queryURL,
		method: 'GET'
	}).then(function(data) {
		console.log(data);
		var result = data.response.docs;
		for (var i = 0; i < result.length; i++) {
			var articleDivMas = $('<div>');
			var link = $('<a>');
			link.attr('href', result[i]._id);
			articleDivMas.prepend(link);
			link.prepend('<h5>' + result[i].byline.original + '</h5>');
			link.prepend(`<h3>${result[i].headline.main}<h3>`);
			$('#selfCare').append(articleDivMas);
		}
	});
}

$('#recipes').on('click', function() {
	$('#public').hide();
	$('#hotline').hide();
	$('#selfCare').hide();
	$('#food').show();
	$('#fut').hide();

	renderButtons();
});

function renderRecipe() {
	$('#recListing').empty();
	var foodParam = $(this).data('name');
	// var dietParam = $(this).data('name');
	// var healthParam = $(this).data('name');

	var queryURL = `https://api.edamam.com/search?q=${foodParam}&app_id=$ca6c2fc3&app_key=$3b0533c7d1f78b8e4f74741432545a65&from=0&to=3&calories=591-722&health=alcohol-free`;

	$.ajax({
		url: queryURL,
		method: 'GET',
		contentType: 'application/json'
	}).then(function(data) {
		console.log(data);
		var results = data.hits;
		for (var i = 0; i < results.length; i++) {
			// add a new div
			var newRecDiv = $('<div>');
			// add a link
			var link = $('<a>');
			// add attribute to a
			link.attr('href', results[i].recipe.url);
			// prepend a to div
			newRecDiv.prepend(link);
			// add button
			var button = $('<button>');
			// add classes
			button.addClass('btn-secondary btn-lg btn-block');
			// prepend button to link
			link.prepend(button);
			// add title name
			button.prepend(results[i].recipe.label);
			//pin the div to the food div
			$('#recListing').prepend(newRecDiv);
		}
	});
}

var foodParamArray = [
	'Chicken',
	'Beef',
	'Turkey',
	'Fish',
	'Tofu',
	'Vegetables',
	'Beans',
	'Eggs',
	'Soy',
	'Nuts',
	'Fruit',
	'Broccoli',
	'Salmon'
];
// var dietParamArray = [ 'high-protein', 'high-fiber', 'low-fat', 'low-carb', 'low-sodium' ];
// var healthParamArray = [ 'tree-nut-free', 'gluten-free', 'peanutFree', 'none' ];
function renderButtons() {
	// clear the div
	$('#foodParam').empty();

	// Looping through the array of animals
	for (var i = 0; i < foodParamArray.length; i++) {
		//create buttons for animals
		var foodParamButton = $('<button>');
		//slap on a class
		foodParamButton.addClass('foodParam-button btn btn-dark animated bounceIn margin');
		// Adding a data-attribute
		foodParamButton.attr('data-name', foodParamArray[i]);
		// pushes animal name to array
		foodParamButton.text(foodParamArray[i]);
		// append the buttons to the div
		$('#foodParam').append(foodParamButton);
	}
	// for (var i = 0; i < dietParamArray.length; i++) {
	// 	//create buttons for animals
	// 	var dietParamButton = $('<button>');
	// 	//slap on a class
	// 	dietParamButton.addClass('dietParam-button btn btn-dark animated bounceIn margin');
	// 	// Adding a data-attribute
	// 	dietParamButton.attr('data-name', dietParamArray[i]);
	// 	// pushes animal name to array
	// 	dietParamButton.text(dietParamArray[i]);
	// 	// append the buttons to the div
	// 	$('#dietParam').append(dietParamButton);
	// }
	// for (var i = 0; i < healthParamArray.length; i++) {
	// 	//create buttons for animals
	// 	var healthParamButton = $('<button>');
	// 	//slap on a class
	// 	healthParamButton.addClass('healthParam-button btn btn-dark animated bounceIn margin');
	// 	// Adding a data-attribute
	// 	healthParamButton.attr('data-name', healthParamArray[i]);
	// 	// pushes animal name to array
	// 	healthParamButton.text(healthParamArray[i]);
	// 	// append the buttons to the div
	// 	$('#healthParam').append(healthParamButton);
	// }
}

// renders gif when I click on the animal button
$(document).on('click', '.foodParam-button', renderRecipe);

$('#future').on('click', function() {
	$('#public').hide();
	$('#hotline').hide();
	$('#selfCare').hide();
	$('#food').hide();
	$('#fut').show();
});
