const googleAPIKey = process.env.REACT_APP_GOOGLE_APIKEY;


export default {
    predictCities: async ({ city, token }) => {
        const response = await fetch(`/api/predictions/${city}/${token}`) 
        console.log("response", response)

        return await response.json();            
    }, 

    googleThis: async ({ city, country }) => {
        const response = await fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${country}&key=${googleAPIKey}`)

        return await response.json();            
    }
}