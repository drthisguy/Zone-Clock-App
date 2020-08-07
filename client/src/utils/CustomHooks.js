import { useState, useEffect } from 'react';
import { FormatZone } from './Helpers'


//I'm using this hook for more control, options & handling of my API call to timezoneDB.
export const useFetch = () => {
    const [ zone, setZone ] = useState(null),
    [ isLoading, setIsLoading ] = useState(true),
    [ hasError, setError ] = useState(false),
    [ errorMessage, setErrorMessage ] = useState(''),
    [ url, updateUrl ] = useState('/api/timezone/40.2029196/-75.0847185');

    useEffect(() => {

     const fetchZone = async () => {
        try {
          const response = await fetch(url),
           result = await response.json();
          if (result.status === 'OK') {
            const saplingZone = FormatZone(result)
            setZone(saplingZone)
          } else {
            setError(true)
            setErrorMessage(result.message)
          }
          setIsLoading(false)
        } catch (err) {
          setError(true)
          setErrorMessage(err.message)
        }
    }
        fetchZone()
    }, [url]);
    
    const setNewError = msg => {
      setErrorMessage(msg)
      setError(true)
      setTimeout(()=> {setError(false)}, 5000)
    }
    return { zone, updateUrl, isLoading, hasError, errorMessage, setNewError }
}