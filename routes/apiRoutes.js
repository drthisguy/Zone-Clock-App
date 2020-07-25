const express = require('express'),
fetch = require('node-fetch'),
router = express.Router(),

timezoneDB_APIKey = process.env.TIMEZONEDB_APIKEY;
googleAPIKey = process.env.GOOGLE_APIKEY;


// loads city predictions when typing
router.get('/predictions/:city/:token', async ({ params: { city, token } }, res) => {
	try {
		const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city}&types=(cities)&language=en&key=${googleAPIKey}&sessiontoken=${token}`,
         fetch_response = await fetch(url),
		 json = await fetch_response.json();

		res.json(json);
	} catch (err) {
		res.json({ message: err });
	}
});

// get city coordinate (and some other data) from google first for accuracy, spelling adjustments, etc. timezoneDB works better this way too. 
router.get('/coordinates/:city', async ({ params: { city } }, res) => {
	try {
		const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${googleAPIKey}`,
         fetch_response = await fetch(url),
		 json = await fetch_response.json();

		res.json(json);
	} catch (err) {
		res.json({ message: err });
	}
});

// get time zone data from timezoneDB
router.get('/timezone/:lat/:lng', async ({ params: { lat, lng } }, res) => {
	try {
		const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${timezoneDB_APIKey}&format=json&by=position&lat=${lat}&lng=${lng}`;
        console.log("url", url)
         const fetch_response = await fetch(url),
		 json = await fetch_response.json();

		res.json(json);
	} catch (err) {
		res.json({ message: err });
	}
});
module.exports = router;