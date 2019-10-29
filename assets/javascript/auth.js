
// auth status changes
auth.onAuthStateChanged((user) => {
	if (user) {
		console.log('user logged in');
		setupUI(user);
		$('#init').hide();
		$('#divTwo').show();
		$('#home').hide();
		$('#divFour').show();
	} else {
		setupUI();
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

	const password = signupForm['signup-pass'].value;
	// create a user account
	auth
		.createUserWithEmailAndPassword(email, password)
		.then(function(cred) {
			return db.collection('users').doc(cred.user.uid).set({
				contact: signupForm['signup-contact'].value,
				firstName: signupForm['firstName'].value,
				lastName: signupForm['lastName'].value
				// I can add more info later name, address, contact name
			});
		})
		.then(() => {
			signupForm.reset();
			$('#divTwo').show();
			$('#divFour').show();
			$('#divOne').hide();
			$('#home').hide();
			signupForm.querySelector('.signupError').innerHTML = '';
		})
		.catch((err) => {
			signupForm.querySelector('.signupError').innerHTML = err.message;
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

	auth
		.signInWithEmailAndPassword(email, password)
		.then(function(cred) {
			// close login and reset form
			if (cred) {
				loginForm.reset();
				$('#divTwo').show();
				$('#home').hide();
				$('#divFour').show();
				$('#divOneL').hide();
				loginForm.querySelector('.signupError').innerHTML = '';
			} else {
			}
		})
		.catch((err) => {
			loginForm.querySelector('.signupError').innerHTML = err.message;
		});
});
