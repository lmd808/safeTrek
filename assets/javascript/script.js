$(document).ready(function() {
	$('#init').show();
	$('#divOne').hide();
	$('#divTwo').hide();
	$('#divThree').hide();
	$('#divFour').hide();
	$('#divOneL').hide();
});

var accountDetails = document.querySelector('#accountDetails');
var id;
var contactEmail;

// this function pulls info from the data base and forced my contactEmail out of the database
function setupUI(user) {
	if (user) {
		db.collection('users').doc(user.uid).get().then((doc) => {
			const html = `
			<div class="list-group-item list-item" style="text-indent: 1em">
				Logged in as: ${user.email}
			</div>
			<div class="list-group-item list-item" style="text-indent: 1em">
				Contact E-mail: <span id=>${doc.data().contact}</span>
			</div>
			`;
			accountDetails.innerHTML = html;
		});

		Email = db.collection('users').doc(user.uid).get().then(function(doc) {
			contactEmail = doc.data().contact;
		});
	} else {
		accountDetails.innerHTML = '';
	}
	return contactEmail;
}

//click event from init (click login in to login)
$('#logInit').on('click', function() {
	$('#divOneL').show();
	$('myModalLogin').hide();
	$('#init').hide();
});

//click event from init (click sign in to sign up)
$('#signInit').on('click', function() {
	$('#divOne').show();
	$('#init').hide();
});

// in dive two now
//click the location button to get location
$('#location').on('click', function(event) {
	event.preventDefault();
	getLocation();
});

//********************************************************************
//********************************************************************
//********************************************************************
//********************************************************************
//********************************************************************

// get location

function getLocation() {
	//Check if Geolocation is supported and allowed
	if (navigator.geolocation) {
		//the watchposition() method show the position of the user and update it while is moving
		id = navigator.geolocation.watchPosition(showPosition);
		// call email (this should be moved)
		email();
	} else {
		//If not, display a message to the user
		$('#testCord').html('Geolocation is not supported by this browser.');
	}
}

//The showPosition() function outputs the Latitude and Longitude
function showPosition(position) {
	$('#textCord').html(`Latitude: ${position.coords.latitude} <br> Longitude: ${position.coords.longitude}`);
	// console.log(posi);
	// console.log(JSON.stringify(posi[0]));
	// email(JSON.stringify(posi));
}

// automatically sends an email
function email(id) {
	// remove later - using for class demo
	console.log(contactEmail);
	// template params
	var templateParams = {
		// who is the email going to?
		to: contactEmail,
		// subject
		subject: 'New e-mail alert from SafeTrek',
		// body
		html: `
		<h2>Location alert from SafeTrek</h2>
		<p>${JSON.stringify(id)}/p>`
	};

	// send - takes three arguments
	// gmail, template, tmplate params from above
	emailjs.send('default_service', 'template_3bDgeTFE', templateParams).then(
		// promise function
		function(response) {
			// log sucess
			console.log('SUCCESS!', response.status, response.text);
			//
			navigator.geolocation.clearWatch(id);
		},
		function(error) {
			console.log('FAILED...', error);
		}
	);
}

//********************************************************************
//********************************************************************
//********************************************************************
//********************************************************************
//********************************************************************
//********************************************************************
//********************************************************************

$('#extrasButton').on('click', function() {
	$('#divThree').show();
	$('#home').show();
	$('#extrasButton').hide();
	$('#accountinfodiv').hide();
	$('#hotline').hide();
	$('#public').hide();
	$('#care').hide();
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
	$('#care').hide();
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
	$('#care').hide();
	$('#food').hide();
	$('#fut').hide();
});

$('#self').on('click', function() {
	$('#public').hide();
	$('#hotline').hide();
	$('#care').show();
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
			var articleDivMas = $('<li>');
			articleDivMas.addClass('list-group-item list-item');
			var link = $('<a>');
			link.addClass('a');
			link.attr('href', result[i]._id);
			articleDivMas.prepend(link);
			link.prepend('<h6>' + result[i].byline.original + '</h6>');
			link.prepend(`<h4>${result[i].headline.main}<h4>`);
			$('#selfCare').append(articleDivMas);
		}
	});
}

$('#recipes').on('click', function() {
	$('#public').hide();
	$('#hotline').hide();
	$('#care').hide();
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
	$('#care').hide();
	$('#food').hide();
	$('#fut').show();
});

$('#accountinfo').on('click', function() {
	$('#public').hide();
	$('#hotline').hide();
	$('#care').hide();
	$('#food').hide();
	$('#fut').hide();
	$('#accountinfodiv').show();
});

// const guidelist = document.querySelector('.guides');
// //set up guides
// const setupGuides = (data) => {
// 	let html = '';
// 	data.forEach((doc) => {
// 		const guide = doc.data();
// 		console.log(guide);
// 		const li = `
// 			<li>
// 				<div class = "standard classes for styling">${guide.title}<div>
// 				<div class = "standard classes for styling">${guide.content}<div>
// 			</li>
// 		`;
// 		html += li
// 	});
// sets what we created to the inner html
// guideList.innerHTML =html
// };
