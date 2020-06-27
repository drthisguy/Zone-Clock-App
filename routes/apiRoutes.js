const express = require('express'),
fetch = require('node-fetch'),
router = express.Router(),

googleAPIKey = process.env.GOOGLE_APIKEY;

// loads city predictions when typing
router.get('/predictions/:city/:token', async ({ params }, res) => {
	const { city, token } = params;
	try {
		const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city}&types=(cities)&language=en&key=${googleAPIKey}&sessiontoken=${token}`,
         fetch_response = await fetch(url),
		 json = await fetch_response.json();

		res.json(json);
	} catch (err) {
		res.json({ message: err });
	}
});


// get city coordinate from google first for accuracy before fetching time zone
router.get('/coordinates/:city', async ({ params }, res) => {
	const { city } = params;
	try {
		const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${googleAPIKey}`,
         fetch_response = await fetch(url),
		 json = await fetch_response.json();

		res.json(json);
	} catch (err) {
		res.json({ message: err });
	}
});
module.exports = router;