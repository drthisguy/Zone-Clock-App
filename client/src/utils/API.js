const googleAPIKey = process.env.REACT_APP_GOOGLE_APIKEY;


export default {
    predictCities: async ({ name, token }) => {
        const response = await fetch(`/api/predictions/${name}/${token}`) 


        return await response.json();            
    }, 

    googleThis: async (name) => {
        const response = await fetch (`/api/coordinates/${name}`)
        console.log("response", response)
        return await response.json();     
    }
}