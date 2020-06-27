const googleAPIKey = process.env.REACT_APP_GOOGLE_APIKEY;


export default {
    predictCities: async ({ name, token }) => {
        const response = await fetch(`/api/predictions/${name}/${token}`) 


        return await response.json();            
    }, 

    googleThis: async (name) => {
        const results = await fetch (`/api/coordinates/${name}`)
        console.log("response", results)
        return await results.json();     
    }
}