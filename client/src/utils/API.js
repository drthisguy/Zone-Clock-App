
export default {
    //typed city predictions
    predictCities: async ({ name, token }) => {
        const response = await fetch(`/api/predictions/${name}/${token}`) 
        return await response.json();            
    }, 

    //get coordinates from google first to use their analysis of user input for accuracy, spell correcting, etc. timezoneDB works best with coordinates as well.
    googleThis: async name => {
        const response = await fetch (`/api/coordinates/${name}`)
        return await response.json();     
    }
}