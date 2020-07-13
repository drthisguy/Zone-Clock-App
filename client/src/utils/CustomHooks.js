import { useState, useEffect } from 'react';
import { FormatZone } from './Helpers'


//I'm using this hook for more granular control, options & handling for my API call to timezoneDB.
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
            setErrorMessage('Nothing found. Check spelling. Or if the problem persist, the resource may be down. Try again later.')
          }
          setIsLoading(false)
        } catch (err) {
          setError(true)
          setErrorMessage(err.message)
          setIsLoading(false)
        }
    }
        fetchZone()
    }, [url]);
    
    return { zone, isLoading, hasError, errorMessage, updateUrl }
}
