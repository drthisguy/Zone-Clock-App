import { useState, useEffect, useRef } from 'react';


export const useFetch = url => {
    const [ data, setData ] = useState(null),
     [ isLoading, setIsLoading ] = useState(false),
     [ hasError, setError ] = useState(false),
     [ errorMessage, setErrorMessage ] = useState(''),

     fetchData = async () => {
        setIsLoading(true)

        try {
          const response = await fetch(url),
           result = await response.json();
          if (result.status === 'OK') {
            setData(result)
            console.log("fetchData -> result", result)
          } else {
            setError(true)
            setData(result)
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
        fetchData()
        }, []);
    
    return { data, isLoading, hasError, errorMessage }
}

//used to track previous states for comparison purposes. ex use:  previousItem = usePrevious(itemInput.property),
 export const usePrevious = value => {

        const ref = useRef();
        useEffect(() => {
        ref.current = value;
        }, [value]);

    return ref.current;
}

//force the re-rendering of state.
export const useForceUpdate = () => {
    const [value, setValue] = useState(0); 
    return () => setValue(value => ++value); // update the state to force render
}