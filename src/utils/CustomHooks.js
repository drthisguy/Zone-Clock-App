import { useState, useEffect, useRef } from 'react';


export const useFetch = url => {
    const [data, setData] = useState(null),
     [isLoading, setIsLoading] = useState(false),
     [hasError, setError] = useState(false),
     [errorMessage, setErrorMessage] = useState(''),

     fetchData = async () => {
        setIsLoading(true)
        try {
          const response = await fetch(url)
          const result = await response.json()
          if (response.ok) {
            setData(result)
          } else {
            setError(true)
            setErrorMessage(result)
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

//used track previous states for comparison purposes. ex use:  previousItem = usePrevious(itemInput.property),
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