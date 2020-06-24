const googleAPIKey = process.env.REACT_APP_GOOGLE_APIKEY;


export default {
    googleIt: async ({ city, country }) => {
        const response = await fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${country}&key=${googleAPIKey}`)

        return await response.json();            
    }
}