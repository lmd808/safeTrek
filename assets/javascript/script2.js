$('#self').on('click', function() {
	var queryURL =
		'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=self_care&api-key=GaB7lP16dHpgUzrYTF3DjDRjcvPcDSmR';

	$.ajax({
		url: queryURL,
		method: 'GET'
	}).then(function(data) {
		console.log(data);
		var result = data.response.docs;
		for (var i = 0; i < result.length; i++) {
			var articleDiv = $('<div>');
			articleDiv.append(`<h2>${result[i].headline.main}<h2>`);
			articleDiv.append('<h3>' + result[i].byline.original + '</h3>');
			articleDiv.append(result[i]._id);
			$('#selfCare').append(articleDiv);
		}
	});
});
