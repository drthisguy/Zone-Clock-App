import React from 'react'
import { useFetch } from './CustomHooks';

const fetchAPI = useFetch()
export default {
    getSomething: city => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=paris,+france&key=AIzaSyCI3zv9mMZuVUPGueGVIYUyD3etz0VJK7I`,
         { data, isLoading, hasError, errorMessage } = fetchAPI(url)

        return { data, isLoading, hasError, errorMessage }
    }
}