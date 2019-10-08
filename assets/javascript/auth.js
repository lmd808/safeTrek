// get data
// db.collection('guides').get().then((snapshot) => {
// 	setupGuides(snapshot.docs);
// 	//cycle through the documents
// });

// auth status changes
auth.onAuthStateChanged((user) => {
	if (user) {
		console.log('user logged in');
		$('#init').hide();
		$('#divTwo').show();
		$('#home').hide();
		$('#divFour').show();
	} else {
		console.log('user logged out');
	}
});

// sign up
const signupForm = document.querySelector('#signupForm');
// event listener
signupForm.addEventListener('submit', function(e) {
	e.preventDefault();

	// get user info
	const email = signupForm['signup-email'].value;
	let contact = signupForm['signup-contact'].value;
	const password = signupForm['signup-pass'].value;
	// create a user account
	auth.createUserWithEmailAndPassword(email, password).then(function(cred) {
		signupForm.reset();
		$('#divTwo').show();
		$('#divFour').show();
		$('#divOne').hide();
		$('#home').hide();
	});
});

// logout

const logout = document.querySelector('#LogoutButton');
logout.addEventListener('click', function(e) {
	auth.signOut();
	$('#init').show();
	$('divOne').hide();
	$('#divOneL').hide();
	$('#divTwo').hide();
	$('#divThree').hide();
	$('#divFour').hide();
});

const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', function(e) {
	e.preventDefault();
	// get user info
	const email = loginForm['login-email'].value;
	const password = loginForm['login-pass'].value;

	auth.signInWithEmailAndPassword(email, password).then(function(cred) {
		// close login and reset form
		if (cred) {
			loginForm.reset();
			$('#divTwo').show();
			$('#home').hide();
			$('#divFour').show();
			$('#divOneL').hide();
		} else {
			// $('myModalLogin').show();
		}
	});
});

// $('#goToSignUp').on('click', function() {
// 	$('#divOneL').hide();
// 	$('#divOne').show();
// });
