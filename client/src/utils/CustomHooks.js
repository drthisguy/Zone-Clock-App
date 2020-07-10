import { useState, useEffect, useRef } from 'react';
import { FormatZone } from './Helpers'


//I'm using this hook for more granular control & handling for my API call to timezoneDB.
export const useFetch = () => {
    const [ zone, setZone ] = useState(null),
    [ isLoading, setIsLoading ] = useState(true),
    [ hasError, setError ] = useState(false),
    [ errorMessage, setErrorMessage ] = useState(''),
    [ url, updateUrl ] = useState('/api/timezone/40.2029196/-75.0847185'),

     fetchZone = async () => {
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
    useEffect(() => {
        fetchZone()
    }, [url]);
    
    return { zone, isLoading, hasError, errorMessage, updateUrl }
}

//used to track previous states for comparison purposes. ex use:  previousItem = usePrevious(itemInput.property),
 export const usePrevious = value => {

        const ref = useRef(false),
         refValue = useRef()
        console.log(ref.current, value)
        useEffect(() => {
          if(ref.current !== value) {
          refValue.current = value;
          ref.current = true;
          }
        }, [value]);
        return ref.current;  
}

//force the re-rendering of state.
export const useForceUpdate = () => {
    const [value, setValue] = useState(0); 
    return () => setValue(value => ++value); // update the state to force render
}