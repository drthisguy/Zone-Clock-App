
export default {
    predictCities: async ({ name, token }) => {
        const response = await fetch(`/api/predictions/${name}/${token}`) 
        return await response.json();            
    }, 

    googleThis: async (name) => {
        const response = await fetch (`/api/coordinates/${name}`)
        return await response.json();     
    }
}