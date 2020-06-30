
export default {
    predictCities: async ({ name, token }) => {
        const response = await fetch(`/api/predictions/${name}/${token}`) 
        return await response.json();            
    }, 

    googleThis: async name => {
        const response = await fetch (`/api/coordinates/${name}`)
        return await response.json();     
    },

    fetchSapling: async () => {
         const response = await fetch('/api/timezone/40.2029196/-75.0847185');
         
           const jsonRes = await response.json(); 
           console.log("jsonRes", jsonRes);
           return jsonRes;
    
    }
}