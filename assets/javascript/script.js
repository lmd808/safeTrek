$(document).ready(function() {
	$('<button>').addClass('myButton');
	$('#init').show();
	$('#divOne').hide();
	$('#divTwo').hide();
	$('#divThree').hide();
	$('#divFour').hide();
	$('#divOneL').hide();
});

var accountDetails = document.querySelector('#accountDetails');
var welcomeUser = document.querySelector('.welcomeUser');
var id;
var contactEmail;
var yoName;

// this function pulls info from the data base and forced my contactEmail out of the database
function setupUI(user) {
	if (user) {
		db.collection('users').doc(user.uid).get().then((doc) => {
			const html = `
			<div class="list-group-item list-item" style="text-indent: 1em">Name: ${doc.data().firstName} ${doc.data()
				.lastName} </div>
			<div class="list-group-item list-item" style="text-indent: 1em">
				E-mail: ${user.email}
			</div>
			<div class="list-group-item list-item" style="text-indent: 1em">
				Emergency Contact: <span id=>${doc.data().contact}</span>
			</div>
			`;
			accountDetails.innerHTML = html;
		});
		// to get my welcome name
		db.collection('users').doc(user.uid).get().then((doc) => {
			const nome = `<div class ="">
			<em class="nome box">	Welcome, ${doc.data().firstName}!</em> 
			<div>`;

			welcomeUser.innerHTML = nome;
		});
		// to ger my contact email
		Email = db.collection('users').doc(user.uid).get().then(function(doc) {
			contactEmail = doc.data().contact;
		});
	} else {
		accountDetails.innerHTML = '';
		welcomeUser.innerHTML = '';
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
$('#location').on('click', function() {
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
	} else {
		//If not, display a message to the user
		$('#testCord').html('Geolocation is not supported by this browser.');
	}
	return id;
}

var lat;
var long;
//The showPosition() function outputs the Latitude and Longitude
function showPosition(position) {
	$('#textCord').html(`Latitude: ${position.coords.latitude} <br> Longitude: ${position.coords.longitude}`);
	$('#textcord').attr('style', 'text-align:center');
	lat = JSON.stringify(position.coords.latitude);
	long = JSON.stringify(position.coords.longitude);
	email();
	console.log(lat, long);
	navigator.geolocation.clearWatch(id);
}

// automatically sends an email
function email() {
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
		<p>Latitude: ${JSON.stringify(lat)}, Longitude: ${JSON.stringify(long)}</p>`
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
// click event in init
$('#switchToLogin').on('click', function() {
	$('#divOneL').show();
	$('#divOne').hide();
});
// click events in init
$('#switchToSignup').on('click', function() {
	$('#divOneL').hide();
	$('#divOne').show();
});

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
	$('#aff').hide();
	$('#jokes').hide();
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
	$('#accountinfodiv').hide();
	$('#aff').hide();
	$('#jokes').hide();
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
	// new value of an button
	var newHotline = $('#searchBar').val().trim();
	// add to my array
	hotlineArray.push(newHotline);
	// kill me
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
	$('#accountinfodiv').hide();
	$('#aff').hide();
	$('#jokes').hide();
});

$('#self').on('click', function() {
	$('#public').hide();
	$('#hotline').hide();
	$('#care').show();
	$('#food').hide();
	$('#fut').hide();
	$('#accountinfodiv').hide();
	$('#aff').hide();
	$('#jokes').hide();
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
	$('#aff').hide();
	$('#jokes').hide();
	$('#accountinfodiv').hide();

	renderButtons();
});

function renderRecipe() {
	$('#recListing').empty();
	var foodParam = $(this).data('name');

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
			button.addClass('btn-secondary btn-lg btn-block color');
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

function renderButtons() {
	// clear the div
	$('#foodParam').empty();

	// Looping through the array
	for (var i = 0; i < foodParamArray.length; i++) {
		//create buttons
		var foodParamButton = $('<button>');
		//slap on a class
		foodParamButton.addClass('foodParam-button btn btn-dark animated fadeIn;');
		// Adding a data-attribute
		foodParamButton.attr('data-name', foodParamArray[i]);
		// pushes name to array
		foodParamButton.text(foodParamArray[i]);
		// append the buttons to the div
		$('#foodParam').append(foodParamButton);
	}
}

// renders gif when I click on the rec button
$(document).on('click', '.foodParam-button', renderRecipe);

$('#future').on('click', function() {
	$('#public').hide();
	$('#hotline').hide();
	$('#care').hide();
	$('#food').hide();
	$('#accountinfodiv').hide();
	$('#aff').hide();
	$('#jokes').hide();
	$('#fut').show();
});

$('#accountinfo').on('click', function() {
	$('#public').hide();
	$('#hotline').hide();
	$('#care').hide();
	$('#food').hide();
	$('#fut').hide();
	$('#aff').hide();
	$('#jokes').hide();
	$('#accountinfodiv').show();
});

$('#myH1').on('click', function() {
	$('#public').hide();
	$('#hotline').hide();
	$('#care').hide();
	$('#food').hide();
	$('#fut').hide();
	$('#accountinfodiv').hide();
	$('#aff').hide();
	$('#jokes').hide();
});

// jokeapi

// renders jokes
// tomorrow i will finish this and then work on css + some mobile response changes

function renderJokes() {
	var jokeCatParam = $(this).data('name');

	var settings = {
		async: true,
		crossDomain: true,
		url: `https://sv443.net/jokeapi/category/${jokeCatParam}?blacklistFlags=nsfw/race/suicide/sex/drugs/murder/death/jew/cancer/black/pedophile?format=json`,
		method: 'GET',
		headers: {
			'x-rapidapi-host': 'jokeapi.p.rapidapi.com',
			'x-rapidapi-key': 'ee93abecedmsh9d4eadc04d257fap145e2ejsn9aebc1b37ca7'
		}
	};

	$.ajax(settings).done(function(data) {
		console.log(data);
		// clear div
		$('#jokeListing').html('');
		// new div
		var newJokeDiv = $('<div>');
		// add a paragraph
		var p1 = $('<p style="text-align:center;">');
		//preprend
		newJokeDiv.prepend(p1);
		// prepend to div
		var setup = JSON.stringify(data.setup);
		var delivery = JSON.stringify(data.delivery);
		var joke = JSON.stringify(data.joke);
		console.log(setup, delivery, joke);
		if (data.setup && data.delivery) {
			p1.prepend(setup + '<br>' + delivery);
		} else {
			p1.prepend(joke);
		}

		$('#jokeListing').prepend(newJokeDiv);
	});
}

$('#joke').on('click', function() {
	$('#public').hide();
	$('#hotline').hide();
	$('#care').hide();
	$('#food').hide();
	$('#fut').hide();
	$('#accountinfodiv').hide();
	$('#aff').hide();
	$('#jokes').show();
	$('#jokeParam').html('');
	renderJokeButtons();
});

var jokeParamArray = [ 'Programming', 'Miscellaneous', 'Any' ];

function renderJokeButtons() {
	// clear the div
	// Looping through the array of jokes
	for (var i = 0; i < jokeParamArray.length; i++) {
		//create buttons
		var jokeCatButton = $('<button>');
		//slap on a class
		jokeCatButton.addClass('jokeButtons btn btn-dark animated fadeIn margin box');
		// Adding a data-attribute
		jokeCatButton.attr('data-name', jokeParamArray[i]);
		// pushes aname to array
		jokeCatButton.text(jokeParamArray[i]);
		// append the buttons to the div
		$('#jokeParam').prepend(jokeCatButton);
	}
}

$(document).on('click', '.jokeButtons', renderJokes);
// end jokes

// affirmation
$('#affirmation').on('click', function() {
	$('#public').hide();
	$('#hotline').hide();
	$('#care').hide();
	$('#food').hide();
	$('#fut').hide();
	$('#accountinfodiv').hide();
	$('#aff').show();
	$('#jokes').hide();
	$('#affirmListing').html('');
	renderAffirmation();
});

var affArray = [
	'As I become more and more aware of myself as eternal consciousness, I become more peaceful and at ease with all that happens in my life.',
	'Physical reality reflects this peace back to me.',
	'Everything in my life is exactly should be',
	'My relationships are loving and harmonious',
	'I am at peace. I trust in the process of life',
	'I am connected to divine love and wisdom.',
	'I am harmonious and at peace regardless of my surroundings',
	'My life is blossoming in perfection',
	'I use my emotions, thoughts and challenges to lead me to deeper, more interesting places within myself.',
	'I am grateful for all that I am',
	'I am a channel for loving peaceful energy',
	'I radiate with loving kindness and life mirrors that back to me',
	'Everything will work out for me.',
	'I am a winner.',
	'The tools I need to succeed are in my possession.',
	'There is nobody better to get the job done than me.',
	'I have faith in my social skills.',
	'Other people will not take advantage of me.',
	'I have confidence in my skills.',
	'I am not afraid to be wrong.',
	'Happiness is within my grasp.',
	'I am confident in the presence of others.',
	'Success will be my driving force.',
	'The success of others will not make me jealous. My time will come.',
	'I will speak with confidence and self-assurance.',
	'I will say “No” when I do not have the time or inclination to act.',
	'The only person who can defeat me is myself.',
	'I dare to be different.',
	'My every desire is achievable.',
	'Even outside my comfort zone, I will be comfortable in my own skin.',
	'If I fail, I will fail forward.',
	'My confidence knows no limits.',
	'I do not need other people for happiness.',
	'I choose hope over fear.',
	'Positivity is a choice that I choose to make.',
	"I will not take other people's negativity personally.",
	'My commitment to myself is real.'
];

function renderAffirmation() {
	// clear the div
	randomAff = affArray[Math.floor(Math.random() * affArray.length)];
	// new heading
	var newhead = $('<h3>');
	// slap on a class
	newhead.addClass('animated fadeIn myButton');
	// pushes name to array
	newhead.text(randomAff);
	// append the buttons to the div
	$('#affirmListing').prepend(newhead);
}

// to check which one of my fucking divs was overflowing
var docWidth = document.documentElement.offsetWidth;

[].forEach.call(document.querySelectorAll('*'), function(el) {
	if (el.offsetWidth > docWidth) {
		console.log(el);
	}
});
