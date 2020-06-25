const googleAPIKey = process.env.REACT_APP_GOOGLE_APIKEY;


export default {
    predictCities: async ({ city, token }) => {
        const proxyURL = "https://cors-anywhere.herokuapp.com/";
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city}&types=(cities)&language=en&key=${googleAPIKey}&sessiontoken=${token}`; 
        const response = await fetch(proxyURL + url) 

        return await response.json();            
    }, 

    googleThis: async ({ city, country }) => {
        const response = await fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${country}&key=${googleAPIKey}`)

        return await response.json();            
    }
}