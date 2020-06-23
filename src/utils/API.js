import { useFetch } from './CustomHooks';

const fetchAPI = useFetch()
export default {
    getSomething: city => {
        const url = 'string...'+city,
         { data, isLoading, hasError, errorMessage } = fetchAPI(url)

        return { data, isLoading, hasError, errorMessage }
    }
}